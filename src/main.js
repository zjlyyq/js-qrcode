import Vue from 'vue'
import App from './App.vue'
import VConsole from 'vconsole'

Vue.config.productionTip = false
const v = new VConsole();
new Vue({
  render: h => h(App),
}).$mount('#app')
