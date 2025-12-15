// src/data/addons.js

const addons = {
  service_web_basic: [
    {
      id: 'addon_domain',
      name: 'Domain + Hosting (1 Year)',
      description: 'Free domain and reliable hosting for 1 year.',
      price: 2000
    },
    {
      id: 'addon_seo_basic',
      name: 'Basic SEO Setup',
      description: 'On-page SEO setup for better search visibility.',
      price: 1500
    }
  ],

  service_web_multi: [
    {
      id: 'addon_extra_pages',
      name: 'Extra Pages (2)',
      description: 'Add 2 more custom pages to your website.',
      price: 3000
    },
    {
      id: 'addon_analytics',
      name: 'Google Analytics Setup',
      description: 'Track visitors and performance.',
      price: 1000
    }
  ],

  service_react_app: [
    {
      id: 'addon_auth',
      name: 'Authentication Module',
      description: 'Login, signup, and role-based access.',
      price: 5000
    },
    {
      id: 'addon_admin',
      name: 'Admin Dashboard',
      description: 'Admin panel to manage app data.',
      price: 8000
    }
  ]
};

export default addons;
