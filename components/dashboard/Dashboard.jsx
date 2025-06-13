// components/Dashboard/Dashboard.jsx
import styles from '@/styles/dashboard/Dashboard.module.scss';

const Dashboard = () => {
  const dashboardData = [
    {
      title: 'Total Users',
      value: '108',
      icon: '👥',
      color: '#1481b9'
    },
    {
      title: 'Total Employers',
      value: '25',
      icon: '👨‍💼',
      color: '#189dd6'
    },
    {
      title: 'Total Jobs',
      value: '0',
      icon: '🕐',
      color: '#189dd6'
    }
  ];

  const quickActions = [
    {
      title: 'Add Employee',
      icon: '👤',
      color: '#1481b9'
    },
    {
      title: 'Post Job',
      icon: '💼',
      color: '#189dd6'
    }
  ];

  const teamStats = [
    {
      label: 'Pending Tasks',
      value: '6',
      change: '+16.67%',
      changeType: 'positive'
    },
    {
      label: 'In Progress Tasks',
      value: '97.3%',
      change: '+1.2%',
      changeType: 'positive'
    },
    {
      label: 'Completed Tasks',
      value: '2',
      change: '+3.1%',
      changeType: 'positive'
    }
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div className={styles.welcome}>
          {/* <h1>Welcome back, Pavan</h1> */}
          <p>Here's what's happening with your team today.</p>
        </div>
        <button className={styles.logoutBtn}>Logout</button>
      </div>

      {/* <div className={styles.quickActions}>
        {quickActions.map((action, index) => (
          <div key={index} className={styles.actionCard} style={{ borderColor: action.color }}>
            <div className={styles.actionIcon} style={{ backgroundColor: action.color }}>
              {action.icon}
            </div>
            <span>{action.title}</span>
          </div>
        ))}
      </div> */}

      <div className={styles.statsGrid}>
        {dashboardData.map((stat, index) => (
          <div key={index} className={styles.statCard}>
            <div className={styles.statHeader}>
              <div className={styles.statIcon} style={{ backgroundColor: stat.color }}>
                {stat.icon}
              </div>
              <div className={styles.statInfo}>
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.teamSection}>
        <div className={styles.teamHeader}>
          <h2>Tasks Overview</h2>
        </div>
        
        <div className={styles.teamStats}>
          {teamStats.map((stat, index) => (
            <div key={index} className={styles.teamStatCard}>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={`${styles.statChange} ${styles[stat.changeType]}`}>
                ↑ {stat.change}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.attendanceChart}>
          <h3>Team Attendance Performance</h3>
          {/* <div className={styles.chartControls}>
            <select className={styles.select}>
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Daily</option>
            </select>
            <select className={styles.select}>
              <option>All Departments</option>
              <option>HR</option>
              <option>IT</option>
              <option>Finance</option>
            </select>
          </div> */}
          <div className={styles.chartPlaceholder}>
            <div className={styles.chartBar} style={{ height: '80%', backgroundColor: '#189dd6' }}></div>
            <div className={styles.chartBar} style={{ height: '20%', backgroundColor: '#ff6b6b' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;