import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ position: 'relative', maxWidth: '600px', margin: '0 auto 3rem auto' }} className="animate-fade-in">
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <Search 
          size={24} 
          style={{ position: 'absolute', left: '1.25rem', color: 'var(--text-secondary)' }} 
        />
        <input 
          type="text" 
          placeholder="Enter a GitHub username (e.g. torvalds)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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
          disabled={isLoading || !query.trim()}
        >
          {isLoading ? 'Searching...' : 'Analyze'}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
