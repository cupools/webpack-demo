document.body.innerHTML += '<p>page1.js works</p>';

import '../css/normalize.css';
document.body.innerHTML += '<p>normalize.css works</p>';

import '../css/common.scss';
document.body.innerHTML += '<p>common.scss works</p>';

import './page1.scss';
document.body.innerHTML += '<p>page1.scss works</p>';

import $ from 'zepto';
$('body').append('<p>zepto.js works</p>');

import log from 'log';
log();

