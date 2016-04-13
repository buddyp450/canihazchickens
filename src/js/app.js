import '../css/normalize.css';
import '../css/responsive.css';
import '../css/style.css';

import React from "react";
import ReactDOM from "react-dom";
import GoogleMap from "./components/GoogleMap"

// tutorial1.js
ReactDOM.render(
  <GoogleMap />,
  document.getElementById('content')
);