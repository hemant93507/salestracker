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

  // Client visit page
  {
    path: '/client-visit/',
    componentUrl: './pages/client-visit.html',
    name: 'client-visit',
  },

  // Add Client
  {
    path: '/add-client/',
    componentUrl: './pages/add-client.html',
    name: 'add-client',
  },

  // Dashboard page
  {
    path: '/dashboard/',
    componentUrl: './pages/dashboard.html',
    name: 'dashboard',
  },
  {
    path: '/user-dashboard/',
    componentUrl: './pages/user-dashboard.html',
    name: 'user-dashboard',
  },

  // Default route (404 page)
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
