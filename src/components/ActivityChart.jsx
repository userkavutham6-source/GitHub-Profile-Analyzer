import React from 'react';
import { Activity } from 'lucide-react';

const ActivityChart = ({ active, inactive }) => {
  const total = active + inactive;
  if (total === 0) return null;

  const activePercent = Math.round((active / total) * 100);
  const inactivePercent = 100 - activePercent;

  return (
    <div className="card animate-fade-in" style={{ height: '300px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: '1.125rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Activity size={20} color="var(--accent-color)" /> Activity Consistency
      </h3>
      
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '2rem' }}>
        Ratio of repositories updated within the last 6 months vs older repositories.
      </p>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ 
          width: '100%', 
          height: '24px', 
          backgroundColor: 'var(--bg-color)', 
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          marginBottom: '1rem'
        }}>
          <div style={{ 
            width: `${activePercent}%`, 
            backgroundColor: 'var(--success-color)',
            transition: 'width 1s ease-in-out'
          }}></div>
          <div style={{ 
            width: `${inactivePercent}%`, 
            backgroundColor: 'var(--text-secondary)',
            opacity: 0.3,
            transition: 'width 1s ease-in-out'
          }}></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--success-color)' }}></div>
            <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Active ({activePercent}%)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Inactive ({inactivePercent}%)</span>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: 'var(--text-secondary)', opacity: 0.3 }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;
