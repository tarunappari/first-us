import Sidebar from '@/components/sidebar/Sidebar';
import styles from '@/styles/pages/PageLayout.module.scss';

export const metadata = {
  title: "Employee Management - First-Us",
  description: "Manage your employees and team members",
};

export default function EmployeeManagementPage() {
  return (
    <div>
      <Sidebar />
      <div className={styles.pageContainer}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1>Employee Management</h1>
            <p>Manage your employees, track performance, and handle HR operations</p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.primaryButton}>
              <span className={styles.buttonIcon}>+</span>
              Add Employee
            </button>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.comingSoon}>
            <div className={styles.comingSoonIcon}>👥</div>
            <h2>Employee Management</h2>
            <p>This feature is coming soon! You'll be able to:</p>
            <ul className={styles.featureList}>
              <li>Add and manage employee profiles</li>
              <li>Track employee performance</li>
              <li>Handle payroll and benefits</li>
              <li>Manage employee schedules</li>
              <li>Generate HR reports</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}