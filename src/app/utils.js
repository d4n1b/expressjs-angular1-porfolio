module.exports = {

  // Random string
  randStr: ( length ) => {
    var invalidNumber = !parseInt( length ),
      start = 2,
      end = ( invalidNumber || length + start >= 16 ? 16 : length + start );

    return Math.random().toString(36).substring(start, end);
  },

  debounce: (func, wait, immediate) => {
    // thanks: https://davidwalsh.name/javascript-debounce-function
    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    var timeout;
    return () => {
      var context = this, args = arguments;
      var later = () => {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

};