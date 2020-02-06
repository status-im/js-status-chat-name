import { animals, adjectives } from './data.js'
import LSFR from './lsfr.js'

function dropHexPrefix(str) {
  return str.substring(2)
}

function dropControlByte(str) {
  return str.substring(2)
}

function parseHexString(str) { 
  if (str.length != 128) {
    throw "Wrong Hex length for public key!"
  }
  return BigInt("0x"+str.substring(48, 64), 16)
}

function uncompressedPublicKeyToChatName(pubKeyStr) {
  if (!pubKeyStr.startsWith("0x")) {
    throw "Not a viable uncompressed public key"
  }
  let pubKey = dropControlByte(dropHexPrefix(pubKeyStr))
  let parsedKey = parseHexString(pubKey)
  
  let seed = parsedKey;
  let poly = BigInt(184);
  
  let gen = new LSFR(poly, seed);
  
  let adjec1 = gen.next() % BigInt(adjectives.length);
  let adjec2 = gen.next() % BigInt(adjectives.length);
  let animal = gen.next() % BigInt(animals.length);
  return [
    adjectives[adjec1],
    adjectives[adjec2],
    animals[animal],
  ]
}

export { uncompressedPublicKeyToChatName }
