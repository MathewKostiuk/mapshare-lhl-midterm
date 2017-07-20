
$( function () {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done(function (users) {
    for(user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });

  initMap();
});


  function initMap(json) {
        var victoria_bc = {lat: 48.428, lng: -123.365};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: victoria_bc
        });
        setMarkers(map);
      };

var beaches = [
  ['Bondi Beach', -33.890542, 151.274856, 4],
  ['Coogee Beach', -33.923036, 151.259052, 5],
  ['Cronulla Beach', -34.028249, 151.157507, 3],
  ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
  ['Maroubra Beach', -33.950198, 151.259302, 1]
];

function setMarkers(map) {
  for (var i = 0; i < points.length; i++) {
    var points = points[i];
    var newMarker = new google.maps.Marker({
      position: {lat: points[1], lng: points[2]},
      map: map
    });
  }
}
