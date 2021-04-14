import Vue from 'vue'

import HasError from './validation/HasError.vue'
import AlertError from './validation/AlertError'
import AlertSuccess from './validation/AlertSuccess'

// Components that are registered globaly.
[
  HasError,
  AlertError,
  AlertSuccess
].forEach(Component => {
  Vue.component(Component.name, Component)
})
