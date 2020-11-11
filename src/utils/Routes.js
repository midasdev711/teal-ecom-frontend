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
    title: "Pages",
    path: "/[portal_id]/pages/setup-new",
    as: "/[portal_id]/pages/setup-new"
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
    path: "/[portal_id]/stories/dashboard",
    as: "/[portal_id]/stories/dashboard",
  },
  {
    title: "Stories",
    path: "/[portal_id]/stories/:id",
    as: "/[portal_id]/stories/:id",
  },
  {
    title: "StoriesNew",
    path: "/[portal_id]/stories/setup-new",
    as: "/[portal_id]/stories/setup-new",
  },
  {
    title: "EditPost",
    path: "/[portal_id]/stories/",
    as: "/[portal_id]/stories/",
  },
  // {
  //   title: "Posts",
  //   path: "/posts",
  //   as: "/posts",
  // },
  {
    title: "NewPost",
    path: "/[portal_id]/stories/posts/new",
    as: "/[portal_id]/stories/posts/new",
  },
  {
    title: "Posts",
    path: "/[portal_id]/stories/posts/[post_status]",
    as: "/[portal_id]/stories/posts/drafts",
  },
  {
    title: "Categories",
    path: "/[portal_id]/stories/categories",
    as: "/[portal_id]/stories/categories",
  },
  {
    title: "Authors",
    path: "/[portal_id]/stories/authors",
    as: "/[portal_id]/stories/authors",
  },
  {
    title: "Insights",
    path: "/[portal_id]/stories/insights",
    as: "/[portal_id]/stories/insights",
  },
  {
    title: "Splitter",
    path: "/[portal_id]/stories/campaign",
    as: "/[portal_id]/stories/campaign",
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
