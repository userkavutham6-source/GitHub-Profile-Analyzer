import React, { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard';
import MetricsGrid from './components/MetricsGrid';
import LanguageChart from './components/LanguageChart';
import ActivityChart from './components/ActivityChart';
import TopRepos from './components/TopRepos';
import { fetchUserProfile, fetchUserRepos, analyzeRepos } from './services/github';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // States are now arrays to support Compare Mode
  const [profiles, setProfiles] = useState([]);
  const [metrics, setMetrics] = useState([]);

  const handleSearch = async (usernames) => {
    setIsLoading(true);
    setError(null);
    setProfiles([]);
    setMetrics([]);

    try {
      const profilePromises = usernames.map(fetchUserProfile);
      const repoPromises = usernames.map(fetchUserRepos);

      const fetchedProfiles = await Promise.all(profilePromises);
      const fetchedReposArray = await Promise.all(repoPromises);
      
      const analyzedMetrics = fetchedReposArray.map(analyzeRepos);

      setProfiles(fetchedProfiles);
      setMetrics(analyzedMetrics);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const renderProfileColumn = (profileData, metricsData) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="grid-2">
        <ProfileCard profile={profileData} />
        <MetricsGrid metrics={metricsData} />
      </div>
      <div className="grid-2">
        <LanguageChart data={metricsData.chartData} />
        <ActivityChart active={metricsData.activeRepos} inactive={metricsData.inactiveRepos} />
      </div>
      <TopRepos repos={metricsData.topRepos} />
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <main className="container" style={{ flex: 1, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }} className="animate-fade-in">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', background: 'linear-gradient(90deg, var(--accent-color), #05cd99)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Discover GitHub Insights
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
            Analyze any GitHub profile to see deep insights, language distribution, and repository performance metrics.
          </p>
        </div>

        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {error && (
          <div className="card animate-fade-in" style={{ backgroundColor: 'color-mix(in srgb, var(--danger-color) 10%, transparent)', border: '1px solid var(--danger-color)', color: 'var(--danger-color)', textAlign: 'center', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            {error}
          </div>
        )}

        {isLoading && (
          <div className="spinner"></div>
        )}

        {!isLoading && profiles.length > 0 && metrics.length > 0 && (
          <div className={profiles.length === 2 ? "compare-grid" : ""} style={{ paddingBottom: '4rem' }}>
            {profiles.map((profile, index) => (
              <div key={profile.login} className="animate-fade-in">
                {profiles.length === 2 && (
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--accent-color)', textAlign: 'center' }}>
                    Profile {index + 1}
                  </h3>
                )}
                {renderProfileColumn(profile, metrics[index])}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
