// components/Sidebar/Sidebar.jsx
"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/styles/sidebar/Sidebar.module.scss';

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { href: '/', label: 'Dashboard', icon: '📊' },
    { href: '/tasks-management', label: 'Tasks Management', icon: '👥' },
    { href: '/employee-management', label: 'Employee Management', icon: '👥' },
    { href: '/user-management', label: 'User Management', icon: '🔧' },
    { href: '/jobs-posting', label: 'Job Posting', icon: '📋' },
    { href: '/time-attendance', label: 'Time & Attendance', icon: '⏰' },
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
        <h2>Welcome back</h2>
        <h1>Pavan</h1>
      </div>
      
      <nav className={styles.nav}>
        <ul>
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link 
                href={item.href} 
                className={`${styles.navItem} ${isActive(item.href) ? styles.active : ''}`}
              >
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.label}>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.userInfo}>
        <div className={styles.avatar}>P</div>
        <div className={styles.userDetails}>
          <span className={styles.userName}>Pavan</span>
          <span className={styles.userRole}>admin</span>
        </div>
        <button className={styles.logoutBtn}>↗</button>
      </div>
    </div>
  );
};

export default Sidebar;