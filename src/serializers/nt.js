// jshint node: true
var toNT = require('../rdfnode.js').toNT;
var Promise = require('promise');

exports.nt = function(graph, callback) {
    return new Promise(function(resolve, reject) {
        graph.forEachTriple(null, null, null, function(s, p, o) {
            callback(toNT(s) + " " + toNT(p) + " " + toNT(o) + ".");
        });
        resolve();
    });
};
