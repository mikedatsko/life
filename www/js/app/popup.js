(function(App) {
  var $popup = $('<div/>');
  $popup.dialog({
    autoOpen: false,
    show: {
      effect: 'blind',
      duration: 1000
    },
    hide: {
      effect: 'explode',
      duration: 1000
    },
    close: function(e) {
      e.preventDefault();
      
    }
  });

  function Popup() {

  }

  Popup.prototype.Open = function(options) {

  }

  App.Popup = new Popup();
})(App);