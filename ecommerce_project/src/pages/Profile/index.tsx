import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { currentUser, logout } = useAuth();

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem' }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ marginBottom: '2rem', color: '#2c3e50' }}>Your Account</h1>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#7f8c8d', marginBottom: '0.5rem' }}>Name</h3>
          <p style={{ fontSize: '1.1rem' }}>{currentUser.name || 'Not provided'}</p>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#7f8c8d', marginBottom: '0.5rem' }}>Email</h3>
          <p style={{ fontSize: '1.1rem' }}>{currentUser.email}</p>
        </div>

        {currentUser.isAdmin && (
          <div style={{ marginBottom: '1.5rem' }}>
            <span style={{
              backgroundColor: '#2ecc71',
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '15px',
              fontSize: '0.9rem'
            }}>
              Admin User
            </span>
          </div>
        )}

        <div style={{ marginTop: '2rem', borderTop: '1px solid #eee', paddingTop: '2rem' }}>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'background-color 0.2s'
            }}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;