import React from 'react';
import { Star, GitFork, Circle } from 'lucide-react';

const RepoCard = ({ repo, delay }) => {
  const formattedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="card animate-fade-in" style={{ animationDelay: `${delay}ms`, display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
        <a 
          href={repo.html_url} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            fontSize: '1.125rem', 
            fontWeight: '600', 
            color: 'var(--accent-color)',
            wordBreak: 'break-word',
            flex: 1,
            marginRight: '1rem'
          }}
        >
          {repo.name}
        </a>
      </div>

      <p style={{ 
        color: 'var(--text-secondary)', 
        fontSize: '0.875rem', 
        marginBottom: '1.5rem',
        flex: 1,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        {repo.description || 'No description provided'}
      </p>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {repo.language && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Circle size={10} fill="var(--success-color)" color="var(--success-color)" />
              <span>{repo.language}</span>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Star size={14} />
            <span>{repo.stargazers_count}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <GitFork size={14} />
            <span>{repo.forks_count}</span>
          </div>
        </div>
        <div>
          Updated {formattedDate}
        </div>
      </div>
    </div>
  );
};

const TopRepos = ({ repos }) => {
  if (!repos || repos.length === 0) return null;

  return (
    <div style={{ marginTop: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Top Repositories</h2>
      <div className="grid-3">
        {repos.map((repo, index) => (
          <RepoCard key={repo.id} repo={repo} delay={index * 100} />
        ))}
      </div>
    </div>
  );
};

export default TopRepos;
