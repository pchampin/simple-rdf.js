// jshint node: true

var graph = require('../src/graph.js').graph;
var namespace = require('../src/rdfnode.js').namespace;

var ns = namespace('http://ex.co/');

var g = graph();
console.log(g.countTriples() + ' triples');
g.addTriple(ns('s1'), ns('p'), ns('o1'));
console.log(g.countTriples() + ' triples');
g.addTriple(ns('s1'), ns('p'), ns('o2'));
console.log(g.countTriples() + ' triples');
g.addTriple(ns('s2'), ns('p'), ns('o1'));
console.log(g.countTriples() + ' triples');
g.addTriple(ns('s3'), ns('q'), ns('o3'));
console.log(g.countTriples() + ' triples');
g.addTriple(ns('s1'), ns('p'), "hello world");
console.log(g.countTriples() + ' triples');

console.log(g.containsTriple(ns('s1'), ns('p'), ns('o1')));
console.log(g.containsTriple(ns('s1'), ns('q'), ns('o1')));

console.log('printed ' + 
            g.forEachTriple(null, null, null, console.log) +
            ' triples');
console.log('removed ' +
            g.forEachTriple(ns('s1'), null, null, g.removeTriple) +
            ' triples');
console.log(g.countTriples() + ' triples left');
console.log('removed ' +
            g.forEachTriple(null, null, null, g.removeTriple) +
            ' triples');
console.log(g.countTriples() + ' triples left');
