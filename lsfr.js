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
      console.log("Poly:", this.poly)
      let c = this.poly.and(bigInt(1).shiftLeft(i))
      console.log("I:", i)
      console.log("C:", c)
      console.log("Bit:", bit)
      console.log("NotZero:", !c.isZero())
      if (!c.isZero()) {
        console.log("Shift:", this.data.shiftRight(i));
        bit = bit.xor(this.data.shiftRight(i));
      }
      console.log("Bit:", bit)
    }
    bit = bit.and(1);
    console.log("Bit:", bit)
    console.log("Data:", this.data)

    let w = this.data.shiftLeft(ONE)
    console.log("W:", w)

    this.data = w.or(bit);

    console.log("Rval:", this.data)
    return this.data;
  }
}

module.exports = LSFR;
