(function(App, global) {
  var log = new Log('Events');

  function Events() {
    
  }

  Events.prototype.on = function(element, eventName, callback) {
    element.addEventListener(eventName, callback, false);
  };

  Events.prototype.subscribe = function(eventName, callback) {
    global.document.addEventListener(eventName, callback, false);
  };

  Events.prototype.send = function(eventName, details) {
    details = details || {};

    var event = new CustomEvent(eventName, {
      detail: details
    });

    global.document.dispatchEvent(event);
  };

  Events.prototype.create = function(eventName) {
    return new CustomEvent(eventName, {});
  };

  Events.prototype.dispatch = function(event) {
    global.document.dispatchEvent(event);
  };

  Events.prototype.removeEvent = function() {
    global.document.removeEventListener(eventName, callback, false);
  };

  App.E = new Events();
})(App, window);