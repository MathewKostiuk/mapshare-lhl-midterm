const $form = $("#register-form");
$form.on("submit", function(event) {
  event.preventDefault();
});
var map;
var markerCount = [];
var infos = [];
var textBox = [];


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

function setMarkers(map, items) {
  if (!items) {
    return;
  }

  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < items.length; i++) {
    var infowindow = new google.maps.InfoWindow();
    var item = items[i];
    var content = item.name;
    var marker = new google.maps.Marker({
      position: {lat: item.latitude, lng: item.longitude},
      map: map
    });
    markerCount.push(marker);
    bounds.extend(marker.position);

    var contentString = `<p>${item.name}</p><p>${item.description}</p><img src='${item.image_url}'><p id='hideId'>${item.id}</p>`;
    marker.setMap(map);
    infowindow.setContent(contentString);
    google.maps.event.addListener(marker, 'click', (function(marker, infowindow){
      return function() {
        closeInfos();
        infowindow.open(map, marker);
        infos[0] = infowindow;
      };
    }(marker, infowindow)));
  }
  map.fitBounds(bounds);
}

function handleNewItem(event) {
  event.preventDefault();
  var form = $(this).serializeArray();
  console.log(form);
  $.ajax({
    type: 'POST',
    url: '/items/new',
    data: form
  })
    .done(closeTextBox());
}

function initMap(items) {
  console.log(items);
  var victoriaBc = {lat: 48.428, lng: -123.365};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: victoriaBc
  });
  setMarkers(map, items);

  google.maps.event.addListener(map, "rightclick", function (event) {
    if (markerCount.length === 0) {return};
    closeTextBox();
    var infowindow = new google.maps.InfoWindow();
    var latitude = event.latLng.lat();
    var longitude = event.latLng.lng();
    var formStr = `<form action='/items/new' method='POST' id='new-item'><input type='text' name='list_id' id='listId' value='${items[0].list_id}'><input name='name' type='name' id='markerName' placeholder='Name:'><br><input name='description' type='text' id='markerDescription' placeholder='Description:'><br><input name='img' type='url' id='markerImage' placeholder='http://imgurl.com'><br><input type='text' name='lat' value=${latitude} readonly><input type='text' name='long' value=${longitude} readonly><input type='submit' value='Submit'/></form>`;

    infowindow.setContent(formStr);
    infowindow.setPosition(event.latLng);
    infowindow.open(map);
    textBox[0] = infowindow;
    var $newItem = $('#new-item');
    $newItem.on("submit", handleNewItem);
  });
}



// Document Ready
$( function () {
  var listsUrl = "/lists/";
  utils.request("GET", "/lists").then(function (lists) {
    for(list of lists) {
      $("<a>").text(list.name).attr('class', 'list-item').attr('id', list.id).append("<br>").appendTo($("#left-col"));
      $('#left-col').on('click', '.list-item', function (event) {
        event.preventDefault();
        event.stopImmediatePropagation();
        var id = listsUrl + $(this).attr('id');
        utils.request("GET", id).then(function (items) {
          initMap(items);
        });
      });
    }
  });
  initMap();


  // $("#register-form").on("submit", function(event) {
  //   const $form = $(this);
  //   event.preventDefault();
  //   $.ajax({
  //     method: "POST",
  //     url: "/api/users/register"
  //     data
  //   })
  // });
});


