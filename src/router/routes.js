const routes = [
  {
    path: "/",
    name: "",
    component: () => import("../layouts/MainLayout.vue"),
    children: [
      {
        path: "elements",
        name: "elements",
        component: () => import("../pages/Elements.vue"),
      },
      {
        path: "activity-logs",
        name: "activity-logs",
        component: () => import("pages/ActivityLogs/ActivityLogs.vue"),
      },
      {
        path: "my-page",
        name: "my-page",
        component: () => import("../pages/MyPage/MyPage.vue"),
      },
      {
        path: "",
        name: "main",
        component: () => import("../pages/Main.vue"),
        children: [
          {
            path: "add-user/:id?",
            name: "add-user",
            component: () => import("../pages/UserManagement/AddUser.vue"),
          },
          {
            path: "users",
            name: "users",
            component: () => import("../pages/UserManagement/Users.vue"),
          },
          // Connecting the homepage to the activitylogs page
          {
            path: "activity-logs",
            name: "activity-logs",
            component: () => import("../pages/ActivityLogs/ActivityLogs.vue"),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../pages/Login.vue"),
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
