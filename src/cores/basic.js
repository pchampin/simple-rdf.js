// jshint node: true

var Promise = require('promise');
var copyGraph = require('../graph.js').copyGraph;

var MAX_AGE_REGEX = /max-age=([0-9]+)/;

var BasicCore = function(iri, graph) {
    if (!(this instanceof BasicCore)) return new BasicCore(iri, graph);

    var that = this;

    that.iri = iri;
    that._graph = graph;

    that.getState = function(forceRefresh) {
        // Promises an RDF graph representing the current state of the core.
        return Promise.resolve(graph);
    };

    that.edit = function(editor) {
        // Promises to apply function 'editor' to the current state of the core,
        // and to return the resulting state.
        return Promise.resolve(editor(graph))
            .then(function() {
                return graph;
            });
    };

    that.postGraph = function(graph) {
        // Promises to process the posted graph.
        // Not implemented in BasicCore.
        return Promise.reject("can't post graph to BasicCore");
    };

    that.delete = function(graph) {
        // Promises to delete this core.
        // Not implemented in BasicCore.
        return Promise.reject("can't delete BasicCore");
    };

    Object.freeze(that);
};

exports.BasicCore = BasicCore;

