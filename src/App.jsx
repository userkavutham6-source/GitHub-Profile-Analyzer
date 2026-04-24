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
  const [profileData, setProfileData] = useState(null);
  const [metricsData, setMetricsData] = useState(null);

  const handleSearch = async (username) => {
    setIsLoading(true);
    setError(null);
    setProfileData(null);
    setMetricsData(null);

    try {
      const profile = await fetchUserProfile(username);
      const repos = await fetchUserRepos(username);
      const metrics = analyzeRepos(repos);

      setProfileData(profile);
      setMetricsData(metrics);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

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

        {profileData && metricsData && !isLoading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', paddingBottom: '4rem' }}>
            
            {/* Top row: Profile and Metrics */}
            <div className="grid-2">
              <div>
                <ProfileCard profile={profileData} />
              </div>
              <div>
                <MetricsGrid metrics={metricsData} />
              </div>
            </div>

            {/* Middle row: Charts */}
            <div className="grid-2">
              <LanguageChart data={metricsData.chartData} />
              <ActivityChart active={metricsData.activeRepos} inactive={metricsData.inactiveRepos} />
            </div>

            {/* Bottom row: Top Repos */}
            <TopRepos repos={metricsData.topRepos} />
            
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
