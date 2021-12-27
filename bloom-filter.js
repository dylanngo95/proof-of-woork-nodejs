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

  filter; // filter array
  encode_size = 8; // once element have 8 bit
  size; // array size
  n; // number of element

  constructor(size, n) {
    this.n = n;
    this.size = size;

    const encodeSize = Math.ceil(size / this.encode_size);
    this.filter = new Uint8Array(encodeSize);

  }

  add(str) {
    let tmp0 = 1 << 2;
    const pos = djb2(str, this.size);
    this.filter[pos] = 1;
    let tmp = 0;
  }

  check(str) {

  }
}

const tmp = djb2("dylan", 100);
console.log(tmp);
const bloom = new Bloom(1000000, 100);
bloom.add("dylan");