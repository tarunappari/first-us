import Sidebar from '@/components/sidebar/Sidebar';
import styles from '@/styles/pages/PageLayout.module.scss';

export const metadata = {
  title: "User Management - First-Us",
  description: "Manage user accounts, permissions, and access control",
};

export default function UserManagementPage() {
  return (
    <div>
      <Sidebar />
      <div className={styles.pageContainer}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1>User Management</h1>
            <p>Manage user accounts, roles, permissions, and access control</p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.primaryButton}>
              <span className={styles.buttonIcon}>+</span>
              Add User
            </button>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.comingSoon}>
            <div className={styles.comingSoonIcon}>🔧</div>
            <h2>User Management</h2>
            <p>This feature is coming soon! You'll be able to:</p>
            <ul className={styles.featureList}>
              <li>Create and manage user accounts</li>
              <li>Assign roles and permissions</li>
              <li>Control access to different features</li>
              <li>Monitor user activity</li>
              <li>Manage user groups and teams</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}