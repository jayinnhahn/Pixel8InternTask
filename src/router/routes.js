const routes = [
  {
    path: "/",
    redirect: {
      name: "my-tasks",
    },
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "my-tasks",
        name: "my-tasks",
        component: () => import("pages/MyTasks.vue"),
      },
      {
        path: "finished-tasks",
        name: "finished-tasks",
        component: () => import("pages/FinishedTasks.vue"),
      },
      {
        path: "deleted-tasks",
        name: "deleted-tasks",
        component: () => import("pages/DeletedTasks.vue"),
      },

      {
        path: "/:catchAll(.*)*",
        component: () => import("pages/ErrorNotFound.vue"),
      },
    ],
  },
];

export default routes;
