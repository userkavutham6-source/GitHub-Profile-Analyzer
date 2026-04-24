import React, { useState } from 'react';
import { Search, SplitSquareHorizontal } from 'lucide-react';

const SearchBar = ({ onSearch, isLoading }) => {
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [query1, setQuery1] = useState('');
  const [query2, setQuery2] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    
    if (isCompareMode) {
      if (query1.trim() && query2.trim()) {
        onSearch([query1.trim(), query2.trim()]);
      }
    } else {
      if (query1.trim()) {
        onSearch([query1.trim()]);
      }
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto 3rem auto' }} className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
        <button 
          onClick={() => setIsCompareMode(!isCompareMode)}
          className={`btn ${isCompareMode ? 'btn-primary' : ''}`}
          style={{ 
            backgroundColor: isCompareMode ? 'var(--accent-color)' : 'var(--bg-card)',
            color: isCompareMode ? 'white' : 'var(--text-primary)',
            border: `1px solid ${isCompareMode ? 'var(--accent-color)' : 'var(--border-color)'}`,
            padding: '0.5rem 1rem',
            borderRadius: '20px'
          }}
        >
          <SplitSquareHorizontal size={18} />
          Compare Mode
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '1rem', flexDirection: isCompareMode ? 'row' : 'column' }}>
          <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
            <Search 
              size={24} 
              style={{ position: 'absolute', left: '1.25rem', color: 'var(--text-secondary)' }} 
            />
            <input 
              type="text" 
              placeholder={isCompareMode ? "First username" : "Enter a GitHub username (e.g. torvalds)"}
              value={query1}
              onChange={(e) => setQuery1(e.target.value)}
              style={{ 
                paddingLeft: '3.5rem', 
                paddingRight: isCompareMode ? '1.5rem' : '8rem',
                height: '64px',
                fontSize: '1.125rem',
                borderRadius: '32px',
                boxShadow: 'var(--shadow-md)'
              }}
              disabled={isLoading}
            />
            {!isCompareMode && (
              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ 
                  position: 'absolute', 
                  right: '0.5rem', 
                  borderRadius: '24px',
                  height: '48px'
                }}
                disabled={isLoading || !query1.trim()}
              >
                {isLoading ? 'Searching...' : 'Analyze'}
              </button>
            )}
          </div>

          {isCompareMode && (
            <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
              <Search 
                size={24} 
                style={{ position: 'absolute', left: '1.25rem', color: 'var(--text-secondary)' }} 
              />
              <input 
                type="text" 
                placeholder="Second username"
                value={query2}
                onChange={(e) => setQuery2(e.target.value)}
                style={{ 
                  paddingLeft: '3.5rem', 
                  paddingRight: '8rem',
                  height: '64px',
                  fontSize: '1.125rem',
                  borderRadius: '32px',
                  boxShadow: 'var(--shadow-md)'
                }}
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ 
                  position: 'absolute', 
                  right: '0.5rem', 
                  borderRadius: '24px',
                  height: '48px'
                }}
                disabled={isLoading || !query1.trim() || !query2.trim()}
              >
                {isLoading ? 'Wait...' : 'Compare'}
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
