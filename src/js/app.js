require('../css/main.css');

var React 		= require('react');
var ReactDOM 	= require('react-dom');
var CommentBox 	= require('./components/CommentBox');
//var greet 		= require('./greeting');

// tutorial1.js
ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);