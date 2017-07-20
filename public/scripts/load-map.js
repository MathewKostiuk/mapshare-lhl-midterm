function initMap() {
        var uluru = {lat: 48.428, lng: -123.365};
        var test = {lat: 49.000, lng: -121.000};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 12,
          center: uluru
        });
        // var marker = new google.maps.Marker({
          // position: uluru,
          // map: map
        // });
      }
