import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "form-view",
    component: () =>
        import("../views/form-view.vue")
  },
  {
    path: "/form-display",
    name: "form-display",
    component: () =>
        import("../views/form-display.vue")
  },
  {
    path: "/form-view-outlink",
    name: "/form-view-outlink",
    component: () =>
      import("../views/form-view-bpm-outlink.vue")
  },
  {
    path: "/form-display-outlink",
    name: "form-display-outlink",
    component: () =>
      import("../views/form-display-bpm-outlink.vue")
  },
];

const router = new VueRouter({
  routes
});

export default router;
