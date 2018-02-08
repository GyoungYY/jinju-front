// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

/*********性能优化**************
 *【1】引入jquery和bootstrap cdn文件：注释main.js中import，再index.html文件中引入
 * 【2】引入element-ui/lib/theme-chalk/index.css cdn文件：同上
 ******************************/

import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
//
Vue.use(ElementUI)

// import $ from 'jquery'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min'

import store from './common/js/storeState'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})
