var chai = require('chai');
var expect = chai.expect;
var jsdom = require('mocha-jsdom')();
var MapViewport;

describe("Testing MapViewport", function() {
    before(function() {
        MapViewport = require('../src/MapViewport.js');
    });

    it("expect new instance to have correct height", function() {
        var viewPort = new MapViewport(500, 500, {
            width: 200,
            height: 200,
            path: '400.jpeg'
        });

        expect(viewPort.height).to.be.eql(500);
    });
});
