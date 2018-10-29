import Vue from 'vue'
import Router from 'vue-router'
import Team from '@/components/Team'
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
import Features from '@/components/Features'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Team',
      component: Team
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
      path: '/tyler',
      name: 'TylerNew',
      component: TylerNew
    },
    {
      path: '/taylorupload',
      name: 'TaylorUpload',
      component: TaylorUpload
    },
    {
      path: '/taylor',
      name: 'TaylorNew',
      component: TaylorNew
    },
    {
      path: '/nateupload',
      name: 'NateUpload',
      component: NateUpload
    },
    {
      path: '/nate',
      name: 'NateNew',
      component: NateNew
    },
    {
      path: '/joeupload',
      name: 'JoeUpload',
      component: JoeUpload
    },
    {
      path: '/joe',
      name: 'JoeNew',
      component: JoeNew
    },
    {
      path: '/brandonupload',
      name: 'BrandonUpload',
      component: BrandonUpload
    },
    {
      path: '/brandon',
      name: 'BrandonNew',
      component: BrandonNew
    },
    {
      path: '/features',
      name: 'Features',
      component: Features
    }
  ]
})
