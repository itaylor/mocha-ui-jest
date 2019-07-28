const fs = require('fs');
const { makeNewRandomImageBuffer } = require('./pngutils.js');

describe('basic test', () => {
  test('expect works', () => {
    expect(true).toBe(true);
    expect(1).toBe(1);
    expect(1).not.toBe(2);
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

  test('Snapshot assertions fail by throwing', () => {
    expect(() => {
      expect(Math.random()).toMatchSnapshot();
    }).toThrow(/Snapshot name: `Snapshot assertions fail by throwing 1`/);
  });
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
