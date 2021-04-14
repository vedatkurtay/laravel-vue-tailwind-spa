import Vue from 'vue'

import HasError from './validation/HasError.vue'
import AlertError from './validation/AlertError'
import AlertSuccess from './validation/AlertSuccess'
import Checkbox from './Checkbox'

// Components that are registered globaly.
[
  HasError,
  AlertError,
  AlertSuccess,
  Checkbox
].forEach(Component => {
  Vue.component(Component.name, Component)
})
