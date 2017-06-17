(function(App) {
  var log = new Log('Level1');

  function Level1() {
    log('constructor');
    this.items = [];
    this.itemsTmp = [];
    this.$items;
    this.$score;
    this.groups = [];
    this.groupped = [];
    this.coords = [];
    this.rows = 8;
    this.cols = 6;
    this.w = 100;
    this.h = 100;
    this.pointsPerOne = 10;

    // window.coords = coords;

    // this.item = {
    //   x: 0,
    //   y: 0,
    //   color: 'red'
    // };

    this.types = [
      {
        id: '1'
      },
      {
        id: '2'
      },
      {
        id: '3'
      },
      {
        id: '4'
      },
      {
        id: '5'
      }
    ];
  }

  Level1.prototype.GetUnique = function(items, item1) {
    var flags = [], output = [], l = items.length, i;
    for (i = 0; i < l; i++) {
        if (flags[items[i].id]) continue;
        flags[items[i].id] = true;
        output.push(items[i]);
    }
    return output;
  }

  Level1.prototype.GetCoords = function() {
    var coordsFree = this.GetCoordsFree();
    var coordsTmp = coordsFree[App.Utils.rand(0, coordsFree.length - 1)];

    log('coords', coordsFree.length, this.items.length, coordsTmp);

    return coordsTmp
  }

  Level1.prototype.GetCoordsFree = function() {
    var coordsFree = [];
    for (var i = 0; i < this.coords.length; i++) {
      var coord = this.coords[i];
      var itemsFree = this.items.filter(function(item) {
        return item.x === coord.x && item.y === coord.y
      });

      if (!itemsFree.length) {
        coordsFree.push(coord);
      }
    }

    return coordsFree
  }

  Level1.prototype.CheckCoords = function(x, y) {
    for (var i = 0; i < this.items.length; i++) {
      var item = this.items[i];
      if (item.x === x && item.y === y) {
        return true
      }
    }

    return false
  }

  Level1.prototype.RemoveItem = function(itemsLocal, item) {
    var itemsFiltered = [];
    for (var i = 0; i < itemsLocal.length; i++) {
      var item_ = itemsLocal[i];
      if (item_.id !== item.id) {
        itemsFiltered.push(item_);
      }
    }
    return itemsFiltered;
  }

  App.Level1 = Level1;

  // App.Level1.Check();
})(App);