'use strict';

const libvirt = require('../lib');
const assert = require("assert");

function testConn()
{
  libvirt.open("invalidString");
    // const connection = libvirt.virConnect();
    // assert(connection, "No valid connection");
}

assert.doesNotThrow(testConn, undefined, "testConn threw an expection");