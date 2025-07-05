import React, { useState } from 'react';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome to Task Tracker</h1>
        <p className="login-subtitle">Enter your username to get started</p>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e: any) => setUsername(e.target.value)}
              className="input"
              placeholder="Enter your username..."
              required
              autoFocus
            />
          </div>
          
          <button type="submit" className="btn btn-primary login-btn">
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login; 