const ZERO = BigInt(0)
const ONE = BigInt(1)
const UINT64 = BigInt("0xFFFFFFFFFFFFFFFF")

class LSFR {
  constructor(poly, seed) {
    this.poly = poly;
    this.data = seed;
  }

  next() {
    let bit = ZERO;

    for (let i = ZERO; i < BigInt(64); i++) {
      let c = (this.poly & (ONE << i)) & UINT64
      if (c != ZERO) {
        bit = (bit ^ (this.data >> i)) & UINT64
      }
    }
    bit = (bit & ONE) & UINT64;

    let w = (this.data << ONE) & UINT64

    this.data = w | bit;

    return this.data;
  }
}

module.exports = LSFR;
