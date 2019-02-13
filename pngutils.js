const { PNG } = require('pngjs');
const fs = require('fs');

module.exports = {
  makeNewRandomImageBuffer,
  mergePng,
};

function makeNewRandomImageBuffer() {
  const dest = PNG.sync.read(fs.readFileSync(`${__dirname}/fixtures/test-1.png`));
  const bomb = PNG.sync.read(fs.readFileSync(`${__dirname}/fixtures/bomb.png`));
  const x = Math.floor(Math.random() * (dest.width - bomb.width));
  const y = Math.floor(Math.random() * (dest.height - bomb.width));
  const img = mergePng(bomb, dest, x, y);
  return PNG.sync.write(img);
}

function mergePng(src, dest, x, y) {
  const { width, height } = src;
  PNG.bitblt(src, dest, 0, 0, width, height, x, y);
  return dest;
}
