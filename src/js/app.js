import '../css/normalize.css';
import '../css/responsive.css';
import '../css/style.css';

import React from "react";
import ReactDOM from "react-dom";
import AddressForm from './components/AddressForm';
import GoogleMap from "./components/GoogleMap"

function initMap() {
    console.log('global init map');
}

// tutorial1.js
ReactDOM.render(
  <div className="dashboard">
    <AddressForm />
    <GoogleMap />
  </div>,
  document.getElementById('content')
);