import Vue from 'vue'
import Router from 'vue-router'
import Team from '@/components/Team'
import Brandon from '@/components/Brandon'
import Joe from '@/components/Joe'
import Nate from '@/components/Nate'
import Taylor from '@/components/Taylor'
import Tyler from '@/components/Tyler'
import Upload from '@/components/Upload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Team',
      component: Team
    },
    {
      path: '/brandon',
      name: 'Brandon',
      component: Brandon
    },
    {
      path: '/joe',
      name: 'Joe',
      component: Joe
    },
    {
      path: '/nate',
      name: 'Nate',
      component: Nate
    },
    {
      path: '/taylor',
      name: 'Taylor',
      component: Taylor
    },
    {
      path: '/tyler',
      name: 'Tyler',
      component: Tyler
    },
    {
      path: '/upload',
      name: 'Upload',
      component: Upload
    }
  ]
})
