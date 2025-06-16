// components/ui/QuickLogin.jsx
"use client"
import { useState } from 'react';
import useAuthStore from '@/store/common/authStore';
import useUIStore from '@/store/common/uiStore';
import styles from './QuickLogin.module.scss';

const QuickLogin = () => {
  const { login, loading } = useAuthStore();
  const { showSuccessMessage, showErrorMessage } = useUIStore();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!credentials.email || !credentials.password) {
      showErrorMessage('Please fill in all fields');
      return;
    }

    try {
      const result = await login(credentials);
      if (result.success) {
        showSuccessMessage('Login successful!');
        setCredentials({ email: '', password: '' });
      } else {
        showErrorMessage(result.error || 'Login failed');
      }
    } catch (error) {
      showErrorMessage(error.message || 'Login failed');
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className={styles.quickLogin}>
      <h3>Quick Login Test</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Enter your email"
            disabled={loading}
          />
        </div>
        
        <div className={styles.field}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Enter your password"
            disabled={loading}
          />
        </div>
        
        <button 
          type="submit" 
          className={styles.loginBtn}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <div className={styles.testCredentials}>
        <h4>✨ Now Using Axios!</h4>
        <p>✅ Axios HTTP client for better error handling</p>
        <p>✅ Request/Response interceptors for auth tokens</p>
        <p>✅ Automatic retry and timeout handling</p>
        <p>✅ Better error messages and network handling</p>
        <br />
        <h4>Test with your backend credentials:</h4>
        <p>Use any valid email/password from your backend database</p>
        <p>The role will be determined by your backend response</p>
      </div>
    </div>
  );
};

export default QuickLogin;
