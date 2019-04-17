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
    tabs: [
      // First (default) tab has the same url as the page itself
      {
        path: '/',
        id: 'tab-1',
        componentUrl: './pages/tab-1.html',
        // content: '<div class="block"></div>',
      },
      // Second tab
      {
        path: '/tab-2/',
        id: 'tab-2',
        componentUrl: './pages/tab-2.html',
      },
      // Third tab
      {
        path: '/tab-3/',
        id: 'tab-3',
        componentUrl: './pages/tab-3.html',
      },
      // Fourth tab
      {
        path: '/tab-4/',
        id: 'tab-4',
        componentUrl: './pages/tab-4.html',
      },
      // Fifth tab
      {
        path: '/tab-5/',
        id: 'tab-5',
        componentUrl: './pages/tab-5.html',
      },
    ],
  },
  // Default route (404 page)
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
