# First-Us - Complete Project Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Features & Modules](#features--modules)
5. [Authentication System](#authentication-system)
6. [User Roles & Permissions](#user-roles--permissions)
7. [State Management](#state-management)
8. [API Integration](#api-integration)
9. [Installation & Setup](#installation--setup)
10. [Development Guidelines](#development-guidelines)
11. [Component Architecture](#component-architecture)
12. [Styling & UI](#styling--ui)

---

## 🚀 Project Overview

**MAT**  is a comprehensive workforce management and collaboration platform built with Next.js. The application provides role-based access control with distinct interfaces for Admins, Employers, and Users, featuring task management, user administration, time tracking, and dashboard analytics.

### Key Characteristics
- **Framework**: Next.js 15.2.3 with App Router
- **Architecture**: Role-based multi-tenant application
- **State Management**: Zustand with persistence
- **Styling**: SCSS modules + Tailwind CSS
- **UI Components**: Custom components + Radix UI primitives
- **Authentication**: JWT-based with role-based access control

---

## 🛠 Technology Stack

### Core Technologies
- **Next.js 15.2.3** - React framework with App Router
- **React 19.0.0** - UI library
- **TypeScript/JavaScript** - Programming language
- **Zustand 5.0.5** - State management
- **Axios 1.10.0** - HTTP client for API calls

### UI & Styling
- **SCSS/Sass 1.86.0** - CSS preprocessor
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Framer Motion 12.6.2** - Animation library
- **React Icons 5.5.0** - Icon library
- **Lucide React 0.483.0** - Additional icons

### Additional Libraries
- **Recharts 2.15.3** - Data visualization
- **React Toastify 11.0.5** - Notifications
- **Embla Carousel React 8.5.2** - Carousel component
- **Class Variance Authority** - Component variants
- **CLSX** - Conditional class names

---

## 📁 Project Structure

```
first-us/
├── app/                          # Next.js App Router pages
│   ├── auth/                     # Authentication pages
│   │   ├── signin/               # Sign-in page
│   │   └── signup/               # Sign-up page
│   ├── dashboard/                # Dashboard page
│   ├── employee-management/      # Employee management (coming soon)
│   ├── jobs-posting/             # Job posting module
│   ├── tasks-management/         # Task management interface
│   ├── time-attendance/          # Time tracking module
│   ├── user-management/          # User administration
│   ├── layout.jsx                # Root layout
│   └── page.jsx                  # Home page (dashboard)
├── components/                   # Reusable UI components
│   ├── animations/               # Animation components
│   ├── common/                   # Shared components
│   ├── credentials/              # Auth-related components
│   ├── dashboard/                # Dashboard components
│   ├── sidebar/                  # Navigation sidebar
│   ├── tasks/                    # Task-related components
│   └── ui/                       # Base UI components
├── store/                        # Zustand state management
│   ├── admin/                    # Admin-specific stores
│   ├── common/                   # Shared stores (auth, UI, API)
│   ├── employers/                # Employer-specific stores
│   ├── users/                    # User-specific stores
│   └── index.js                  # Store exports and utilities
├── lib/                          # Utility libraries
│   ├── api/                      # API helper functions
│   ├── config/                   # Configuration files
│   └── utils/                    # General utilities
├── styles/                       # SCSS stylesheets
│   ├── common/                   # Shared styles
│   ├── components/               # Component-specific styles
│   └── _globals.scss             # Global styles
└── public/                       # Static assets
    ├── assets/                   # Images and media
    └── fonts/                    # Custom fonts
```

---

## ✨ Features & Modules

### 🏠 Dashboard
- **Role-based dashboards** with personalized content
- **Analytics and metrics** visualization using Recharts
- **Quick actions** and navigation shortcuts
- **Real-time data** updates and notifications

### 👤 Authentication System
- **Multi-role authentication** (Admin, Employer, User)
- **JWT token management** with session/local storage
- **Protected routes** with role-based access control
- **Password management** and profile updates

### 📋 Task Management
- **Create, edit, and delete tasks** with rich metadata
- **Task assignment** and delegation
- **Status tracking** (Pending, In Progress, Completed)
- **Priority levels** and due date management
- **Task statistics** and progress visualization

### 👥 User Management (Admin)
- **User creation and management** across all roles
- **Role assignment** and permission control
- **User status management** (Active/Inactive)
- **Bulk operations** and user statistics

### 🏢 Employee Management
- **Employee profiles** and information management
- **Performance tracking** and evaluation
- **Payroll and benefits** administration
- **Schedule management** and shift planning
- **HR reporting** and analytics

### 💼 Job Posting
- **Job creation and publishing** with detailed descriptions
- **Application management** and candidate tracking
- **Job status control** (Active/Inactive/Closed)
- **Application analytics** and reporting

### ⏰ Time & Attendance
- **Clock in/out functionality** with timestamp tracking
- **Attendance reports** and analytics
- **Leave management** and approval workflows
- **Overtime tracking** and calculations

---

## 🔐 Authentication System

### Authentication Flow
1. **User Login** → Credentials validation
2. **JWT Token Generation** → Secure token creation
3. **Role Detection** → User role identification
4. **Store Initialization** → Role-specific data loading
5. **Dashboard Redirect** → Personalized interface

### Token Management
- **Session Storage** - Default token storage
- **Local Storage** - "Remember Me" functionality
- **Automatic Refresh** - Token renewal handling
- **Secure Logout** - Complete session cleanup

## 👥 User Roles & Permissions

### 🔴 Admin Role
**Full system access with administrative privileges**

**Permissions:**
- Complete user management (create, edit, delete users)
- System-wide task management and oversight
- Employee management and HR functions
- Job posting creation and management
- Time & attendance administration
- System settings and configuration
- Reports and analytics access
- All dashboard metrics and insights

**Navigation Access:**
- Dashboard, Tasks Management, Employee Management
- User Management, Job Posting, Time & Attendance
- Reports & Analytics, System Settings

### 🟡 Employer Role
**Team management and task delegation capabilities**

**Permissions:**
- Team member management within organization
- Task creation and assignment to team members
- Team performance monitoring and reporting
- Job posting for their organization
- Team time & attendance tracking
- Limited user management (team members only)
- Team-specific analytics and reports

**Navigation Access:**
- Dashboard, Tasks Management, Team Management
- Job Posting, Time & Attendance, Team Reports

### 🟢 User Role
**Individual contributor with personal task management**

**Permissions:**
- Personal task management (view, update status)
- Profile management and settings
- Time tracking (clock in/out)
- Task completion and progress updates
- Personal productivity metrics
- Limited dashboard with personal insights

**Navigation Access:**
- Dashboard, My Tasks, Profile, Time Tracking

---


## 🚀 Installation & Setup

### Prerequisites
- **Node.js** 18.0.0 or higher
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **Git** for version control


## 📋 Development Guidelines

### Code Organization
- **Components** should be functional and use hooks
- **Styles** should use SCSS modules for component-specific styling
- **State management** should follow the role-based store pattern
- **API calls** should be centralized in store actions
- **Error handling** should be consistent across the application

### Naming Conventions
- **Components**: PascalCase (e.g., `TaskManagement.jsx`)
- **Files**: camelCase for utilities, PascalCase for components
- **CSS Classes**: kebab-case (e.g., `.task-container`)
- **Store Actions**: camelCase (e.g., `createTask`, `updateUser`)

### Best Practices
- Use **TypeScript** for better type safety (when applicable)
- Implement **proper error boundaries** for component error handling
- Follow **accessibility guidelines** for inclusive design
- Use **semantic HTML** elements for better SEO and accessibility
- Implement **loading states** for better user experience
- Add **proper validation** for all forms and inputs

---



## 🎨 Styling & UI

### Styling Architecture

#### SCSS Modules Structure
```
styles/
├── _globals.scss              # Global styles and CSS variables
├── common/                    # Shared component styles
├── components/                # Component-specific styles
│   ├── dashboard/            # Dashboard-related styles
│   ├── sidebar/              # Sidebar navigation styles
│   └── tasks/                # Task management styles
├── credentials/               # Authentication page styles
├── landingpage/              # Landing page styles
└── pages/                    # Page-specific styles
```


## 🧪 Testing Strategy

### Testing Approach
- **Unit Tests** - Individual component and function testing
- **Integration Tests** - Store and API integration testing
- **E2E Tests** - Complete user workflow testing
- **Visual Regression Tests** - UI consistency testing

### Recommended Testing Tools
- **Jest** - Unit testing framework
- **React Testing Library** - Component testing utilities
- **Cypress** - End-to-end testing
- **Storybook** - Component documentation and testing


## 🚀 Deployment & Production

### Deployment Options
- **Vercel** - Recommended for Next.js applications
- **AWS** - Full cloud infrastructure
- **Docker** - Containerized deployment

### Production Optimizations
- **Code splitting** - Automatic with Next.js
- **Image optimization** - Built-in Next.js image component
- **Bundle analysis** - Regular bundle size monitoring
- **Performance monitoring** - Core Web Vitals tracking


## 🤝 Contributing Guidelines

### Code Standards
- Follow **ESLint** configuration
- Use **Prettier** for code formatting
- Write **meaningful commit messages**
- Add **JSDoc comments** for complex functions
- Include **unit tests** for new features

### Pull Request Process
1. Create feature branch from `main`
2. Implement changes with tests
3. Update documentation if needed
4. Submit pull request with description
5. Address review feedback
6. Merge after approval

### Issue Reporting
- Use provided issue templates
- Include reproduction steps
- Provide environment details
- Add relevant screenshots/logs