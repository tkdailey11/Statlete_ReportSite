import Vue from 'vue'
import Router from 'vue-router'
import Team from '@/components/Team'
import Brandon from '@/components/Brandon'
import Joe from '@/components/Joe'
import Nate from '@/components/Nate'
import Taylor from '@/components/Taylor'
import Tyler from '@/components/Tyler'
import Upload from '@/components/Upload'
import TylerUpload from '@/components/TylerUpload'
import TylerNew from '@/components/TylerNew'
import TaylorUpload from '@/components/TaylorUpload'
import TaylorNew from '@/components/TaylorNew'
import NateUpload from '@/components/NateUpload'
import NateNew from '@/components/NateNew'
import JoeUpload from '@/components/JoeUpload'
import JoeNew from '@/components/JoeNew'
import BrandonUpload from '@/components/BrandonUpload'
import BrandonNew from '@/components/BrandonNew'

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
    },
    {
      path: '/tylerupload',
      name: 'TylerUpload',
      component: TylerUpload
    },
    {
      path: '/tyler1',
      name: 'TylerNew',
      component: TylerNew
    },
    {
      path: '/taylorupload',
      name: 'TaylorUpload',
      component: TaylorUpload
    },
    {
      path: '/taylor1',
      name: 'TaylorNew',
      component: TaylorNew
    },
    {
      path: '/nateupload',
      name: 'NateUpload',
      component: NateUpload
    },
    {
      path: '/nate1',
      name: 'NateNew',
      component: NateNew
    },
    {
      path: '/joeupload',
      name: 'JoeUpload',
      component: JoeUpload
    },
    {
      path: '/joe1',
      name: 'JoeNew',
      component: JoeNew
    },
    {
      path: '/brandonupload',
      name: 'BrandonUpload',
      component: BrandonUpload
    },
    {
      path: '/brandon1',
      name: 'BrandonNew',
      component: BrandonNew
    }
  ]
})
