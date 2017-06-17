(function(App, window) {
  var log = new Log('Router');

  function Router() {
    log('constructor');
    this.Reset();
  }

  Router.prototype.Go = function(page) {
    window.location.hash = page;
  }

  Router.prototype.On = function(callback) {
    window.addEventListener('hashchange', function(event) {
      var page = window.location.hash.substr(1);
      callback(page);
    });
  }

  Router.prototype.Reset = function() {
    window.location.hash = 'level';
  }

  Router.prototype.Back = function() {
    window.history.back();
  }

  App.Router = new Router();
})(App, window);