import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import Content from '@/page/content'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/index',
      component: Index
    }, {
      path: '/content/:id',
      component: Content
    }
  ]
})
