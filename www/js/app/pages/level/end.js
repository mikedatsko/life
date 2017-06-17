(function(App) {
  var log = new Log('End');

  App.Level1.prototype.End = function(isWin) {
    var self = this;
    var $popup = $('<div class="popup"/>');
    log(this.levelId);
    if (isWin) {
      $popup.html('You win!');
      var next = false;

      var config = App.Config.Get();
      var levels = config.levels;

      for (var levelId in levels) {
        var level = levels[levelId];
        var rounds = level.rounds;
        rounds = rounds.map(function(round) {
          if (next) {
            round.current = true;
            next = false;
          }
          
          if (self.round.id === round.id) {
            next = true;
            round.done = true;
            round.current = false;
          }
          
          return round;
        });
      }

      config.user.points = parseInt(config.user.points) + parseInt(self.$score.text());

      App.Config.Set(config);
      App.User.UpdatePoints();
    } else {
      $popup.html('You loose...');
    }

    var $restart = $('<a href="#level/' + this.levelId + '" class="btn-restart"/>');
    $restart.html('Continue');

    $popup.append($restart);
    var $level = $('#level');
    $level.html($popup);
  }
})(App);