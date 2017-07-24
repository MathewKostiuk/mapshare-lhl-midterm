window.utils = {

  request: function(method, url, data) {
    if (!data) { data = {}; }
    return new Promise(function(resolve, reject) {
      $.ajax({
        method: method,
        url: url,
        data: data,
        success: function(response) {
          resolve(response);
        },
        error: function(XHR, status, error) {
          console.log(error);
          $.flash(error);
        }
      });
    });
  }

};
