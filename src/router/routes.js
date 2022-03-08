const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/", component: () => import("pages/Index.vue") },
      {
        path: "/home",
        name: "Home",
        component: () => import("src/pages/Home.vue"),
      },
      {
        path: "/report",
        name: "Report",
        component: () => import("src/pages/Report.vue"),
      },
      {
        path: "/summary",
        name: "summary",
        component: () => import("src/pages/Summary.vue"),
      },      
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
