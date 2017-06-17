(function(App) {
  var log = new Log('Config');

  var config = {
    version: 3,
    sound: true,
    user: {
      name: '',
      points: 0,
      totalScore: 0,
      maxScore: 0,
      auth: '',
      place: 0,
      deviceId: 0
    },
    levels: {
      level1: {
        rounds: [
          {
            x: 9,
            y: 22,
            done: false,
            current: true,
            steps: 10,
            goal: 10,
            id: 'level1-round1'
          },
          {
            x: 35,
            y: 18,
            done: false,
            current: false,
            steps: 10,
            goal: 12,
            id: 'level1-round2'
          },
          {
            x: 63,
            y: 20,
            done: false,
            current: false,
            steps: 10,
            goal: 15,
            id: 'level1-round3'
          },
          {
            x: 80,
            y: 45,
            done: false,
            current: false,
            steps: 10,
            goal: 18,
            id: 'level1-round4'
          },
          {
            x: 67,
            y: 71,
            done: false,
            current: false,
            steps: 10,
            goal: 20,
            id: 'level1-round5'
          },
          {
            x: 36,
            y: 77,
            done: false,
            current: false,
            steps: 10,
            goal: 25,
            id: 'level1-round6'
          }
        ]
      },
      level2: {
        rounds: [
          {
            x: 17,
            y: 8,
            done: false,
            current: false,
            steps: 15,
            goal: 20,
            id: 'level2-round1'
          },
          {
            x: 45,
            y: 18,
            done: false,
            current: false,
            steps: 15,
            goal: 23,
            id: 'level2-round2'
          },
          {
            x: 75,
            y: 25,
            done: false,
            current: false,
            steps: 15,
            goal: 25,
            id: 'level2-round3'
          },
          {
            x: 70,
            y: 50,
            done: false,
            current: false,
            steps: 15,
            goal: 28,
            id: 'level2-round4'
          },
          {
            x: 41,
            y: 58,
            done: false,
            current: false,
            steps: 15,
            goal: 30,
            id: 'level2-round5'
          },
          {
            x: 14,
            y: 75,
            done: false,
            current: false,
            steps: 15,
            goal: 35,
            id: 'level2-round6'
          }
        ]
      }
    }
  };

  function Config() {
    log('constructor');

    if (!localStorage.getItem('config')) {
      localStorage.setItem('config', JSON.stringify(config));
    }

    var config_ = this.Get();
    var client = new ClientJS();
    var deviceId = client.getFingerprint();

    log('constructor', config_.version, config.version, deviceId);

    if (!config_.user.deviceId) {
      config_.user.deviceId = deviceId;
    }

    this.Set(config_);

    if (config_.version === config.version) {
      return;
    }

    for (var level in config.levels) {
      config.levels[level].rounds.map(function(round, index) {
        round.done = config_.levels[level].rounds[index].done;
        round.current = config_.levels[level].rounds[index].current;
        return round;
      });
    }

    config.user = config_.user;

    for (var c in config) {
      if (config.hasOwnProperty(c) && !config_.hasOwnProperty(c)) {
        config_[c] = config[c];
      }
    }

    this.Set(config);
  }

  Config.prototype.Get = function() {
    var config = JSON.parse(localStorage.getItem('config'));
    return config;
  };

  Config.prototype.Set = function(config_) {
    var config = Object.assign({}, config_);
    localStorage.setItem('config', JSON.stringify(config));
  };

  App.Config = new Config();

})(App);