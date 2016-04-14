import React from "react";
import jsonp from  "jsonp";

class GoogleMap extends React.Component {

  initMap() {
    console.log('init map');
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 11,
      center: {lat: 36.0876068, lng: -79.8285789}
    });
  }

  componentDidMount() {
    console.log('map mounted, loading api');
    jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyDJBH17TtAJid3ZOumVhUC8T-oAA7e7nzI',
        (err, data) => {
            // Doesn't return data so just throw if err
            if (err) throw err;
            this.initMap();
        });
  }

  render() {
    return (
      <div id="map"></div>
    );
  }

}

export default GoogleMap;