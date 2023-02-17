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
        path: "my-page",
        name: "my-page",
        component: () => import("../pages/MyPage/MyPage.vue"),
      },
      {
        path: "trash",
        component: () => import("../pages/Trash/Trash.vue"),
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
          {
            path: "trash-or-ranges",
            name: "trash-or-ranges",
            component: () => import("../pages/Trash/OR-Ranges/OrRanges.vue"),
          },
          {
            path: "trash-rcd",
            name: "trash-rcd",
            component: () => import("../pages/Trash/RCD/RCD.vue"),
          },
          {
            path: "trash-logbook",
            name: "trash-logbook",
            component: () => import("../pages/Trash/Logbook/Logbook.vue"),
          },
          {
            path: "trash-rci",
            name: "trash-rci",
            component: () => import("../pages/Trash/RCI/RCI.vue"),
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
