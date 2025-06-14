// components/Sidebar/Sidebar.jsx
"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/styles/sidebar/Sidebar.module.scss';
import logo from '@/public/assets/first-logo.jpeg';
import Image from 'next/image';

// Icon components using SVG for professional look
const DashboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/>
    <rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/>
    <rect x="3" y="14" width="7" height="7"/>
  </svg>
);

const TasksIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    <path d="m9 14 2 2 4-4"/>
  </svg>
);

const EmployeeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="m22 21-3-3m0 0a6 6 0 1 0-6-6 6 6 0 0 0 6 6z"/>
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M10 9a3 3 0 0 0 5.196 2.804l.054.036A3 3 0 0 1 18 9.402V5.5a2.5 2.5 0 0 0-5 0c0 .47.098.92.27 1.326z"/>
    <path d="M7 21a4 4 0 0 1-4-4v-1a2 2 0 0 1 2-2h2"/>
  </svg>
);

const JobsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

const TimeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);

const LogoutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16,17 21,12 16,7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Dashboard', icon: DashboardIcon },
    { href: '/tasks-management', label: 'Tasks Management', icon: TasksIcon },
    { href: '/employee-management', label: 'Employee Management', icon: EmployeeIcon },
    { href: '/user-management', label: 'User Management', icon: UserIcon },
    { href: '/jobs-posting', label: 'Job Posting', icon: JobsIcon },
    { href: '/time-attendance', label: 'Time & Attendance', icon: TimeIcon },
  ];

  const isActive = (href) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <Image src={logo} alt='logo' width={72} />
        </div>
        <div className={styles.logoText}>
          <h2>Welcome back</h2>
          <h1>Pavan</h1>
        </div>
      </div>
      
      <nav className={styles.nav}>
        <ul>
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <li key={item.href}>
                <Link 
                  href={item.href} 
                  className={`${styles.navItem} ${isActive(item.href) ? styles.active : ''}`}
                >
                  <span className={styles.icon}>
                    <IconComponent />
                  </span>
                  <span className={styles.label}>{item.label}</span>
                  {isActive(item.href) && <div className={styles.activeIndicator} />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={styles.userInfo}>
        <div className={styles.avatar}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </div>
        <div className={styles.userDetails}>
          <span className={styles.userName}>Pavan Kumar</span>
          <span className={styles.userRole}>Administrator</span>
        </div>
        <button className={styles.logoutBtn} title="Sign out">
          <LogoutIcon />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;