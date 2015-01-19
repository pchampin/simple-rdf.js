// jshint node: true

var BasicCore = require('../src/cores/basic.js').BasicCore;
var graph = require('../src/graph.js').graph;
var iri = require('../src/rdfnode.js').iri;
var namespace = require('../src/rdfnode.js').namespace;
var nt = require('../src/serializers/nt.js').nt;

var me = iri('http://champin.net/#pa');
var ns = namespace('http://ex.co/vocab#');

var bc = new BasicCore(me, graph());

bc.getState().then(function(g) {
    return nt(g, console.log);
}).then(function() {
    return bc.edit(function(g) {
        g.addTriple(me, ns('type'), ns('Person'));
        g.addTriple(me, ns('label'), "Pierre-Antoine Champin");
    })
}).then(function(g) {
    console.log('----\n');
    return nt(g, console.log);
}).then(function() {
    console.log('---- \n');
    return bc.getState();
}).then(function(g) {
    return nt(g, console.log);
}).done();
