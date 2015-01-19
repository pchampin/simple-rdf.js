// jshint node: true
var Promise = require('promise');

exports.jsonld = function(graph, callback) {
    return new Promise(function(resolve, reject) {
        callback('[');
        graph.forEachTriple(null, null, null, function(s, p, o) {
            if (o['@language']) {
                // JSON-LD does not support both @type and @language
                o = {
                    '@value': o['@value'],
                    '@language': o['@language']
                };
            }
            triple = { '@id': s['@id'] };
            triple[p['@id']] = o;
            callback(JSON.stringify(triple) + ",");
        });
        callback('{}]');
        resolve();
    });
};
