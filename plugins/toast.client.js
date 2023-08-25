import Vue from 'vue'
import Notie from 'notie'
import 'notie/dist/notie.min.css'

Vue.prototype.$toast = Notie

export default function ({ $config }, inject) {
  inject('toast', Notie)
}
