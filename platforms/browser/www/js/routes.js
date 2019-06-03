var routes = [
  // Index page
  {
    path: '/',
    url: './index.html',
    name: 'home',
  },

  // Register page
  {
    path: '/register/',
    componentUrl: './pages/register.html',
    name: 'register',
  },

  // OTP
  {
    path: '/otp/:session/:mobile/',
    componentUrl: './pages/otp.html',
    name: 'otp',
  },

  // Profile page
  {
    path: '/profile/',
    componentUrl: './pages/profile.html',
    name: 'profile',
  },

  // Edit Profile page
  {
    path: '/edit-profile/',
    componentUrl: './pages/edit-profile.html',
    name: 'edit-profile',
  },

  // Feedback page
  {
    path: '/feedback/',
    componentUrl: './pages/feedback.html',
    name: 'feedback',
  },

  // Change password
  {
    path: '/change-password/',
    componentUrl: './pages/change-password.html',
    name: 'change-password',
  },

  // Attendance page
  {
    path: '/attendance/',
    componentUrl: './pages/attendance.html',
    name: 'attendance',
  },
  {
    path: '/attendance-adminview/',
    componentUrl: './pages/attendance-adminview.html',
    name: 'attendance-adminview',
  },

  // Client visit page
  {
    path: '/client-visit/',
    componentUrl: './pages/client-visit.html',
    name: 'client-visit',
  },
  {
    path: '/clientvisit-adminview/',
    componentUrl: './pages/clientvisit-adminview.html',
    name: 'clientvisit-adminview',
  },

  // Employees page
  {
    path: '/employees/',
    componentUrl: './pages/employees.html',
    name: 'employees',
  },

  {
    path: '/employee-detail/:email/',
    componentUrl: './pages/employee-detail.html',
    name: 'employee-detail',
  },

  {
    path: '/party-detail/:email/',
    componentUrl: './pages/party-detail.html',
    name: 'party-detail',
  },

  // Add Client
  {
    path: '/add-client/',
    componentUrl: './pages/add-client.html',
    name: 'add-client',
  },

  // Add Client
  {
    path: '/add-employee/',
    componentUrl: './pages/add-employee.html',
    name: 'add-employee',
  },

  // Dashboard page
  {
    path: '/dashboard/',
    componentUrl: './pages/dashboard.html',
    name: 'dashboard',
  },

  {
    path: '/present-today/',
    componentUrl: './pages/present-today.html',
    name: 'present-today',
  },

  {
    path: '/max-visits/',
    componentUrl: './pages/max-visits.html',
    name: 'max-visits',
  },

  {
    path: '/min-visits/',
    componentUrl: './pages/min-visits.html',
    name: 'min-visits',
  },

  {
    path: '/absent-today/',
    componentUrl: './pages/absent-today.html',
    name: 'absent-today',
  },

  {
    path: '/user-dashboard/',
    componentUrl: './pages/user-dashboard.html',
    name: 'user-dashboard',
  },
  
  // Clients page
  {
    path: '/clients/',
    componentUrl: './pages/clients.html',
    name: 'clients',
  },

  // Add Firm Client
  {
    path: '/add-firm-client/',
    componentUrl: './pages/add-firm-client.html',
    name: 'add-firm-client',
  },


  {
    path: '/client-checkin/',
    componentUrl: './pages/client-checkin.html',
    name: 'client-checkin',
  },

  // Default route (404 page)
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
