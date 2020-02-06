import { animals, adjectives } from './data.js'
import LSFR from './lsfr.js'

function dropHexPrefixAndControlByt(str) {
  /**
   * 04 is the prefix of an uncompressed public key.
   * For more details see:
   * https://github.com/bitcoin-core/secp256k1/blob/0d9540b1/include/secp256k1.h#L180
   **/
  return str.replace(/^0x04/, '')
}

function extractXFromPubKey(str) { 
  if (str.length != 128) {
    throw new Error('Should consists of 2x64 characters.')
  }
  /**
   * We need to parse the 8 least significant bytes of X.
   * This means we need to take the last 16 characters
   * from the first 64 character hexadecimal.
   **/
  return BigInt('0x'+str.substring(48, 64), 16)
}

const validatePublicKey = (pubKeyStr) => {
  /* We accept only strings for now. */
  if (typeof pubKeyStr != 'string') {
    throw new TypeError('Only type string argument is accepted.')
  }
  /* Public key must be 130 characters long. */
  if (pubKeyStr.length != 132) {
    throw new Error('Wrong key length, expected 132 characters.')
  }
  /* Chat keys are represented as a hexadecimal with a control byte */
  if (!pubKeyStr.startsWith('0x04')) {
    throw new Error('Expected a 0x04 prefix for uncompressed public key.')
  }
}

function chatKeyToChatName(pubKeyStr) {
  /* Verify the passed string is a Status chat key. */
  validatePublicKey(pubKeyStr)
  /* The actual data is after the control byte. */
  let pubKey = dropHexPrefixAndControlByt(pubKeyStr)
  /* Public key consists of two values, X and Y. */
  let pubKeyX = extractXFromPubKey(pubKey)
  
  let seed = pubKeyX
  let poly = BigInt(184)
  
  /* Linear-Feedback Shift Register */
  let gen = new LSFR(poly, seed)
  
  /* Pick words based on modulo of generated number */
  let adjec1 = gen.next() % BigInt(adjectives.length)
  let adjec2 = gen.next() % BigInt(adjectives.length)
  let animal = gen.next() % BigInt(animals.length)

  return [
    adjectives[adjec1],
    adjectives[adjec2],
    animals[animal],
  ].join(' ')
}

/* Main object */
const StatusIm = { chatKeyToChatName }

export default StatusIm
