// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import firebase from 'firebase'
import { config } from './helpers/firebaseConfig'
firebase.initializeApp(config);

Vue.config.productionTip = false

import VModal from 'vue-js-modal'
Vue.use(VModal)

import vSelect from 'vue-select'
Vue.component('v-select', vSelect)

import VuejsDialog from "vuejs-dialog"
// include the default style
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
Vue.use(VuejsDialog)

import jQuery from 'jquery'
global.jQuery = jQuery

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
