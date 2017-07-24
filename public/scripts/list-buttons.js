var buildList = function (lists) {
  $("#list-container").empty();
  for(list of lists) {
    $("<a>").text(list.name).attr('class', 'list-item').attr('id', list.id).append("<br>").appendTo($("#list-container"));
    $('#left-col').on('click', '.list-item', function (event) {
      markerArray = [];
      event.preventDefault();
      event.stopImmediatePropagation();
      var id = listsUrl + $(this).attr('id');
      utils.request("GET", id).then(function (items) {
        markerArray.push(items);
        initMap(items);
      });
    });
  }
};

$(function() {

  $("#all-button").on("click", function(event) {
    utils.request("GET", "/lists").then(buildList);
  });

  $("#fav-button").on("click", function(event) {
    utils.request("GET", "/lists/favourites").then(buildList);
  });

  $("#my-button").on("click", function(event) {
    utils.request("GET", "/lists/user").then(buildList);
  });

  $("#new-list-form").on("submit", function(event) {
    utils.request("GET", "/lists").then(buildList).then(initMap)
  })

});
