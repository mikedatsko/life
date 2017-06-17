(function(App) {
  var log = new Log('Draw');

  App.Level1.prototype.Draw = function() {
    var self = this;

    for (var i = 0; i < this.items.length; i++) {
      var item = this.items[i];
      var $item = this.$items.find('#' + item.id);
      
      if (!$item.length) {
        $item = $('<div class="item"/>');
        $item.attr({
          id: item.id
        });
        $item.css({
          width: this.w - 4 + 'px',
          height: this.h - 4 + 'px'
        });
        $item.attr('type', item.type.id);
        $item.click(function(event) {
          // console.log('item');
          event.stopPropagation();

          if ($(this).hasClass('active')) {
            $(this).removeClass('active');
          } else {
            $('.item').removeClass('active');
            $(this).addClass('active');

            App.Audio.Play($('#audio_select')[0]);
          }
        });
        $item.css({
          opacity: 0
        });
        $item.css({
          opacity: 1
        });
        this.$items.append($item);
      }

      $item.css({
        left: item.x + 'px',
        top: item.y + 'px'
      });

      // $item.draggable({
      //   start: function(a, b) {
      //     log('start', a, b);
      //   },
      //   stop: function(a, b) {
      //     log('stop', a, b);
      //   }
      // });

      var $group = $('<div class="item-group"/>');
      $item.append($group);

      var x = 0;
      var y = 0;
    }
    
    setTimeout(function() {
      self.GetGroups();
    }, 500);
  }
})(App);