(function(global) {
  function Log(caller) {
    if (global.prod) {
      return function() {}
    }

    caller = typeof caller === 'undefined' ? '' : caller;

    return function(message) {
      for(var i = caller.length; i < 10; i++) {
        caller += ' ';
      }

      var args = ['%c ' + caller, 'background: #111; color: #bada55; font-weight: bold'];

      for(var i = 0; i < arguments.length; i++) {
        args.push(arguments[i]);
      }

      console.log.apply(null, args);
    }
  }

  global.Log = Log;
})(window);