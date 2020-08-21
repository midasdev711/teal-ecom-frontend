const Routes = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Orders',
    path: '/orders',
    components: [
      {
        title: 'Orders',
        path:'/orders'
      },
      {
        title: 'Drafts',
        path:'/orders/drafts'
      },
      {
        title: 'Abandoned checkouts',
        path:'/orders/checkouts'
      }
    ]
  },
  {
    title: 'Products',
    path: '/products',
  },
  {
    title: 'Customers',
    path: '/customers',
  },
  {
    title: 'Analytics',
    path: '/analytics',
  },
  {
    title: 'Discounts',
    path: '/discounts',
  },
];

const StoriesRoutes = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Posts',
    path: '/posts',
  },
  {
    title: 'Categories',
    path: '/categories',
  },
  {
    title: 'Authors',
    path: '/authors',
  },
  {
    title: 'Insights',
    path: '/insights',
  },
];

export {
  Routes,
  StoriesRoutes,
};

export default {
  Routes,
  StoriesRoutes,
};
