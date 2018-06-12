const getImages = ( _url ) => {
  if( _url !== undefined ){
    let _u = _url.substring( 7 );
    return 'https://images.weserv.nl/?url=' + _u;
  }
}

export default {

  name: 'images',

  inserted(el, binding, vnode) {
    el.classList.add(`v-images`)
    el.src = getImages(el.src)
  },

  update(el, binding, vnode, oldVnode) {
    el.classList.add(`v-images`)
    el.src = getImages(el.src)
  }
}