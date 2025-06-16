// components/ui/RoleTestPanel.jsx
"use client"
import useAuthStore from '@/store/common/authStore';
import useUIStore from '@/store/common/uiStore';
import styles from './RoleTestPanel.module.scss';

const RoleTestPanel = () => {
  const { user, logout } = useAuthStore();
  const { showSuccessMessage, showErrorMessage } = useUIStore();

  const handleLogout = async () => {
    try {
      await logout();
      showSuccessMessage('Logged out successfully');
    } catch (error) {
      showErrorMessage('Logout failed');
    }
  };

  return (
    <div className={styles.roleTestPanel}>
      <h3>🚀 Axios Integration Status</h3>
      <p>Current User: <strong>{user?.name || user?.email || 'Not logged in'}</strong></p>
      <p>Current Role: <strong>{user?.role || 'None'}</strong></p>
      <p>Backend URL: <strong>https://news-app-backend-lo3a.onrender.com</strong></p>
      <p>HTTP Client: <strong>✨ Axios (Upgraded from Fetch)</strong></p>

      <div className={styles.roleButtons}>
        <h4>Authentication Status:</h4>
        {user ? (
          <div>
            <p>✅ Successfully connected to backend</p>
            <p>📧 Email: {user.email}</p>
            <p>🔑 Role: {user.role}</p>
            <button
              onClick={handleLogout}
              className={`${styles.roleBtn} ${styles.logout}`}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <p>❌ Not authenticated</p>
            <p>Please go to <a href="/auth/signin">/auth/signin</a> to login</p>
          </div>
        )}
      </div>

      <div className={styles.instructions}>
        <h4>Role-Based Sidebar Features:</h4>
        <ul>
          <li><strong>Admin:</strong> Can see all management features, reports, and settings</li>
          <li><strong>Employer:</strong> Can manage team, post jobs, handle payroll</li>
          <li><strong>User:</strong> Can only see personal tasks, time tracking, and profile</li>
        </ul>

        <h4>✨ Axios Features:</h4>
        <ul>
          <li><strong>Request Interceptors:</strong> Auto-add auth tokens</li>
          <li><strong>Response Interceptors:</strong> Handle 401/403/500 errors</li>
          <li><strong>Timeout Handling:</strong> 30-second request timeout</li>
          <li><strong>Error Handling:</strong> User-friendly error messages</li>
          <li><strong>Network Detection:</strong> Automatic network error handling</li>
        </ul>

        <h4>Backend Endpoints:</h4>
        <ul>
          <li><strong>Login:</strong> POST /api/auth/login</li>
          <li><strong>Register Admin:</strong> POST /api/auth/register-admin</li>
          <li><strong>Profile:</strong> GET /api/auth/me</li>
        </ul>
      </div>
    </div>
  );
};

export default RoleTestPanel;
