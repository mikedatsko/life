(function(App) {
  var log = new Log('Check');

  App.Level1.prototype.Check = function(items, item1) {
    var self = this;

    this.itemsTmp = this.RemoveItem(this.itemsTmp, item1);
    
    var group = [item1];
    var groupTmp1 = this.itemsTmp.filter(function(item2) {
      // log(item2.id, item1.id);
      var condition = false;

      if (
           (item1.x === item2.x && item1.y - self.w === item2.y)
        || (item1.x + self.h === item2.x && item1.y === item2.y)
        || (item1.x === item2.x && item1.y + self.w === item2.y)
        || (item1.x - self.h === item2.x && item1.y === item2.y)
      ) {
        if (item1.type.id === item2.type.id) {
          condition = true;
          self.itemsTmp = self.RemoveItem(self.itemsTmp, item2);
        }
      }

      return condition;
    });

    // log('groupTmp1', groupTmp1.length);
    // log('itemsTmp', itemsTmp.length);

    if (groupTmp1.length) {
      group = group.concat(groupTmp1);

      groupTmp1.forEach(function(item3) {
        var groupTmp2 = self.Check(items, item3);

        // log('groupTmp2', groupTmp2.length);
        if (groupTmp2.length) {
          group = group.concat(groupTmp2);
        }
      });
    }

    return group;
  }
})(App);