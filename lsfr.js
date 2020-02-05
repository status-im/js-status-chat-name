const bigInt = require("big-integer");

const ZERO = bigInt(0)
const ONE = bigInt(1)

class LSFR {
  constructor(poly, seed) {
    this.poly = poly;
    this.data = seed;
  }

  next() {
    let bit = ZERO;

    for (let i = 0; i < 64; i++) {
      let c = this.poly.and(1<<i)
      console.log("C:", c)
      console.log("Bit:", bit)
      console.log("NotZero:", !bit.isZero())
      if (!c.isZero()) {
        console.log("Shift:", this.data.shiftRight(i));
        bit = bit.xor(this.data.shiftRight(i));
      }
      console.log("Bit:", bit)
    }
    bit = bit.and(1);

    this.data = this.data.shiftLeft(1).or(bit);

    return this.data;
  }
}

module.exports = LSFR;
