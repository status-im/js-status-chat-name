import { animals, adjectives } from './data.js'
import LSFR from './lsfr.js'

function dropHexPrefixAndControlByt(str) {
  return str.substring(4)
}

function extractXFromPubKey(str) { 
  if (str.length != 128) {
    throw "Wrong Hex length for public key!"
  }
  /**
   * We need to parse the 8 least significant bytes of X.
   * This means we need to take the last 16 characters
   * from the first 64 character hexadecimal.
   **/
  return BigInt("0x"+str.substring(48, 64), 16)
}

function chatKeyToChatName(pubKeyStr) {
  if (typeof pubKeyStr != "string") {
    throw "Only type string argument is accepted."
  }
  /**
   * 0x indicates the hexadecimal format of string.
   * 04 is the prefix of an uncompressed public key.
   * For more details see:
   * https://github.com/bitcoin-core/secp256k1/blob/0d9540b1/include/secp256k1.h#L180
   **/
  if (!pubKeyStr.startsWith("0x04")) {
    throw "Not a viable uncompressed public key."
  }
  /* The actual data is after the control byte. */
  let pubKey = dropHexPrefixAndControlByt(pubKeyStr)
  /* Public key consists of two values, X and Y. */
  let pubKeyX = extractXFromPubKey(pubKey)
  
  let seed = pubKeyX;
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
