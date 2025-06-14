import Sidebar from '@/components/sidebar/Sidebar';
import styles from '@/styles/pages/PageLayout.module.scss';

export const metadata = {
  title: "Time & Attendance - First-Us",
  description: "Track employee time, attendance, and work schedules",
};

export default function TimeAttendancePage() {
  return (
    <div>
      <Sidebar />
      <div className={styles.pageContainer}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1>Time & Attendance</h1>
            <p>Track employee time, attendance, schedules, and work hours</p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.primaryButton}>
              <span className={styles.buttonIcon}>⏰</span>
              Clock In/Out
            </button>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.comingSoon}>
            <div className={styles.comingSoonIcon}>⏰</div>
            <h2>Time & Attendance</h2>
            <p>This feature is coming soon! You'll be able to:</p>
            <ul className={styles.featureList}>
              <li>Track employee clock in/out times</li>
              <li>Manage work schedules</li>
              <li>Monitor attendance patterns</li>
              <li>Generate timesheet reports</li>
              <li>Handle overtime and leave requests</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}