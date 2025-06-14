// components/Dashboard/Dashboard.jsx
'use client';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { HiUsers, HiUserGroup, HiBriefcase } from 'react-icons/hi2';
import styles from '@/styles/dashboard/Dashboard.module.scss';

const Dashboard = () => {
  const dashboardData = [
    {
      title: 'Total Users',
      value: '108',
      icon: HiUsers,
      color: '#faf3f3'
    },
    {
      title: 'Total Employers',
      value: '25',
      icon: HiUserGroup,
      color: '#faf9f3'
    },
    {
      title: 'Total Jobs',
      value: '0',
      icon: HiBriefcase,
      color: '#f3faf4'
    }
  ];

  // Attendance data for Users and Employers over the week
  const chartData = [
    { day: 'Mon', users: 88, employers: 92 },
    { day: 'Tue', users: 85, employers: 89 },
    { day: 'Wed', users: 90, employers: 94 },
    { day: 'Thu', users: 87, employers: 91 },
    { day: 'Fri', users: 82, employers: 88 },
    { day: 'Sat', users: 45, employers: 65 },
    { day: 'Sun', users: 35, employers: 55 },
  ];

  // Pie chart data for task distribution
  const taskDistributionData = [
    { name: 'Completed', value: 45, color: '#10b981' },
    { name: 'In Progress', value: 35, color: '#f59e0b' },
    { name: 'Pending', value: 20, color: '#ef4444' },
  ];


  // Custom tooltip formatter for attendance chart
  const formatTooltip = (value, name) => {
    if (name === 'users') {
      return [`${value}%`, 'Users Attendance'];
    } else if (name === 'employers') {
      return [`${value}%`, 'Employers Attendance'];
    }
    return [`${value}%`, name];
  };

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
      changeType: 'positive',
      color: '#faf3f3'
    },
    {
      label: 'In Progress Tasks',
      value: '97',
      change: '+1.2%',
      changeType: 'negative',
      color: '#faf9f3'
    },
    {
      label: 'Completed Tasks',
      value: '2',
      change: '+3.1%',
      changeType: 'positive',
      color: '#f3faf4'
    }
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div className={styles.welcome}>
          {/* <h1>Welcome back, Pavan</h1> */}
          <p>Here's what's happening with your team today.</p>
        </div>
        {/* <button className={styles.logoutBtn}>Logout</button> */}
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
          <div key={index} className={styles.statCard} style={{ backgroundColor: stat.color }}>
            <div className={styles.statHeader}>
              <div className={styles.statInfo}>
                <h3>{stat.value}</h3>
                <p>{stat.title}</p>
              </div>
              <div className={styles.statIcon}>
                <stat.icon />
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
            <div key={index} className={styles.teamStatCard} style={{ backgroundColor: stat.color }}>
              <div className={styles.statLabel}>{stat.label}</div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={`${styles.statChange} ${styles[stat.changeType]}`}>
                ↑ {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className={styles.chartsSection}>
          {/* Attendance Graph for Users and Employers */}
          <div className={styles.chartContainer}>
            <h3>Users & Employers Attendance</h3>
            <div className={styles.chartWrapper}>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis
                    dataKey="day"
                    stroke="#64748b"
                    fontSize={12}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={12}
                  />
                  <Tooltip
                    formatter={formatTooltip}
                    labelStyle={{ color: '#64748b', fontWeight: '500' }}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      fontSize: '14px'
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#1481b9"
                    strokeWidth={3}
                    dot={{ fill: '#1481b9', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#1481b9', strokeWidth: 2 }}
                    name="Users"
                  />
                  <Line
                    type="monotone"
                    dataKey="employers"
                    stroke="#189dd6"
                    strokeWidth={3}
                    dot={{ fill: '#189dd6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#189dd6', strokeWidth: 2 }}
                    name="Employers"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart for Task Distribution */}
          <div className={styles.chartContainer}>
            <h3>Task Distribution</h3>
            <div className={styles.chartWrapper}>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={taskDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {taskDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;