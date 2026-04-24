import React, { useState, useEffect } from 'react';
import { Moon, Sun, Key } from 'lucide-react';

const Header = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('github_pat') || '');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleTokenSave = (e) => {
    e.preventDefault();
    if (token.trim()) {
      localStorage.setItem('github_pat', token.trim());
    } else {
      localStorage.removeItem('github_pat');
    }
    setShowTokenInput(false);
    window.location.reload(); // Reload to apply token
  };

  return (
    <header style={{ padding: '1.5rem 0', borderBottom: '1px solid var(--border-color)', marginBottom: '2rem' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <svg height="32" viewBox="0 0 16 16" width="32" fill="var(--accent-color)">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
          </svg>
          <h1 style={{ fontSize: '1.5rem', m: 0 }}>GH Analyzer</h1>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button className="btn-icon" onClick={() => setShowTokenInput(!showTokenInput)} title="Set API Token">
            <Key size={20} />
          </button>
          <button className="btn-icon" onClick={toggleTheme} title="Toggle Theme">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>

      {showTokenInput && (
        <div className="container" style={{ marginTop: '1rem' }}>
          <form onSubmit={handleTokenSave} className="card animate-fade-in" style={{ display: 'flex', gap: '1rem' }}>
            <input 
              type="password" 
              placeholder="Paste GitHub Personal Access Token..." 
              value={token}
              onChange={(e) => setToken(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-primary">Save Token</button>
          </form>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.5rem', textAlign: 'center' }}>
            A token increases your API rate limit to 5000 requests/hour. It's stored locally in your browser.
          </p>
        </div>
      )}
    </header>
  );
};

export default Header;
