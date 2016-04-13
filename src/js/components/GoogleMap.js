import React from "react";
import jsonp from  "jsonp";

class GoogleMap extends React.Component {

  initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: {lat: 36.0876068, lng: -79.8285789}
    });
    var geocoder = new google.maps.Geocoder();

    document.getElementById('submit').addEventListener('click', function() {
      geocodeAddress(geocoder, map);
    });
  }

  geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        resultsMap.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  componentDidMount() {
    jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyDJBH17TtAJid3ZOumVhUC8T-oAA7e7nzI',
        {
            name: "initMap",
        },
        (err, data) => {
            console.log('jsonp callback..');
            console.log('err', err);
            console.log('data', data);
        }
    );
    // this.initMap('&signed_in=true&callback=initMap');
  }

  render() {
    return (
      <div id="map"></div>
    );
  }
}

export default GoogleMap;