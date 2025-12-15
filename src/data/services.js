export const SERVICES = [
  {
    id: 'landing',
    name: 'Landing Website',
    description: 'Single-page website perfect for portfolios and small businesses',
    basePrice: 15000,
    addons: [
      { id: 'seo', name: 'SEO Optimization', price: 3000 },
      { id: 'forms', name: 'Contact Forms', price: 2000 },
      { id: 'analytics', name: 'Analytics Setup', price: 1500 }
    ]
  },
  {
    id: 'react',
    name: 'React Website',
    description: 'Multi-page dynamic website with modern React framework',
    basePrice: 35000,
    addons: [
      { id: 'cms', name: 'CMS Integration', price: 8000 },
      { id: 'auth', name: 'User Authentication', price: 6000 },
      { id: 'api', name: 'API Integration', price: 5000 },
      { id: 'seo', name: 'SEO Optimization', price: 3000 }
    ]
  },
  {
    id: 'webapp',
    name: 'Web Application',
    description: 'Full-featured web application with custom functionality',
    basePrice: 75000,
    addons: [
      { id: 'dashboard', name: 'Admin Dashboard', price: 15000 },
      { id: 'payment', name: 'Payment Gateway', price: 10000 },
      { id: 'cloud', name: 'Cloud Deployment', price: 8000 },
      { id: 'mobile', name: 'Mobile Responsive', price: 7000 }
    ]
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce Website',
    description: 'Complete online store with shopping cart and checkout',
    basePrice: 50000,
    addons: [
      { id: 'inventory', name: 'Inventory Management', price: 12000 },
      { id: 'multi-payment', name: 'Multiple Payment Options', price: 8000 },
      { id: 'shipping', name: 'Shipping Integration', price: 6000 }
    ]
  },
  {
    id: 'mobile',
    name: 'Mobile App Development',
    description: 'Native or hybrid mobile applications for iOS and Android',
    basePrice: 100000,
    addons: [
      { id: 'push', name: 'Push Notifications', price: 8000 },
      { id: 'offline', name: 'Offline Support', price: 12000 },
      { id: 'analytics-mobile', name: 'Analytics Integration', price: 5000 }
    ]
  },
  {
    id: 'maintenance',
    name: 'Website Maintenance',
    description: 'Monthly maintenance and support package',
    basePrice: 5000,
    addons: [
      { id: 'backup', name: 'Daily Backups', price: 1000 },
      { id: 'security', name: 'Security Monitoring', price: 2000 },
      { id: 'updates', name: 'Content Updates', price: 1500 }
    ]
  }
];