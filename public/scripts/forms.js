var toggleButtons = function() {
  $("#login-button").toggleClass("hidden");
  $("#register-button").toggleClass("hidden");
  $("#logout-button").toggleClass("hidden");
  $("#fav-button").toggleClass("hidden");
  $("#my-button").toggleClass("hidden");
}

$(function() {

  //////////////////////////
  /////                  ///
  //// button listeners ////
  ///                  /////
  //////////////////////////

  $("#login-button").on("click", function() {
    $("#register-form").addClass("hidden");
    $("#login-form").toggleClass("hidden");
  })

  $("#register-button").on("click", function() {
    $("#login-form").addClass("hidden");
    $("#register-form").toggleClass("hidden")
  })

  $("#new-list").on("click", function(event) {
    $("#new-list-form").toggleClass("hidden");
  });

  $("#logout-button").on("click", function(event) {
    event.preventDefault();
    utils.request("POST", "/api/users/logout")
      .then(function(response) {
        $.flash(response.message);
      }).then(toggleButtons);
  })

  ///////////////////////////////
  /////                       ///
  //// form submit listeners ////
  ///                       /////
  ///////////////////////////////

  $("#register-form").on("submit", function(event) {
    event.preventDefault();
    var $form = $(this).serialize();
    utils.request("POST", "/api/users/register", $form)
      .then(function(response) {
        if (response.message) {
          $.flash(response.message);
        }
        if (response.id) {
          toggleButtons();
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
        if (response.id) {
          toggleButtons();
        }
      }).then(function() {
        $("#login-form")[0].reset();
        $("#login-form").toggleClass("hidden");
      });
  })

  $("#new-list-form").on("submit", function(event) {
    event.preventDefault();
    var $form = $(this).serialize();
    utils.request("POST", "/lists/new", $form)
      .then(function(response) {
        $.flash(response.message);
      }).then(function() {
        $("#new-list-form")[0].reset();
        $("#new-list-form").toggleClass("hidden");
      });
  })


});
