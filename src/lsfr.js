/**
 * All operations need to be done using BigInt values.
 **/
const ZERO = BigInt(0)
const ONE = BigInt(1)
/**
 * In GoLang we use uint64 for both `bit` and `data`. This is capped to 64bits.
 * When shifting left, this value might "overflow", meaning that
 * any bit in position greater than 64 will be set to `0` (in Go it just does not exist).
 * In the JavaScript implementation we use BigInt, which are not capped,
 * therefore shifting left actually preserves those bytes, and results in a different calculation.
 * To avoid this we always binary `AND` any value with the mask `0xffffffffffffffff`
 * which only preserves the 64 least significant bits.
 **/
const UINT64 = BigInt("0xFFFFFFFFFFFFFFFF")

/**
 * Linear-Feedback Shift Register algorithm
 * For details: https://en.wikipedia.org/wiki/Linear-feedback_shift_register
 * 
 * This implementation is based on the GoLang one in status-go:
 * https://github.com/status-im/status-go/tree/develop/protocol/identity/alias
 **/
class LSFR {
  constructor(poly, seed) {
    this.poly = poly
    this.data = seed
  }

  next() {
    let bit = ZERO

    for (let i = ZERO; i < BigInt(64); i++) {
      let c = (this.poly & (ONE << i)) & UINT64
      if (c != ZERO) {
        bit = (bit ^ (this.data >> i)) & UINT64
      }
    }
    bit = (bit & ONE) & UINT64

    let w = (this.data << ONE) & UINT64

    this.data = w | bit

    return this.data
  }
}

export default LSFR
