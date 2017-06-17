(function(App) {
  var log = new Log('Menu');
  var $menu = $('<div class="menu"/>');

  function Menu() {
    log('constructor');
  }

  Menu.prototype.Init = function() {
    var self = this;

    this.DrawMenu();

    App.$app.append($menu);

    App.E.subscribe('updated-place', function(event) {
      log('updated-place');
      self.DrawMenu();
    });

    App.Router.On(function(url) {
      var menu = self.GetMenu();

      menu.forEach(function(menuItem) {
        if (menuItem.url === url) {
          menuItem.active = true;
        } else {
          menuItem.active = false;
        }
      });

      self.DrawMenu();
    });
  };

  Menu.prototype.GetMenu = function() {
    var config = App.Config.Get();
    var userPlace = config.user.place || 'no position yet';
    var leaderboardClsName = 'info';

    switch (userPlace) {
      case 1: leaderboardClsName = 'danger'; break;
      case 2: leaderboardClsName = 'default'; break;
      case 3: leaderboardClsName = 'warning'; break;
    }

    var menu = [
      {
        title: '<span class="glyphicon glyphicon-stats"></span>&nbsp;&nbsp;' + userPlace,
        url: 'leaderboard',
        className: leaderboardClsName,
        active: false
      },
      {
        title: '<span class="glyphicon glyphicon-cog"></span>',
        url: 'settings',
        className: 'info',
        active: false
      },
      // {
      //   title: '<span class="glyphicon glyphicon-globe"></span>',
      //   url: 'level',
      //   className: 'success',
      //   active: false
      // },
      // {
      //   title: '<span class="glyphicon glyphicon-globe"></span>',
      //   url: 'level',
      //   className: 'success',
      //   active: false
      // }
    ];

    log('GetMenu', menu, userPlace);

    return menu;
  };

  Menu.prototype.DrawMenu = function() {
    var menu = this.GetMenu();
    $menu.html('');

    menu.forEach(function(menuItem) {
      var $menuItem = $('<a class="btn btn-large"/>');
      $menuItem.attr('href', '#' + menuItem.url);
      $menuItem.html(menuItem.title);
      $menuItem.addClass('btn-' + menuItem.className);

      if (menuItem.active) {
        $menuItem.addClass('active');
      }

      $menu.append($menuItem);
    });
  };

  Menu.prototype.Show = function() {
    $menu.show();
  };

  Menu.prototype.Hide = function() {
    $menu.hide();
  };

  App.Menu = new Menu();

})(App);