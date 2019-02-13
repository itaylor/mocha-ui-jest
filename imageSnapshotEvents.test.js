const fs = require('fs');
const rimraf = require('rimraf');
const { imageSnapshotSupport } = require('./index.js');
const { makeNewRandomImageBuffer } = require('./pngutils.js');

const { emitter, events, setImageSnapshotConfig } = imageSnapshotSupport;

describe('image snapshot events test', () => {
  let state;
  beforeEach(() => {
    state = wireEvents();
  });
  afterEach(() => emitter.removeAllListeners());

  test('expect works while firing pass events', () => {
    const buf1 = fs.readFileSync(`${__dirname}/fixtures/test-1.png`);
    expect(buf1).toMatchImageSnapshot();
    expect(state).toMatchSnapshot();
  });

  test('expect works while firing fail events', () => {
    expect(() => {
      expect(makeNewRandomImageBuffer()).toMatchImageSnapshot();
    }).toThrow();
    expect(state).toMatchSnapshot();
  });

  test('wont throw when using imageFailuresThrow: false', () => {
    setImageSnapshotConfig({ imageFailuresThrow: false });
    expect(makeNewRandomImageBuffer()).toMatchImageSnapshot();
    expect(state).toMatchSnapshot();
  });

  test('expect works while firing add events', () => {
    rimraf.sync(`${__dirname}/__snapshots__/image-snapshot-events-test-js-expect-works-while-firing-add-events-1-snap.png`);
    expect(makeNewRandomImageBuffer()).toMatchImageSnapshot();
    expect(state).toMatchSnapshot();
    rimraf.sync(`${__dirname}/__snapshots__/image-snapshot-events-test-js-expect-works-while-firing-add-events-1-snap.png`);
  });

  test('expect works while firing update events', () => {
    process.env.SNAPSHOT_UPDATE = 'true';
    expect(makeNewRandomImageBuffer()).toMatchImageSnapshot();
    process.env.SNAPSHOT_UPDATE = 'false';
    expect(state).toMatchSnapshot();
  });
});

function wireEvents() {
  const state = {
    passCount: 0,
    failCount: 0,
    addCount: 0,
    updateCount: 0,
    lastTestContext: null,
  };
  emitter.on(events.IMAGE_SNAPSHOT_PASS, (testContext) => {
    state.lastTestContext = testContext;
    state.passCount++;
  });
  emitter.on(events.IMAGE_SNAPSHOT_FAIL, (testContext) => {
    state.lastTestContext = testContext;
    state.failCount++;
  });
  emitter.on(events.IMAGE_SNAPSHOT_ADD, (testContext) => {
    state.lastTestContext = testContext;
    state.addCount++;
  });
  emitter.on(events.IMAGE_SNAPSHOT_UPDATE, (testContext) => {
    state.lastTestContext = testContext;
    state.updateCount++;
  });
  return state;
}
