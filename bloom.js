/**
 *
 * @param {String} str
 * @returns
 */
function djb2(str, size) {
  let hash = 5381;
  const n = str.length;
  for (let i = 0; i < n; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i); // hash * 33 + c
  }
  return hash % size;
}

class Bloom {

  filter; // filter Byte array
  encode_size = 8; // once item have 8 bit, it's mean a byte
  size; // array size
  n; // number of element

  constructor(size, n) {
    this.n = n;
    this.size = Math.ceil(size / this.encode_size);
    this.filter = new Uint8Array(this.size);

  }

  add(str) {
    const positionBit = djb2(str, this.size);
    const positionByte = Math.floor(positionBit / this.encode_size);
    let value = this.filter[positionByte];
    let tmp = 0;
  }

  change() {

  }

  check(str) {

  }
}

const tmp = djb2("dylan", 100);
console.log(tmp);
const bloom = new Bloom(1000000, 100);
bloom.add("dylan");