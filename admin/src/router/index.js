import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Main from '../views/Main'
import CategoryEdit from '../views/Categories/CategoryEdit'
import CategoriesList from '../views/Categories/CategoriesList'

import ItemEdit from '../views/Items/ItemEdit'
import ItemsList from '../views/Items/ItemsList'

import HeroEdit from '../views/Heroes/HeroEdit'
import HeroesList from '../views/Heroes/HeroesList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      { path: "/categories/create", component: CategoryEdit},
      { path: "/categories/edit/:id", component: CategoryEdit, props: true},
      { path: "/categories/list", component: CategoriesList},

      { path: "/items/create", component: ItemEdit},
      { path: "/items/edit/:id", component: ItemEdit, props: true},
      { path: "/items/list", component: ItemsList},

      { path: "/hero/create", component: HeroEdit},
      { path: "/heroes/edit/:id", component: HeroEdit, props: true},
      { path: "/heroes/list", component:HeroesList}
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
