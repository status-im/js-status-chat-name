#!/usr/bin/env node

// 5334537423578660988

const bigInt = require('big-integer');
const data = require('./data.js');
const LSFR = require('./lsfr.js');

function dropHexPrefix(str) {
  return str.substring(2)
}

function dropControlByte(str) {
  return str.substring(2)
}

function parseHexString(str) { 
  console.log(str.length)
  if (str.length != 128) {
    throw "Wrong Hex length for public key!"
  }
  return bigInt(str.substring(48, 64), 16)
}

function uncompressedPublicKeyToChatName(pubKeyStr) {
  if (!pubKeyStr.startsWith("0x")) {
    throw "Not a viable uncompressed public key"
  }
  let pubKey = dropControlByte(dropHexPrefix(pubKeyStr))
  let parsedKey = parseHexString(pubKey)
  
  let seed = parsedKey;
  let poly = bigInt[184];
  
  let gen = new LSFR(poly, seed);
  
  let adjec1 = gen.next().mod(data.adjectives.length);
  let adjec2 = gen.next().mod(data.adjectives.length);
  let animal = gen.next().mod(data.animals.length);
  return [
    data.adjectives[adjec1],
    data.adjectives[adjec2],
    data.animals[animal],
  ]
}

let pubKeyStr = "0x0461f576da67dc0bca9888cdb4cb28c80285b756b324109da94a081585ed6f007cf00afede6b3ee5638593674fee100b590318fc7bdb0054b8dd9445acea216ad2";
let chatName = uncompressedPublicKeyToChatName(pubKeyStr)

console.dir(chatName)
