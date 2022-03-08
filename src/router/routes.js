const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      {
        path: "/home",
        name: "Home",
        component: () => import("pages/Home.vue"),
      },
      {
        path: "/assignments",
        name: "Assignments",
        component: () => import("pages/Assignments.vue"),
      },
      {
        path: "/feedback",
        name: "Feedback",
        component: () => import("pages/Feedbacks.vue"),
      },
      {
        path: "/createFeedback",
        name: "CreateFeedback",
        component: () => import("src/components/Feedbacks/CreateFeedback.vue"),
      },
      {
        path: "/insights",
        name: "Insights",
        component: () => import("pages/Insights.vue"),
      },
      {
        path: "/members",
        name: "Members",
        component: () => import("pages/Members.vue"),
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
