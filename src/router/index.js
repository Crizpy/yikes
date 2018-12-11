import Vue from 'vue'
import Router from 'vue-router'
import DownloadCenter from '@/components/Downloadcenter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Downloadcenter',
      component: DownloadCenter
    }
  ]
})
