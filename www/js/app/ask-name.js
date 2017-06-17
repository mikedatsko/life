(function(App) {
  var log = new Log('AskName');

  function AskName() {
    log('constructor');

    var $container = $('<form class="ask-container form-group"/>');
    var $input = $('<input type="text" class="form-control" placeholder="Your nick" id="yourname" require/>');
    var $button = $('<button class="btn btn-primary btn-large"/>');

    App.Utils.AddClose({
      $el: $container,
      click: function(e) {
        e.preventDefault();
        App.Router.Go('');
      }
    });

    $button.append('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
    $container.append('<label for="yourname">Your nick</label>');
    $container.append($input);
    $container.append($button);
    $container.submit(function(e) {
      e.preventDefault();

      $input.removeClass('not-valid');

      if (!$input.val()) {
        $input.addClass('not-valid');
        return false
      }

      var config = App.Config.Get();
      config.user.name = $input.val();
      App.Config.Set(config);

      $container.remove();

      App.User.UpdateUser();

      App.Router.Go('');

      return false
    });
    App.$app.append($container);
  }

  App.AskName = AskName;

})(App);