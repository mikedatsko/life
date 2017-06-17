(function(App) {
  var log = new Log('Level1 Start');

  App.Level1.prototype.Start = function(levelId, roundId) {
    this.items = [];
    this.itemsTmp = [];
    this.groups = [];
    this.groupped = [];
    this.coords = [];
    this.levelId = levelId;

    var config = App.Config.Get();
    var level = config.levels[this.levelId];
    var rounds = level.rounds;

    this.round = rounds.filter(function(round) { return round.id === roundId })[0];
    log('level', this.round);

    var self = this;

    var config = App.Config.Get();
    log('config', config);

    var $level = $('<div id="level"/>');

    var x = 0;
    var y = 0;

    // score
    const $score = $('<div id="score"/>');
    this.$score = $('<div id="score_value"/>');
    this.$score.html(0);
    $score.append('<span class="glyphicon glyphicon-cd"></span>');
    $score.append(this.$score);
    $level.append($score);

    // steps
    this.$steps = $('<div id="steps"/>');
    // this.$steps.html(this.round.steps);
    $level.append(this.$steps);

    this.$steps.roundSlider({
      sliderType: 'min-range',
      editableTooltip: false,
      radius: 20,
      width: 10,
      value: this.round.steps,
      min: 0,
      max: this.round.steps,
      handleSize: 0,
      handleShape: 'square',
      circleShape: 'pie',
      startAngle: 315
    });

    // goal
    // this.$goal = $('<div id="goal"/>');
    // this.$goal.html(this.round.goal).data('goal', 0);
    // $level.append(this.$goal);

    this.$goalView = $('<div id="goal_view"/>');
    $level.append(this.$goalView);

    this.$goalView.roundSlider({
      sliderType: 'min-range',
      editableTooltip: false,
      radius: 20,
      width: 10,
      value: 0,
      min: 0,
      max: 100,
      handleSize: 0,
      handleShape: 'square',
      circleShape: 'pie',
      startAngle: 315
    });

    this.goal = 0;

    log('goal', this.round.goal);
    
    // pause
    var $gamePause = $('<button type="button" class="btn btn-large btn-info game-pause"/>');
    $gamePause.html('<span class="glyphicon glyphicon-pause" aria-hidden="true"></span>');
    $gamePause.click(function(e) {
      e.preventDefault();

      var $menuPauseReturn = $('<a/>');
      $menuPauseReturn.html('Return')
        .addClass('btn btn-lg btn-info')
        .attr('href', '#level');

      var $menuPause = $('<div/>');
      $menuPause.addClass('menu-pause')
        .click(function() {
          App.Router.Go('level');
        })
        .append($menuPauseReturn);
      
      App.$app.append($menuPause);

      App.Utils.AddClose({
        $el: $menuPause,
        click: function(e) {
          e.preventDefault();
          $menuPause.remove();
        }
      });

      var config = App.Config.Get();
      config.user.points = parseInt(config.user.points) + parseInt(self.$score.text());
      App.Config.Set(config);

      log('gamepause', config);
      App.User.UpdatePoints();
    });
    $level.append($gamePause);
    
    // items
    this.$items = $('<div id="items"/>');
    var fieldWidth = $(document).width() - 40;

    this.w = this.h = Math.round(fieldWidth / this.cols);

    this.$items.width(this.w * this.cols - 2);
    this.$items.height(this.h * this.rows - 2);
    this.$items.css({
      marginLeft: (this.w * this.cols - 2) / 2 * (-1) - 1 + 'px'
    });

    $level.append(this.$items);

    // grid
    // var $grid = $('<div id="grid"/>');
    // $level.append($grid);

    var all = this.rows * this.cols;

    for (var i = 0; i < all; i++) {
      var $block = $('<div/>');

      if (i > 0 && i % this.cols === 0) {
        x = 0;
        y = y + this.h;
      }

      $block.addClass('block');
      $block.attr('type', 1);
      // $block.html(i + 1);
      $block.css({
        left: x + 'px',
        top: y + 'px',
        width: this.w - 2 + 'px',
        height: this.h - 2 + 'px'
      });

      this.coords.push({
        x: x,
        y: y
      });

      $block.click(function(event) {
        // console.log('block');
        event.stopPropagation();
        var $item = $('.item.active');
        
        if (!$item.length) {
          // $('.item').removeClass('active');
          return
        }

        $('.item').removeClass('active');

        var x = parseInt($(this).css('left'));
        var y = parseInt($(this).css('top'));

        log('block', x, y);
        
        $item.addClass('moving');
        $item.css({
          left: x + 'px',
          top: y + 'px'
        });
        
        setTimeout(function() {
          $item.removeClass('moving');

          var id = $item.attr('id');
          var item = self.items.filter(function(item_) {
            return item_.id === id
          })[0];
          item.x = x;
          item.y = y;

          self.GetGroups(true);
        }, 500);

        App.Audio.Play($('#audio_put')[0]);
      });

      this.$items.append($block);
      x = x + this.w;
    }
    
    this.AddItems(10);
    this.Draw();
    App.$app.append($level);

    // var settings = new App.Settings();
  }
})(App);