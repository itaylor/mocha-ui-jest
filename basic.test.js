const { PNG } = require('pngjs');
const fs = require('fs');

describe('basic test', () => {
  test('expect works', () => {
    expect(true).toBe(true);
    expect([{ that: 'this' }]).toMatchSnapshot();
  });

  test('multiple snapshots in one test work', () => {
    expect({ foo: 'bar' }).toMatchSnapshot();
    expect({ bar: 'foo' }).toMatchSnapshot();
  });

  test('async tests with snapshots work', async () => {
    expect({ before: 'sleep' }).toMatchSnapshot();
    await sleep(10);
    expect({ after: 'sleep' }).toMatchSnapshot();
  });

  test('multiple image assertions work', () => {
    const buf1 = fs.readFileSync(`${__dirname}/fixtures/test-1.png`);
    expect(buf1).toMatchImageSnapshot();
    const buf2 = fs.readFileSync(`${__dirname}/fixtures/test-2.png`);
    expect(buf2).toMatchImageSnapshot();
  });

  test('Image assertions fail by throwing', () => {
    expect(() => {
      expect(makeNewRandomImageBuffer()).toMatchImageSnapshot();
    }).toThrow(/Image snapshot did not match/);
  });
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

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
