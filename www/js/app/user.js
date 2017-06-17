
(function(App) {
  var signinTimes = 0;
  var log = new Log('User');

  function User() {
    log('constructor');
  }

  User.prototype.Signin = function() {
    log('Signin');
    App.Notify.Show('Signin user', 'info', 30000);

    var config = App.Config.Get();
    
    signinTimes++;

    App.XHR.post('user/signin', {
      email: config.user.name + '@datsko.it',
      password: '123456'
    }, function(response, status) {
      log('signin', response, status);

      if (status === 404) {
        App.Notify.Show('User not found', 'danger');

        var config = App.Config.Get();
        config.user.token = '';
        App.Config.Set(config);

        App.User.Signup();
      } else {
        App.Notify.Show('User signed in', 'success');
        var user = response;

        var config = App.Config.Get();
        config.user.token = user.token;
        App.Config.Set(config);

        App.User.GetUser();
      }
    });
  }

  User.prototype.Signup = function() {
    log('Signup');
    App.Notify.Show('Signup user', 'info', 30000);

    var config = App.Config.Get();

    App.XHR.post('user', {
      firstName: config.user.name,
      lastName: 'lastname',
      email: config.user.name + '@datsko.it',
      password: '123456',
      created: Date.now(),
      points: 0
    }, function(response, status) {
      App.Notify.Show('User signed up', 'success');
      log('signup', response, status);

      var user = response;

      var config = App.Config.Get();
      config.user.token = user.token;
      App.Config.Set(config);

      App.User.GetUser();
      // App.Home.Init();
    });
  }

  User.prototype.GetUser = function() {
    log('GetUser');
    App.Notify.Show('Get user', 'info', 30000);

    var config = App.Config.Get();

    if (!config.user.token) {
      if (signinTimes >= 10) {
        App.Notify.Show('Check your internet connection', 'danger');
      } else {
        App.User.Signin();
      }
      return
    }

    App.XHR.get('user?token=' + config.user.token, {}, function(response, status) {
      log('get user', response, status);

      var config = App.Config.Get();

      if (status === 200) {
        App.Notify.Show('Got the user', 'success');
        signinTimes = 0;

        var user = response;
        App.E.send('got-user', user);
      }

      App.Config.Set(config);
    });
  }

  User.prototype.UpdateUser = function() {
    log('GetUser');
    App.Notify.Show('Get user', 'info', 30000);

    var config = App.Config.Get();

    if (!config.user.token) {
      if (signinTimes >= 10) {
        App.Notify.Show('Check your internet connection', 'danger');
      } else {
        App.User.Signin();
      }
      return
    }

    App.XHR.patch('user?token=' + config.user.token, {
      firstName: config.user.name
    }, function(response, status) {
      log('get user', response, status);

      // var config = App.Config.Get();

      // if (status === 200) {
      //   App.Notify.Show('Got the user', 'success');
      //   signinTimes = 0;

      //   var user = response;
      //   App.E.send('got-user', user);
      // }

      // App.Config.Set(config);
    });
  }

  User.prototype.GetLeaders = function() {
    log('GetLeaders');
    App.Notify.Show('Get leaderboard', 'info', 30000);

    var config = App.Config.Get();

    if (!config.user.token) {
      App.User.Signin();
      return
    }

    App.XHR.get('user/leaders?token=' + config.user.token, {}, function(response, status) {
      App.Notify.Show('Got leaderboard list', 'success');
      log('users list', response, status);

      App.E.send('got-leaders', response);
    });
  }

  User.prototype.UpdatePoints = function() {
    log('UpdatePoints');
    App.Notify.Show('Update points', 'info', 30000);

    var config = App.Config.Get();

    App.XHR.patch('user/points?token=' + config.user.token, {
      points: +config.user.points
    }, function(response, status) {
      App.Notify.Show('Points updated', 'success');
      log('user points', response, status);

      App.E.send('updated-points');
    });
  }

  User.prototype.GetPlace = function(callback) {
    log('GetPlace');
    App.Notify.Show('Get place');

    var config = App.Config.Get();

    App.XHR.get('user/place?token=' + config.user.token, {}, function(response, status) {
      App.Notify.Show('Get place', 'success');
      log('user-place', response, status);

      if (status === 200) {
        // config.user.place = response.
        // App.E.send('updated-points');
        
        callback(response);
      }
      
    });
  }

  User.prototype.GetUserByDeviceId = function(callback) {
    log('GetUserByDeviceId');
    App.Notify.Show('Get User By Device Id');

    var config = App.Config.Get();

    App.XHR.get('user/device?deviceId=' + config.user.deviceId, {}, function(response, status) {
      App.Notify.Show('Get User By Device Id', 'success');
      callback(status, response);
    });
  }

  App.User = new User();

})(App);