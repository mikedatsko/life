(function(App) {
  var log = new Log('GetGroups');

  App.Level1.prototype.GetGroups = function(isMoved) {
    var self = this;
    // log('GetGroups');

    this.itemsTmp = Object.assign([], this.items);
    this.groups = [];

    while (this.itemsTmp.length) {
      this.groups.push(this.Check(this.itemsTmp, this.itemsTmp[0]));
    }

    log('groups', this.groups.length, this.groups);
    log('itemsTmp', this.itemsTmp.length);
    log('items', this.items.length);

    $('.item').removeClass('group');

    var groupsTmp = [];

    for (var i = 0; i < this.groups.length; i++) {
      var group = this.GetUnique(this.groups[i]);
      var groupLen = group.length;
      log('groupLen', groupLen)
      
      if (groupLen < 5) { continue }

      var points = this.pointsPerOne * (groupLen - 4);

      var score = parseInt(this.$score.text()) || 0;
      score = score + groupLen * points;
      this.$score.html(score);

      for (var j = 0; j < groupLen; j++) {
        var item = group[j];
        var $item = $('#' + item.id);
        $item.addClass('group');
        $item.addClass('group-' + i);
        $item.attr('data-grouptype', groupLen);
        $item.attr('data-points', points);
        groupsTmp.push(item.id);

        this.items = self.RemoveItem(this.items, {id: item.id});
      }
    }

    var groupsLen = $('.group').length;

    if (groupsLen) {
      $('.group').css({
        left: 'calc(100% - 60px)',
        top: '-60px',
        opacity: 0
      });

      App.Audio.Play($('#audio_clear')[0]);

      setTimeout(function() {
        $('.group').remove();

        self.goal += groupsLen;
        var goal = Math.floor(self.goal / self.round.goal * 100);
        log('roundSlider', self.goal, goal, self.round.goal);

        if (goal >= 100) {
          setTimeout(function() {
            self.End(true);
          }, 2000);
        }

        // var goalDefault = self.round.goal;
        // var goalPercent = (self.round.goal - goal) / goalDefault * 100;
        self.$goalView.roundSlider('option', 'value', goal);
      }, 1000);
    } else {
      if (isMoved) {
        var coordsFree = self.GetCoordsFree();

        log('coordsFree', coordsFree.length);

        if (coordsFree.length - 6 <= 0) {
          self.End(false);
          return
        }

        self.AddItems(6);
        self.Draw();

        var steps = parseInt(this.$steps.roundSlider('option', 'value'));
        steps--;

        if (steps <= 0) {
          setTimeout(function() {
            self.End(false);
          }, 2000);
        }

        this.$steps.roundSlider('option', 'value', steps);
      }
    }
  }
})(App);