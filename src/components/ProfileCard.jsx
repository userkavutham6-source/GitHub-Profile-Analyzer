import React from 'react';
import { Users, UserPlus, BookOpen, MapPin, Link as LinkIcon, Building } from 'lucide-react';

const ProfileCard = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="card animate-fade-in" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <img 
          src={profile.avatar_url} 
          alt={profile.login} 
          style={{ width: '100px', height: '100px', borderRadius: '50%', border: '4px solid var(--border-color)' }} 
        />
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{profile.name || profile.login}</h2>
          <a 
            href={profile.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'var(--accent-color)', fontWeight: '500', fontSize: '1.125rem' }}
          >
            @{profile.login}
          </a>
        </div>
      </div>
      
      {profile.bio && (
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1 }}>{profile.bio}</p>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem', backgroundColor: 'var(--bg-color)', padding: '1rem', borderRadius: '12px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
            <BookOpen size={16} /> Repos
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>{profile.public_repos}</div>
        </div>
        <div style={{ textAlign: 'center', borderLeft: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
            <Users size={16} /> Followers
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>{profile.followers}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
            <UserPlus size={16} /> Following
          </div>
          <div style={{ fontSize: '1.25rem', fontWeight: '700' }}>{profile.following}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
        {profile.company && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Building size={16} /> <span>{profile.company}</span>
          </div>
        )}
        {profile.location && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MapPin size={16} /> <span>{profile.location}</span>
          </div>
        )}
        {profile.blog && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LinkIcon size={16} /> 
            <a href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
              {profile.blog}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
