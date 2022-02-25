import Vue from 'vue'
import Buefy from 'buefy'

Vue.use(Buefy)

import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
