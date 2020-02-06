const bigInt = require("big-integer");

const ZERO = bigInt(0)
const ONE = bigInt(1)
const UINT64 = bigInt("FFFFFFFFFFFFFFFF", 16)

class LSFR {
  constructor(poly, seed) {
    this.poly = poly;
    this.data = seed;
  }

  next() {
    let bit = ZERO;

    for (let i = 0; i < 64; i++) {
      let c = this.poly.and(bigInt(1).shiftLeft(i)).and(UINT64)
      if (!c.isZero()) {
        bit = bit.xor(this.data.shiftRight(i)).and(UINT64);
      }
    }
    bit = bit.and(1).and(UINT64);

    let w = this.data.shiftLeft(ONE).and(UINT64)

    this.data = w.or(bit);

    return this.data;
  }
}

module.exports = LSFR;
