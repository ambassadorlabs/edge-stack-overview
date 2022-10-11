import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import VueNativeSock from 'vue-native-websocket'
import { config } from './config'

console.log(config)

Vue.config.productionTip = false
Vue.use(
  VueNativeSock,
  `${config.chatsvcSocketProtocol}${config.chatsvcHost}/ws`,
  { store, format: 'json' }
)

new Vue({
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
