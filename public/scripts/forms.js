var toggleButtons = function() {
  $("#login-button").toggleClass("hidden");
  $("#register-button").toggleClass("hidden");
  $("#logout-button").toggleClass("hidden");
}

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
        $("#register-form").toggleClass("hidden");
      }).then(function(response) {
        if (response.id) {
          toggleButtons();
        }
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
      }).then(function(response) {
        if (response.id) {
          toggleButtons();
        }
      });
  })

  $("#logout-button").on("click", function(event) {
    event.preventDefault();
    utils.request("POST", "/api/users/logout")
      .then(function(response) {
        $.flash(response.message);
      }).then(toggleButtons);
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
