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
  }
];

const router = new VueRouter({
  routes
});

export default router;
