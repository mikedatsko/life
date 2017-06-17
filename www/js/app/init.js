(function(App) {
  var log = new Log('Init');

  function Init() {
    log('constructor');
    var self = this;

    $(document).on('click', '.btn, .level', function(e) {
      App.Audio.Play($('#audio_btn_click')[0]);
    });

    App.E.subscribe('got-user', function(user) {
      log('got user', user);
      // App.User.GetLeaders();
      App.User.GetPlace();
    });

    App.E.subscribe('got-leaders', function(event) {
      log('got leaders', event);
      App.Home.ShowLeaderboard(event.detail.message);
    });

    App.Routing();
  }

  Init.prototype.Start = function() {
    log('Start');
    
    var config = App.Config.Get();
    if (!config.user.token) {
      App.User.GetUserByDeviceId(function(status, result) {
        log('Start', status, result);

        config.user.token = result.message.token;
        App.Config.Set(config);

        if (!result.message.userName) {
          App.Router.Go('ask-name');
        } else {
          App.Router.Go('');
        }
      });
    } else {
      // App.Home.Init();
      App.Router.Go('');
    }
  }

  App.Init = new Init();

})(App);