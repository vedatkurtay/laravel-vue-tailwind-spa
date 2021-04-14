import Vue from 'vue'
import Dropdown from './Dropdown'

// Components that are registered globaly.
[
  Dropdown
].forEach(Component => {
  Vue.component(Component.name, Component)
})
