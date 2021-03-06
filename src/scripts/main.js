// Require Node modules in the browser thanks to Browserify: http://browserify.org
var bespoke = require('bespoke');
var buildWars = require('bespoke-theme-build-wars');
var substeps = require('bespoke-substeps/dom');
var progress = require('bespoke-progress');
var classes = require('bespoke-classes');
var nav = require('bespoke-nav');
var scale = require('bespoke-scale');
var bullets = require('bespoke-bullets');
var hash = require('bespoke-hash');
var prism = require('bespoke-prism');
var extern = require('bespoke-extern');

// Bespoke.js
bespoke.from({ parent: 'article.deck', slides: 'section' }, [
  buildWars(),
  substeps(),
  progress(),
  classes(),
  nav(),
  scale(),
  bullets('.build, .build-items > *:not(.build-items)'),
  hash(),
  prism(),
  extern(bespoke)
]);
