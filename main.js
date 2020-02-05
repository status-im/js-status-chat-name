#!/usr/bin/env node

// 5334537423578660988

const bigInt = require('big-integer');
const data = require('./data.js');
const LSFR = require('./lsfr.js');

function dropControlByte(str) {
  return str.substring(2)
}

function parseHexString(str) { 
  if (str.length != 128) {
    throw "Wrong Hex length for public key!"
  }
  return {
      x: bigInt(str.substring(0, 64), 16),
      y: bigInt(str.substring(64, 128), 16),
  }
}

let pubKey = "0461f576da67dc0bca9888cdb4cb28c80285b756b324109da94a081585ed6f007cf00afede6b3ee5638593674fee100b590318fc7bdb0054b8dd9445acea216ad2";

let parsedKey = parseHexString(dropControlByte(pubKey))

let seed = parsedKey.x;
let poly = bigInt[184];

let gen = new LSFR(poly, seed);

let adjec1 = gen.next().mod(data.adjectives.length);
let adjec2 = gen.next().mod(data.adjectives.length);
let animal = gen.next().mod(data.animals.length);

let chatName = [
  data.adjectives[adjec1],
  data.adjectives[adjec2],
  data.animals[animal],
]

console.dir(chatName)
