import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Transaction from '@/components/Transaction'
import Contact from '@/components/Contact'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/transaction',
      name: 'Transaction',
      component: Transaction
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    }
  ]
})
