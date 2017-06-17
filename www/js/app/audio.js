(function(App) {
  var log = new Log('Audio');

  function Audio() {
    log('constructor');
  }

  Audio.prototype.Play = function(audioEl) {
    var config = App.Config.Get();

    if (!config.sound) { return }

    audioEl.pause(); 
    audioEl.currentTime = 0;
    audioEl.play();
  }

  App.Audio = new Audio();

})(App);