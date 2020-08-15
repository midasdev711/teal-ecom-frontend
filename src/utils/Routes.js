const Routes = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Products',
    path: '/products',
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

export default Routes;
