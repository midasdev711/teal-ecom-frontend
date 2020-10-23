// {const data = localStorage.getItem(channelName)
// console.log('data', data)
// }
const Routes = [
  {
    title: "Home",
    path: "/[portal_id]/ecom",
    as: "/[portal_id]/ecom",
  },
  {
    title: "Orders",
    path: "/[portal_id]/ecom/orders",
    as: "/[portal_id]/ecom/orders",
    components: [
      {
        title: "Orders",
        path: "/[portal_id]/ecom/orders",
        as: "/[portal_id]/ecom/orders",
      },
      {
        title: "Drafts",
        path: "/[portal_id]/ecom/orders/drafts",
        as: "/[portal_id]/ecom/orders/drafts",
      },
      {
        title: "Abandoned checkouts",
        path: "/[portal_id]/ecom/orders/checkouts",
        as: "/[portal_id]/ecom/orders/checkouts",
      },
    ],
  },
  {
    title: "Products",
    path: "/[portal_id]/ecom/products",
    as: "/[portal_id]/ecom/products",
    components: [
      {
        title: "All products",
        path: "/[portal_id]/ecom/products",
        as: "/[portal_id]/ecom/products",
      },
      {
        title: "Inventory",
        path: "/[portal_id]/ecom/products/inventory",
        as: "/[portal_id]/ecom/products/inventory",
      },
      {
        title: "Transfers",
        path: "/[portal_id]/ecom/products/transfers",
        as: "/[portal_id]/ecom/products/transfers",
      },
      {
        title: "Collections",
        path: "/[portal_id]/ecom/products/collections",
        as: "/[portal_id]/ecom/products/collections",
      },
      {
        title: "Gift cards",
        path: "/products/gift-cards",
        as: "/[portal_id]/ecom/products/gift-cards",
      },
    ],
  },
  {
    title: "Customers",
    path: "/[portal_id]/ecom/customers",
    as: "/[portal_id]/ecom/customers",
  },
  {
    title: "Analytics",
    path: "/[portal_id]/ecom/analytics",
    as: "/[portal_id]/ecom/analytics",
  },
  {
    title: "Discounts",
    path: "/[portal_id]/ecom/discounts",
    as: "/[portal_id]/ecom/discounts",
  },
];

const StoriesRoutes = [
  {
    title: "Home",
    path: "/[portal_id]/stories",
    as: "/[portal_id]/stories",
  },
  {
    title: "Posts",
    path: "/posts",
    as: "/posts",
  },
  // {
  //   title: "Posts",
  //   path: "/[portal_id]/stories/posts/[post_status]",
  //   as: "/[portal_id]/stories/posts/live",
  // },
  {
    title: "Categories",
    path: "/categories",
  },
  {
    title: "Authors",
    path: "/authors",
  },
  {
    title: "Insights",
    path: "/insights",
  },
  {
    title: "Splitter",
    path: "/[portal_id]/stories/campaign",
  },
];

const MainRoutes = {
  Ecommerce: "ecom",
  Stories: "stories",
};

export { Routes, StoriesRoutes, MainRoutes };

export default {
  Routes,
  MainRoutes,
  StoriesRoutes,
};
