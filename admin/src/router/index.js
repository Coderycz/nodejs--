import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Main from '../views/Main'
import CategoryEdit from '../views/Categories/CategoryEdit'
import CategoryList from '../views/Categories/CategoryList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: "/categories/create", component: CategoryEdit},
      { path: "/categories/edit/:id", component: CategoryEdit, props: true},
      { path: "/categories/list", component: CategoryList}
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
