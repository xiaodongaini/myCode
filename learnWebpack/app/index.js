//CommonJS 风格的代码
//require('./main.css');
// require('./main.scss');
// var sub = require('./sub');
// var $ =require('jquery');
// var moment = require('moment');
// var app = document.createElement('div');
// app.innerHTML = '<h1>Hello World</h1>';
// app.appendChild(sub());
// document.body.appendChild(app);
// $('body').append('<p>look at me! now is '+moment().format()+'</p>');

//ES2015风格的代码
import './main.scss';
import generateText from './sub';
import $ from 'jquery';
import moment from 'moment';
import './plugin.js';

let app = document.createElement('div');
const myPromise = Promise.resolve(42);
myPromise.then((number)=>{
	$('body').append('<p>promise results is ' + number + ' now is '+moment().format()+'</p>');
	$('p').greenify();
});
app.innerHTML = '<h1>Hello World it</h1>';
document.body.appendChild(app);
app.appendChild(generateText());