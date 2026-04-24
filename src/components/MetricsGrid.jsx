import React from 'react';
import { Star, GitFork, Code, ShieldCheck } from 'lucide-react';

const MetricCard = ({ title, value, icon: Icon, color, delay }) => (
  <div className="card" style={{ animationDelay: `${delay}ms`, display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem' }}>
    <div style={{ 
      backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`, 
      color: color,
      padding: '1rem', 
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Icon size={28} />
    </div>
    <div>
      <h3 style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: '500', marginBottom: '0.25rem' }}>{title}</h3>
      <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>{value}</p>
    </div>
  </div>
);

const MetricsGrid = ({ metrics }) => {
  if (!metrics) return null;

  return (
    <div className="grid-2 animate-fade-in" style={{ height: '100%', alignContent: 'space-between' }}>
      <MetricCard 
        title="Total Stars" 
        value={metrics.totalStars.toLocaleString()} 
        icon={Star} 
        color="var(--warning-color)" 
        delay={100} 
      />
      <MetricCard 
        title="Total Forks" 
        value={metrics.totalForks.toLocaleString()} 
        icon={GitFork} 
        color="var(--accent-color)" 
        delay={200} 
      />
      <MetricCard 
        title="Top Language" 
        value={metrics.mostUsedLanguage} 
        icon={Code} 
        color="var(--success-color)" 
        delay={300} 
      />
      <MetricCard 
        title="Repo Quality Score" 
        value={`${metrics.qualityScore}/100`} 
        icon={ShieldCheck} 
        color="var(--danger-color)" 
        delay={400} 
      />
    </div>
  );
};

export default MetricsGrid;
