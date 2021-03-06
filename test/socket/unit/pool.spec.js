/* global describe, it, beforeEach */

var Pool = require('../../../app/socket/Pool');
var expect = require('expect.js');
var sinon = require('sinon');

describe('Socket connection pool', function () {
    var pool, connection;

    beforeEach(function () {
        pool = new Pool();
        connection = {
            disconnect: sinon.spy(),
            publishMessage: sinon.spy()
        };
    });

    it('should create new one', function () {
        expect(pool instanceof Pool).to.be(true);
    });

    it('should add connection to the pool', function () {
        pool.addConnection(connection);

        expect(pool.connections.length).to.be(1);
    });

    it('should remove connection from the pool', function () {
        pool.addConnection(connection);

        expect(pool.connections.length).to.be(1);

        pool.removeConnection(connection);

        expect(pool.connections.length).to.be(0);
        expect(connection.disconnect.called).to.be(true);
    });
});