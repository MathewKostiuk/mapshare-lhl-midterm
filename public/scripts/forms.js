$(function() {

  $("#register-form").on("submit", function(event) {
    event.preventDefault();
    var $form = $(this).serialize();
    utils.request("POST", "/api/users/register", $form)
      .then(function(response) {
        if (response.message) {
          $.flash(response.message);
        }
      }).then(function() {
        $("#register-form")[0].reset();
      });
  });

  $("#login-form").on("submit", function(event) {
    event.preventDefault();
    var $form = $(this).serialize();
    utils.request("POST", "/api/users/login", $form)
      .then(function(response) {
        $.flash(response.message);
      }).then(function() {
        $("#login-form")[0].reset();
      });
  })

  $("#logout-button").on("click", function(event) {
    event.preventDefault();
    utils.request("POST", "/api/users/logout")
      .then(function(response) {
        $.flash(response.message);
      });
  })

});
