import Vue from 'vue'
import VueRouter from 'vue-router'
import Cart from '../components/Cart'
import Products from '../components/Products'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'product',
    component: Products
  },
    {
        path: '/cart',
        name: 'cart',
        component: Cart
    }
]

const router = new VueRouter({
  routes
})

export default router
