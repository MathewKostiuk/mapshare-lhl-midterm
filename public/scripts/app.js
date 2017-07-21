var infos = [];

var points = [
  ['Bondi Beach', 48.43, -123.00],
  ['Coogee Beach', 48.57, -123.35],
  ['Cronulla Beach', 48.59, -123.46],
  ['Manly Beach', 48.48, -123.40],
  ['Maroubra Beach', 48.64, -123.44]
];

function closeInfos() {
  if (infos.length > 0) {
    infos[0].set("marker", null);
    infos[0].close();
    infos.length = 0;
  }
}

function setMarkers(map) {
  for (var i = 0; i < points.length; i++) {
    var point = points[i];
    var marker = new google.maps.Marker({
      position: {lat: point[1], lng: point[2]},
      map: map,
      content: point[0]
    });
    var content = point[0];
    var infowindow = new google.maps.InfoWindow();

    google.maps.event.addListener(marker, 'click', (function(marker, content, infowindow){
      return function() {

        closeInfos();
        infowindow.setContent(content);
        infowindow.open(map, marker);
        infos[0] = infowindow;
      };

    }(marker, content, infowindow)));
  }
}

function initMap(json) {
  var victoriaBc = {lat: 48.428, lng: -123.365};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: victoriaBc
  });
  setMarkers(map);
  google.maps.event.addListener(map, "click", function (event) {
    var latitude = event.latLng.lat();
    var longitude = event.latLng.lng();
    console.log(latitude + ', ' + longitude);
  });
}




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



