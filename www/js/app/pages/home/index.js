(function(App) {
  var log = new Log('Home');

  function Home() {
    log('constructor');
  }

  Home.prototype.Init = function() {
    log('Init');

    App.Menu.Init();
    // log('Init config', config);
    App.User.GetUser();
  };

  Home.prototype.GetGames = function(user) {
    App.Notify.Show('Get Leaderboard');
    App.XHR.get('game?token=' + user.token, {}, function(response, status) {
      log('game', response, status);

      // if (status === 500 || status === 0) {
      //   App.XHR.post('game?token=' + user.token, {
      //     points: 150,
      //     created: Date.now()
      //   }, function(response, status) {
      //     log('game create', response, status);
      //   });
      // }
    });
  }

  Home.prototype.GetPlace = function(user) {
    App.XHR.get('place?token=' + user.token, {}, function(response, status) {
      log('place', response, status);

      // if (status === 500 || status === 0) {
      //   App.XHR.post('game?token=' + user.token, {
      //     points: 150,
      //     created: Date.now()
      //   }, function(response, status) {
      //     log('game create', response, status);
      //   });
      // }
    });
  };

  Home.prototype.ShowLeaderboard = function(response) {
    App.Notify.Show('Show leaderboard');

    var leaders = response.users;
    var userId = response.userId;

    var config = App.Config.Get();
    log('ShowLeaderboard config', config, leaders);

    var $leaderboard = $('<div/>');
    // $leaderboard.addClass('leaderboard panel panel-primary');
    // var $leaderboardBody = $('<div class="panel-body"/>');
    var $leaderboardContainer = $('<table class="table table-striped"/>');
    var $leaderboardContainerBody = $('<tbody/>');

    // $leaderboardBody.height($(document).height() - 110);

    $leaderboard.html('<h3 class="page-header">Leaderboard</h3>');
    // $leaderboard.append($leaderboardBody);
    $leaderboardContainer.append($leaderboardContainerBody);
    $leaderboard.append($leaderboardContainer);
    App.$app.append($leaderboard);
    App.Utils.AddClose();

    $leaderboardContainerBody.html('');

    leaders.forEach(function(leader, index) {
      var $leaderRow = $('<tr/>');
      var $leaderColIcon = $('<td/>');
      var $leaderColNum = $('<td/>');
      var $leaderColPoints = $('<td/>');
      var $leaderColName = $('<td/>');
      
      $leaderColIcon.width(30).css({
        textAlign: 'center'
      });
      $leaderColNum.width(20).css({
        textAlign: 'right'
      }).html(index + 1);
      $leaderColPoints.width(100).css({
        textAlign: 'right'
      });

      if (
        index === 0
        || index === 1
        || index === 2
      ) {
        $leaderRow.addClass('danger');
      }

      if (
        index === 3
        || index === 4
      ) {
        $leaderRow.addClass('warning');
      }

      if (
        index === 5
        || index === 6
      ) {
        $leaderRow.addClass('info');
      }

      if (
        index === 7
        || index === 8
        || index === 9
      ) {
        $leaderRow.addClass('active');
      }

      $leaderRow.append($leaderColIcon);
      $leaderRow.append($leaderColNum);
      $leaderRow.append($leaderColName);
      $leaderRow.append($leaderColPoints);
      $leaderboardContainerBody.append($leaderRow);

      $leaderColPoints.html(App.Utils.formatNumber(leader.points, 0, '.', ','));
      $leaderColName.html(leader.firstName);

      if (leader._id === userId) {
        // $leaderRow.addClass('current');
        $leaderColIcon.append('<span class="glyphicon glyphicon-arrow-right"></span>');
      }
    });
  }

  App.Home = new Home();
})(App);