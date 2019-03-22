const snapshotSupport = require('./snapshotSupport.js');

const { emitter, events } = snapshotSupport;

module.exports = class SnapshotAccumulator {
  constructor() {
    this.state = {
      addCount: 0,
      updateCount: 0,
      passCount: 0,
      failCount: 0,
      failures: [],
      additions: [],
    };
    this.listeners = {
      [events.SNAPSHOT_PASS]: () => {
        this.state.passCount++;
      },
      [events.SNAPSHOT_FAIL]: (testContext) => {
        this.state.failCount++;
        this.state.failures.push(testContext);
      },
      [events.SNAPSHOT_ADD]: (testContext) => {
        this.state.addCount++;
        this.state.additions.push(testContext);
      },
      [events.SNAPSHOT_UPDATE]: () => {
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
