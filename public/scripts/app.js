
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

 var json =
  {
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [125.6, 10.1]
    },
    "properties": {
      "name": "Dinagat Islands"
    }
  }

  function initMap() {
        var victoria_bc = {lat: 48.428, lng: -123.365};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: victoria_bc
        });

        var coords = json.geometry.coordinates;
        var latLng = new google.maps.LatLng(coords[1], coords[0]);
        var marker = new google.maps.Marker({
          position: latLng,
          map: map
        });
      };
