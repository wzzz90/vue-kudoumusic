import Vue from 'vue'
import images from './image.js'

let directives = [
  images
]

export default {
  install(Vue) {
    directives.forEach(directive => {
      let directiveName = directive.name || directive.NAME

      Vue.directive(directiveName, directive)
    })
  }
}