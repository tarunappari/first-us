import Sidebar from '@/components/sidebar/Sidebar';
import styles from '@/styles/pages/PageLayout.module.scss';

export const metadata = {
  title: "Job Posting - First-Us",
  description: "Create and manage job postings and recruitment",
};

export default function JobPostingPage() {
  return (
    <div>
      <Sidebar />
      <div className={styles.pageContainer}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <h1>Job Posting</h1>
            <p>Create, manage, and track job postings and recruitment processes</p>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.primaryButton}>
              <span className={styles.buttonIcon}>+</span>
              Post New Job
            </button>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.comingSoon}>
            <div className={styles.comingSoonIcon}>📋</div>
            <h2>Job Posting</h2>
            <p>This feature is coming soon! You'll be able to:</p>
            <ul className={styles.featureList}>
              <li>Create and publish job postings</li>
              <li>Manage job applications</li>
              <li>Track recruitment pipeline</li>
              <li>Schedule interviews</li>
              <li>Generate recruitment reports</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}