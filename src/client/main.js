// only need to import bootstrap here for all components to have access to it
import 'bootstrap/dist/css/bootstrap.css'
// import site specific global styles AFTER bootstrap
import './assets/css/theme.scss'
import './assets/css/style.css'

import Vue from 'vue'
import VueFire from 'vuefire'
import VeeValidate from 'vee-validate'
import App from './App.vue'

// turn off the console note about switching to production mode
Vue.config.productionTip = false

// explicit installation required in module environments
Vue.use(VueFire)
Vue.use(VeeValidate)

// simply creating the Vue instance does all the necessary set up, so no need to name it
new Vue({
    // HTML element to attach Vue app
    el: '#app',
    // components (HTML, CSS, and JS) used by this app
    components: {
        App
    },
    // simply render the app component as this app
    template: '<App/>'
})
