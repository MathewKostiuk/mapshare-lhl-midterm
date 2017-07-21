const $form = $("#register-form");
$form.on("submit", function(event) {
  event.preventDefault();
});


var infos = [];
var formStr = "<form action='/items/new/' method='POST' id='newItem'><input name type='text' id='markerName' placeholder='Name:'/><br><input name=text type='text' id='markerDescription' placeholder='Description:'/><br><input name='img_url' type='text' id='markerImage' placeholder='Image URL:'/><br><input type='submit' value='submit'/></form>"
var textBox = [];

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

function closeTextBox(){

   if(textBox.length > 0){

      /* detach the info-window from the marker ... undocumented in the API docs */
      textBox[0].set("marker", null);

      /* and close it */
      textBox[0].close();

      /* blank the array */
      textBox.length = 0;
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
        var contentString = "<p>This is a test</p><p>To see if the description works</p><img src='https://www.mathconsult.ch/static/unipoly/33.256.gif'>"
        closeInfos();
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
        infos[0] = infowindow;
      };
    }(marker, content, infowindow)));
  }
}

function initMap() {
  var victoriaBc = {lat: 48.428, lng: -123.365};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: victoriaBc
  });
  setMarkers(map);

  google.maps.event.addListener(map, "click", function (event) {
    closeTextBox();
    var infowindow = new google.maps.InfoWindow();
    var latitude = event.latLng.lat();
    var longitude = event.latLng.lng();
    var formStr = `<form action='/items/new' method='POST' id='new-item'><input name='name' type='name' id='markerName' placeholder='Name:'><br><input name='description' type='text' id='markerDescription' placeholder='Description:'><br><input name='img' type='url' id='markerImage' placeholder='http://imgurl.com'><br><input type='text' name='lat' value=${latitude} readonly><input type='text' name='long' value=${longitude} readonly><input type='submit' value='new-item'/></form>`

    infowindow.setContent(formStr);
    infowindow.setPosition(event.latLng);
    infowindow.open(map);
    textBox[0] = infowindow;
    var $newItem = $('#new-item');
    $newItem.on("submit", handleNewItem);
  });
}

function handleNewItem(event) {
  event.preventDefault();
  var form = $(this).serializeArray();
  console.log(form);
  var nameLength = $('#markerName').val().length;
  // var descriptionLength = $('markerDescription').val().length;

// ADD FLASH MESSAGES WHEN WE HAVE MORE TIME

  // if (nameLength === 0) {
  //   return $.notify('Please enter a name for your location', 'error');
  // }

  // if (descriptionLength === 0) {
    // return $.notify('Please enter a description for the location', 'warn');
  // }

  $.ajax({
    type: 'POST',
    url: '/items/new',
    data: form
  })
    .done(closeTextBox());
};



// Document Ready
$( function () {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done(function (users) {
    for(user of users) {
      $("<a>").text(user.name).append("<br>").appendTo($("#left-col"));
    }
  });
  initMap();

});



