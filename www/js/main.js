
(function(window, App, document) {
  var log = new Log('Main');

  document.addEventListener('deviceready', onDeviceReady, false);

  function onDeviceReady() {
    log('onDeviceReady', device.cordova);
  }

  window.onload = function() {
    App.Init.Start();
  }
})(window, App, document);
