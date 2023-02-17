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
            path: "rpt-allocation",
            name: "rpt-allocation",
            component: () =>
              import("../pages/Settings/RPTAllocation/RPTAllocation.vue"),
          },
          {
            path: "rpt-allocation-add/:id?",
            name: "rpt-allocation-add",
            component: () =>
              import("../pages/Settings/RPTAllocation/AddRPT.vue"),
          },

          {
            path: "rpt-allocation-information/:id?",
            name: "rpt-allocation-information",
            component: () =>
              import(
                "../pages/Settings/RPTAllocation/AllocationInformation.vue"
              ),
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
