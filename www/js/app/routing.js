(function(App) {
  var log = new Log('Routing');

  App.Routing = function() {
    log('constructor');
    var self = this;

    App.Router.On(function(url) {
      var route = url.split('/');
      log('Routing', url, route);

      App.$app.html('');

      switch(route[0]) {
        case 'level':
          var level = new App.Level1();

          if (route[2]) {
            level.Start(route[1], route[2]);
          } else {
            level.Init();
          }

          break;

        case 'settings':
          var settings = new App.Settings();
          settings.Show();
          break;

        case 'leaderboard':
          App.User.GetLeaders();
          break;

        case 'ask-name':
          App.AskName();
          break;

        default:
          App.Router.Go('level');
          break;
      }
    });
  };
})(App);