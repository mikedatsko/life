(function(App) {
  var log = new Log('XHR');

  function XHR() {
    this.url = 'https://walls-api.herokuapp.com/api/';
    // this.url = 'http://localhost:8888/api/';
  }

  XHR.prototype.post = function(api, data, callback) {
    data = typeof data === 'undefined' ? {} : data;
    this.request('POST', api, data, callback);
  }

  XHR.prototype.get = function(api, data, callback) {
    data = typeof data === 'undefined' ? {} : data;
    this.request('GET', api, data, callback);
  }

  XHR.prototype.patch = function(api, data, callback) {
    data = typeof data === 'undefined' ? {} : data;
    this.request('PATCH', api, data, callback);
  }

  XHR.prototype.delete = function(api, data, callback) {
    data = typeof data === 'undefined' ? {} : data;
    this.request('DELETE', api, data, callback);
  }

  XHR.prototype.request = function(type, api, data, callback) {
    $.ajax({
      type: type,
      url: this.url + api,
      data: data,
      dataType: 'JSON',
      // crossDomain: true,
      complete: function(xhr, status) {
        log('complete', xhr.status);
        if (xhr.status === 401) {
          App.Notify.Show('User not authenticated', 'danger');
          App.User.Signin();
        } else {
          callback(xhr.responseJSON, xhr.status);
        }
      }
    });
  }

  App.XHR = new XHR();
})(App);