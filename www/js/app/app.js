(function(global) {
  var log = new global.Log('App');
  global.App = new App();

  function App() {
    log('constructor');

    this.$app = $('#app');
  }

})(window);