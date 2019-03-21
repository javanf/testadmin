import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/page/layout'
import Main from '@/page/main'
import User from '@/page/user'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [{
        path: '/',
        name: 'Main',
        component: Main
      },{
        path: '/user',
        name: 'User',
        component: User
      }]
    }
  ]
})
