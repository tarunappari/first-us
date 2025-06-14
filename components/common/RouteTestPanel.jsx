'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/styles/common/RouteTestPanel.module.scss';

const RouteTestPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const routes = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/tasks-management', label: 'Tasks Management', icon: '📋' },
    { path: '/employee-management', label: 'Employee Management', icon: '👥' },
    { path: '/user-management', label: 'User Management', icon: '🔧' },
    { path: '/jobs-posting', label: 'Job Posting', icon: '💼' },
    { path: '/time-attendance', label: 'Time & Attendance', icon: '⏰' },
    { path: '/auth/signin', label: 'Sign In', icon: '🔐' },
    { path: '/auth/signup', label: 'Sign Up', icon: '📝' },
  ];

  return (
    <div className={styles.routeTestPanel}>
      <button 
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        title="Route Test Panel"
      >
        🧭
      </button>
      
      {isOpen && (
        <div className={styles.panel}>
          <div className={styles.header}>
            <h3>Route Navigator</h3>
            <button 
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>
          
          <div className={styles.currentRoute}>
            <span className={styles.label}>Current:</span>
            <span className={styles.path}>{pathname}</span>
          </div>
          
          <div className={styles.routeList}>
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={`${styles.routeItem} ${pathname === route.path ? styles.active : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <span className={styles.icon}>{route.icon}</span>
                <span className={styles.routeLabel}>{route.label}</span>
                <span className={styles.routePath}>{route.path}</span>
              </Link>
            ))}
          </div>
          
          <div className={styles.footer}>
            <small>Development Route Tester</small>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteTestPanel;
