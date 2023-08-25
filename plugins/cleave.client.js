import Vue from 'vue'
import Cleave from 'cleave.js'
require('cleave.js/dist/addons/cleave-phone.ng')

Vue.directive('cleave', {
  inserted: (el, binding) => {
    el.cleave = new Cleave(el, binding.value || {})
  },
  update: (el) => {
    const event = new Event('input', { bubbles: true })
    setTimeout(function () {
      el.value = el.cleave.properties.result
      el.dispatchEvent(event)
    }, 100)
  },
})
