(function(App) {
  var log = new Log('Utils');

  function Utils() {
    log('constructor');
  }

  Utils.prototype.formatNumber = function(n, c, d, t){
    var c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
    j = (j = i.length) > 3 ? j % 3 : 0;
    
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
  }

  Utils.prototype.rand = function(from, to) {
    return Math.floor(Math.random() * to) + from;
  }

  Utils.prototype.getId = function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  Utils.prototype.AddClose = function(options) {
    var $btnClose = $('<span class="btn btn-large btn-danger btn-close"/>');
    $btnClose.html('<span class="glyphicon glyphicon-remove"></span>');

    if (options && options.click) {
      $btnClose.click(options.click);
    } else {
      $btnClose.click(function(e) {
        e.preventDefault();
        App.Router.Back();
      });
    }

    if (options && options.$el) {
      options.$el.append($btnClose);
    } else {
      App.$app.append($btnClose);
    }
  }

  App.Utils = new Utils();

})(App);