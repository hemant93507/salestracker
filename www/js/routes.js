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
  // Complete Profile
  {
    path: '/complete-profile/:email/',
    componentUrl: './pages/complete-profile.html',
    name: 'complete-profile',
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
  
  // Dashboard page
  {
    path: '/dashboard/',
    componentUrl: './pages/dashboard.html',
    name: 'dashboard',
  },
  
  // Default route (404 page)
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
