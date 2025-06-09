// src/directives/v-click-outside.js
export default {
  bind(el, binding, vnode) {
    // Define our handler and attach it to the element
    el.__ClickOutsideHandler__ = (event) => {
      // Here we check if the click is outside the element and
      // call the provided handler if it is
      if (!(el.contains(event.target) || el === event.target)) {
        binding.value(event);  // Call the provided 'value' method
      }
    };
    document.addEventListener('click', el.__ClickOutsideHandler__);
  },
  unbind(el) {
    // Remove the event listener when the directive is unbound
    document.removeEventListener('click', el.__ClickOutsideHandler__);
    el.__ClickOutsideHandler__ = null;
  },
};
