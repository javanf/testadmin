import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Main from '@/page/main'
import Ueditor from '@/components/ueditor'
import Test from '@/page/test'
import Index from '@/page/index'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'Index',
    component: Index,
    children: [{
      path: '/',
      name: 'Main',
      component: Main
    },{
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    }]
  },{
    path: '/test',
    name: 'Test',
    component: Test
  }]
})
