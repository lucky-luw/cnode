import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import * as moment from 'moment';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from './store'
import 'github-markdown-css/github-markdown.css'
import  hljs from 'highlight.js'
import api from  './API/api'
moment.locale('zh-cn');

Vue.use(ElementUI);
Vue.config.productionTip = false

Vue.directive('highlight', function (el) {
  const blocks = el.querySelectorAll('pre code')
  blocks.forEach(block => {
    hljs.highlightBlock(block)
  })
})
Vue.prototype.$moment = moment;//赋值使用
Vue.prototype.$API = api;
Vue.filter('formateTime', function (timeString){
  return moment(timeString).fromNow()
})
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

