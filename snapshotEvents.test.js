const { snapshotSupport } = require('./index.js');

const { emitter, events } = snapshotSupport;

describe('snapshot events test', () => {
  afterEach(() => emitter.removeAllListeners());

  test('expect works while firing pass events', () => {
    let passCount = 0;
    let failCount = 0;
    let lastTestContext;
    emitter.on(events.SNAPSHOT_PASS, (testContext) => {
      lastTestContext = testContext;
      passCount++;
    });
    emitter.on(events.SNAPSHOT_FAIL, (testContext) => {
      lastTestContext = testContext;
      failCount++;
    });
    expect([{ that: 'this' }]).toMatchSnapshot();
    expect(passCount).toBe(1);
    expect(failCount).toBe(0);
    expect(lastTestContext).toMatchSnapshot();
  });

  test('expect works while firing fail events', () => {
    let passCount = 0;
    let failCount = 0;
    let lastTestContext;
    emitter.on(events.SNAPSHOT_PASS, (testContext) => {
      lastTestContext = testContext;
      passCount++;
    });
    emitter.on(events.SNAPSHOT_FAIL, (testContext) => {
      lastTestContext = testContext;
      failCount++;
    });
    expect(() => {
      expect([{ fails: Math.random() }]).toMatchSnapshot();
    }).toThrow();
    expect(passCount).toBe(0);
    expect(failCount).toBe(1);
    expect(lastTestContext).toMatchSnapshot();
  });
});
