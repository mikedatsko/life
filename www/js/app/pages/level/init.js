(function(App) {
  var log = new Log('Level1 Init');

  App.Level1.prototype.Init = function(levelId) {
    log('Init');

    var config = App.Config.Get();
    var levels = config.levels;
    var $levels = $('<div class="levels"/>');
    App.$app.append($levels);

    App.User.GetPlace(function(userPlace) {
      log('userPlace', userPlace);
      var config = App.Config.Get();
      config.user.place = userPlace.message;
      App.Config.Set(config);

      App.E.send('updated-place');
    });

    var i = 0;

    for (var levelId in levels) {
      var $level = $('<div class="level"/>');
      $level.addClass(levelId);
      $levels.append($level);

      var w = $level.width();
      var h = w * 1024 / 1024;

      $level.css({
        backgroundPositionY: '-' + (h * i) + 'px'
      });

      var level = config.levels[levelId];
      var rounds = level.rounds;

      log('levels', level);

      $level.width(w);
      $level.height(h);
      // $('body').scrollTop(h);

      rounds.forEach(function(round) {
        var $round = $('<a class="round btn"/>');

        $round.css({
          left: round.x + '%',
          top: round.y + '%'
        }).attr('href', '#level/' + levelId + '/' + round.id);

        if (round.done) {
          $round.addClass('done btn-success');
          $round.html('<span class="glyphicon glyphicon-ok"></span>');
        } else if (round.current) {
          $round.addClass('current btn-danger');
          $round.html('<span class="glyphicon glyphicon-map-marker"></span>');
        } else if (!round.done && !round.current) {
          $round.addClass('blocked btn-default');
          $round.html('<span class="glyphicon glyphicon-lock"></span>');
          $round.click(function(e) {
            e.preventDefault();
            return false
          });
        }

        $level.append($round);
      });
      i++;
    }

    App.Menu.Init();
  };
})(App);