// components/ui/NetworkDiagnostic.jsx
"use client"
import { useState } from 'react';
import { apiClient } from '@/lib/config/api';
import styles from './NetworkDiagnostic.module.scss';

const NetworkDiagnostic = () => {
  const [diagnostics, setDiagnostics] = useState({
    backendStatus: null,
    corsTest: null,
    networkTest: null,
    loading: false,
  });

  const runDiagnostics = async () => {
    setDiagnostics(prev => ({ ...prev, loading: true }));
    
    // Test 1: Basic network connectivity
    console.log('🔍 Starting network diagnostics...');
    
    try {
      // Test basic fetch to backend
      console.log('📡 Testing basic connectivity...');
      const response = await fetch('https://news-app-backend-lo3a.onrender.com/api/auth/login', {
        method: 'OPTIONS',
        headers: {
          'Origin': window.location.origin,
        },
      });
      
      setDiagnostics(prev => ({
        ...prev,
        corsTest: {
          success: true,
          message: 'CORS preflight successful',
          status: response.status,
        }
      }));
    } catch (error) {
      console.error('❌ CORS test failed:', error);
      setDiagnostics(prev => ({
        ...prev,
        corsTest: {
          success: false,
          message: `CORS test failed: ${error.message}`,
          error: error.message,
        }
      }));
    }

    // Test 2: Backend health check
    try {
      console.log('🏥 Testing backend health...');
      const response = await fetch('https://news-app-backend-lo3a.onrender.com/', {
        method: 'GET',
        mode: 'cors',
      });
      
      setDiagnostics(prev => ({
        ...prev,
        backendStatus: {
          success: response.ok,
          message: response.ok ? 'Backend is accessible' : 'Backend returned error',
          status: response.status,
          statusText: response.statusText,
        }
      }));
    } catch (error) {
      console.error('❌ Backend health check failed:', error);
      setDiagnostics(prev => ({
        ...prev,
        backendStatus: {
          success: false,
          message: `Backend unreachable: ${error.message}`,
          error: error.message,
        }
      }));
    }

    // Test 3: Axios configuration test
    try {
      console.log('⚙️ Testing Axios configuration...');
      const response = await apiClient.get('/');
      
      setDiagnostics(prev => ({
        ...prev,
        networkTest: {
          success: true,
          message: 'Axios configuration working',
          status: response.status,
        }
      }));
    } catch (error) {
      console.error('❌ Axios test failed:', error);
      setDiagnostics(prev => ({
        ...prev,
        networkTest: {
          success: false,
          message: `Axios error: ${error.message}`,
          error: error.message,
          code: error.code,
        }
      }));
    }

    setDiagnostics(prev => ({ ...prev, loading: false }));
  };

  const testLogin = async () => {
    console.log('🔐 Testing login endpoint...');
    try {
      const response = await apiClient.post('/api/auth/login', {
        email: 'test@example.com',
        password: 'testpassword'
      });
      console.log('✅ Login test response:', response);
    } catch (error) {
      console.error('❌ Login test error:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        config: error.config,
        request: error.request,
        response: error.response,
      });
    }
  };

  return (
    <div className={styles.diagnostic}>
      <h3>🔍 Network Diagnostic Tool</h3>
      
      <div className={styles.actions}>
        <button 
          onClick={runDiagnostics}
          disabled={diagnostics.loading}
          className={styles.diagnosticBtn}
        >
          {diagnostics.loading ? 'Running Diagnostics...' : 'Run Network Diagnostics'}
        </button>
        
        <button 
          onClick={testLogin}
          className={styles.testBtn}
        >
          Test Login Endpoint
        </button>
      </div>

      {(diagnostics.backendStatus || diagnostics.corsTest || diagnostics.networkTest) && (
        <div className={styles.results}>
          <h4>Diagnostic Results:</h4>
          
          {diagnostics.corsTest && (
            <div className={`${styles.result} ${diagnostics.corsTest.success ? styles.success : styles.error}`}>
              <strong>CORS Test:</strong> {diagnostics.corsTest.message}
              {diagnostics.corsTest.status && <span> (Status: {diagnostics.corsTest.status})</span>}
            </div>
          )}
          
          {diagnostics.backendStatus && (
            <div className={`${styles.result} ${diagnostics.backendStatus.success ? styles.success : styles.error}`}>
              <strong>Backend Health:</strong> {diagnostics.backendStatus.message}
              {diagnostics.backendStatus.status && <span> (Status: {diagnostics.backendStatus.status})</span>}
            </div>
          )}
          
          {diagnostics.networkTest && (
            <div className={`${styles.result} ${diagnostics.networkTest.success ? styles.success : styles.error}`}>
              <strong>Axios Test:</strong> {diagnostics.networkTest.message}
              {diagnostics.networkTest.code && <span> (Code: {diagnostics.networkTest.code})</span>}
            </div>
          )}
        </div>
      )}

      <div className={styles.troubleshooting}>
        <h4>🛠️ Troubleshooting Steps:</h4>
        <ol>
          <li><strong>Check Backend Status:</strong> Ensure your backend server is running</li>
          <li><strong>CORS Configuration:</strong> Backend must allow requests from localhost:3000</li>
          <li><strong>Network Connection:</strong> Check your internet connection</li>
          <li><strong>Firewall/Antivirus:</strong> Check if requests are being blocked</li>
          <li><strong>Browser Console:</strong> Check for additional error details</li>
        </ol>
        
        <h4>📋 Required Backend CORS Headers:</h4>
        <pre className={styles.code}>
{`Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
Access-Control-Allow-Credentials: true`}
        </pre>
      </div>
    </div>
  );
};

export default NetworkDiagnostic;
