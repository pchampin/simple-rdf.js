// jshint node: true
var assert = require('assert');

var XSD_BOOLEAN = "http://www.w3.org/2001/XMLSchema#boolean";
var XSD_DOUBLE = "http://www.w3.org/2001/XMLSchema#double";
var XSD_INTEGER = "http://www.w3.org/2001/XMLSchema#integer";

exports.iri = function(iristr) {
    return { '@id': iristr };
};
var iri = exports.iri;

exports.bnode = function(bnodeid) {
    return { '@id': '_:'+bnodeid };
};

exports.namespace = function(iristr) {
    if (typeof iristr === 'object') { // also accept iri nodes
        iristr = iri['@id'];
    }
    return function (suffix) {
        return iri(iristr + suffix);
    };
};

exports.canonicalize = function(n) {
    var typeofn = typeof n;
    if(typeofn === 'object') {
        // optimistic optimization: we do not check for @id or @value
        return n;
        // TODO should we be more strict ?
    } else if (typeofn === 'string') {
        return { "@value": n };
    } else if (typeofn === 'boolean') {
        return { "@value": String(n), "@type": XSD_BOOLEAN };
    } else if (typeofn === 'number') {
        throw "TODO: implement int vs. float distinction";
    } else {
        throw "unrecognized node";
    }
    // TODO for strings (if typeofn is object or string),
    // should we still include @type xsd:string?
};

exports.toNT = function(n) {
    assert(typeof n === 'object'); // should be canonicalized
    id = n['@id'];
    if (id !== undefined) {
        var id = n['@id'];
        if (id[0] === '_') {
            return id;
        } else {
            return '<' + id + '>';
        }
    } else {
        var value = n['@value'];
        assert(value !== undefined);
        // TODO JSON escaping may not be strictly equivalent to NT escaping
        var ret = JSON.stringigy(value);
        var datatype = n['@type'];
        if (datatype !== undefined) {
            ret += '^^<' + datatype + '>';
        } else {
            var language = n['@language'];
            if (language !== undefined) {
                ret += '@' + language;
            }
        }
    }
};

exports.sameNode = function(n1, n2) {
    assert(typeof n1 === 'object'); // must be in canonical form
    assert(typeof n2 === 'object'); // must be in canonical form
    return (
        n1['@id']       === n2['@id'] &&
        n1['@value']    === n2['@value'] &&
        n1['@type']     === n2['@type'] &&
        n1['@language'] === n2['@language']
    );
};

