$(function() {

  // if (userId) {
  //   $("#login-button").addClass("hidden");
  //   $("#register-button").addClass("hidden");
  //   $("#logout-button").removeClass("hidden");
  // } else {
  //   $("#login-button").removeClass("hidden");
  //   $("#register-button").removeClass("hidden");
  //   $("#logout-button").addClass("hidden");
  // }

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
        $("#register-form").toggleClass("hidden");
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
        $("#login-form").toggleClass("hidden");
      });
  })

  $("#logout-button").on("click", function(event) {
    event.preventDefault();
    utils.request("POST", "/api/users/logout")
      .then(function(response) {
        $.flash(response.message);
      });
  })

  $("#login-button").on("click", function() {
    $("#register-form").addClass("hidden");
    $("#login-form").toggleClass("hidden");
  })

  $("#register-button").on("click", function() {
    $("#login-form").addClass("hidden");
    $("#register-form").toggleClass("hidden")
  })

});
