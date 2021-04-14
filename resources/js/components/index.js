import './common'
import './forms'

import Vue from 'vue'
import Card from './Card'
import Child from './Child'
import Button from './Button'
import Checkbox from './Checkbox'

// Components that are registered globaly.
[
  Card,
  Child,
  Button,
  Checkbox,
].forEach(Component => {
  Vue.component(Component.name, Component)
})
