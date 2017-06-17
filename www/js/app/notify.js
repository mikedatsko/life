(function(App) {
  var $notify;
  var log = new Log('Notify');

  function Notify() {
    log('constructor');
    $notify = $('<div/>');
    $notify.addClass('notify');
    $notify.hide();
    App.$app.prepend($notify);
  }

  Notify.prototype.Show = function(text, type, timeout) {
    type = typeof type === 'undefined' ? 'info' : type;
    timeout = typeof timeout === 'undefined' ? 5000 : timeout;

    var self = this;

    $notify.html(text);
    $notify.show();
    $notify[0].className = 'notify alert alert-' + type;

    setTimeout(function() {
      self.Hide();
    }, timeout);
  }

  Notify.prototype.Hide = function() {
    $notify.hide();
  }

  App.Notify = new Notify();

})(App);