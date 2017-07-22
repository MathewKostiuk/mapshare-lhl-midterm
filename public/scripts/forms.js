$(function() {

  $("#register-form").on("submit", function(event) {
    event.preventDefault();
    var $form = $(this).serialize();
    utils.request("POST", "/api/users/register", $form)
      .then(function(response) {
        $.flash(response.message);
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

});
