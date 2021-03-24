import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Atmosphere from '../views/atmosphere/index.vue'

Vue.use(VueRouter);
Vue.use(Element);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Atmosphere",
    component: Atmosphere,
  },
  {
    path: "/water",
    name: "water",
    component: ()=>import('../views/water/index.vue'),
  },
  {
    path: "/pollution",
    name: "pollution",
    component: ()=>import('../views/pollution/index.vue'),
  },
  {
    path: "/garbage",
    name: "garbage",
    component: ()=>import('../views/garbage/index.vue'),
  },
  {
    path: "/sewage",
    name: "sewage",
    component: ()=>import('../views/sewage/index.vue'),
  },
  {
    path: "/ecology",
    name: "ecology",
    component: ()=>import('../views/ecology/index.vue'),
  },
];
const router = new VueRouter({
  routes,
});

export default router;
