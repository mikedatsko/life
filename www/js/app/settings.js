(function(App) {
  var log = new Log('Settings');

  function Settings() {
    log('constructor');
    var self = this;

    this.$settings = $('<div class="settings"/>');
    App.$app.append(this.$settings);
    this.Hide();

    App.Utils.AddClose();

    this.Draw();
  }

  Settings.prototype.Show = function() {
    this.$settings.show();
  }

  Settings.prototype.Hide = function() {
    this.$settings.hide();
  }

  Settings.prototype.Draw = function() {
    var settings = this.Get();
    var self = this;
    var config = App.Config.Get();
    this.$settings.html('');

    // this.$settings.click(function() {
    //   App.Router.Back();
    // });

    log('Settings', settings);

    var $settingsContainer = $('<div class="settings-container"/>');

    settings.forEach(function(setting) {
      var $settingRow = $('<div class="settings-row"/>');
      var $settingItem;

      switch(setting.type) {
        case 'slider':
          $settingItem = $('<div/>');
          $settingItem.slider();
          break;

        case 'button':
          $settingItem = $('<a href="javascript:void(0)" class="btn btn-large btn-info btn-block"/>');

          if (setting.title) {
            $settingItem.html(setting.title);
          }

          if (setting.click) {
            $settingItem.click(setting.click);
          }
          break;

        default:
          $settingItem = $('<a href="#" class=""/>');

          var $settingBtn = $('<button type="button" class="btn"/>');
          $settingBtn.append('<span class="glyphicon glyphicon-' + setting.icon + '"></span>');

          if (setting.state) {
            $settingBtn.addClass('btn-success active');
          } else {
            $settingBtn.addClass('btn-default');
          }

          $settingItem.append($settingBtn);

          if (setting.title) {
            if (setting.name === 'name' && config.user.name) {
              $settingItem.append(config.user.name);
            } else {
              $settingItem.append(setting.title);
            }
          }

          if (setting.click && !(setting.name === 'name' && config.user.name)) {
            self.Click($settingItem, setting);
          }
      }
      $settingRow.append($settingItem);
      $settingsContainer.append($settingRow);
    });

    this.$settings.append($settingsContainer);
  }

  Settings.prototype.Get = function() {
    var self = this;
    var config = App.Config.Get();
    var settings = [
      {
        name: 'sound',
        title: 'Sound',
        state: true,
        icon: 'off',
        click: function(setting) {
          log('Get', setting);
          setting.state = !setting.state;

          var config = App.Config.Get();
          config[setting.name] = setting.state;
          App.Config.Set(config);

          self.Draw();
        }
      },
      {
        name: 'name',
        title: 'Set name',
        icon: 'font',
        click: function(setting) {
          App.Router.Go('ask-name');
        }
      }
    ];

    settings.forEach(function(setting) {
      if (!config.hasOwnProperty(setting.name)) {
        return
      }

      setting.state = config[setting.name];
    });

    return settings;
  }

  Settings.prototype.Click = function($settingItem, setting) {
    $settingItem.click(function(e) {
      e.preventDefault();
      log('Click', setting.title);
      setting.click(setting);
    });
  }

  App.Settings = Settings;

})(App);