(function(App) {
  var log = new Log('AddItems');

  App.Level1.prototype.AddItems = function(num) {
    for (var i = 0; i < num; i++) {
      var type = this.types[App.Utils.rand(0, this.types.length)];
      var coordsItem = this.GetCoords();

      if (!coordsItem) {
        this.End(false);
        return
      }

      var item = {
        x: coordsItem.x,
        y: coordsItem.y,
        id: 'item' + App.Utils.getId(),
        type: type,
        isNew: true
      };

      this.items.push(item);
    }
  }
})(App);