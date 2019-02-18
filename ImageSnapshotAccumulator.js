const imageSnapshotSupport = require('./imageSnapshotSupport.js');

const { emitter, events } = imageSnapshotSupport;

module.exports = class ImageSnapshotAccumulator {
  constructor() {
    this.state = {
      passCount: 0,
      failCount: 0,
      addCount: 0,
      updateCount: 0,
      failures: [],
    };
    this.listeners = {
      [events.IMAGE_SNAPSHOT_PASS]: () => {
        this.state.passCount++;
      },
      [events.IMAGE_SNAPSHOT_FAIL]: (testContext) => {
        this.state.failCount++;
        this.state.failures.push(testContext);
      },
      [events.IMAGE_SNAPSHOT_ADD]: () => {
        this.state.addCount++;
      },
      [events.IMAGE_SNAPSHOT_UPDATE]: () => {
        this.state.updateCount++;
      },
    };
    Object.entries(this.listeners).forEach(([k, v]) => emitter.on(k, v));
  }

  getState() {
    return this.state;
  }

  destroy() {
    Object.entries(this.listeners).forEach(([k, v]) => emitter.removeListener(k, v));
  }
};
