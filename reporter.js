/* eslint-disable no-console */
const Mocha = require('mocha');

const { Spec, Base } = Mocha.reporters;
const { color } = Base;
const ImageSnapshotAccumulator = require('./ImageSnapshotAccumulator.js');
const SnapshotAccumulator = require('./SnapshotAccumulator.js');

module.exports = class SnapshotSpecReporter extends Spec {
  constructor(runner) {
    super(runner);
    this.imageSnapshotAccum = new ImageSnapshotAccumulator();
    this.snapshotAccum = new SnapshotAccumulator();
  }

  epilogue() {
    super.epilogue();
    const {
      passCount: snapshotsPassed,
      failCount: snapshotsFailed,
      addCount: snapshotsAdded,
      updateCount: snapshotsUpdated,
    } = this.snapshotAccum.getState();

    const {
      passCount: imageSnapshotsPassed,
      failCount: imageSnapshotsFailed,
      addCount: imageSnapshotsAdded,
      updateCount: imageSnapshotsUpdated,
    } = this.imageSnapshotAccum.getState();

    let wroteMessage = false;
    // snapshots
    if (snapshotsPassed || snapshotsAdded || snapshotsUpdated || snapshotsFailed) {
      const parts = [];
      if (snapshotsPassed) {
        parts.push(color('bright pass', `${snapshotsPassed} passed`));
      }
      if (snapshotsAdded) {
        parts.push(color('green', `${snapshotsAdded} added`));
      }
      if (snapshotsUpdated) {
        parts.push(color('bright yellow', `${snapshotsUpdated} updated`));
      }
      if (snapshotsFailed) {
        parts.push(color('fail', `${snapshotsFailed} failed`));
      }
      console.log(`  Snapshots: ${parts.join(', ')}`);
      wroteMessage = true;
    }

    if (imageSnapshotsPassed || imageSnapshotsAdded || imageSnapshotsUpdated || imageSnapshotsFailed) {
      const parts = [];
      if (imageSnapshotsPassed) {
        parts.push(color('bright pass', `${imageSnapshotsPassed} passed`));
      }
      if (imageSnapshotsAdded) {
        parts.push(color('green', `${imageSnapshotsAdded} added`));
      }
      if (imageSnapshotsUpdated) {
        parts.push(color('bright yellow', `${imageSnapshotsUpdated} updated`));
      }
      if (imageSnapshotsFailed) {
        parts.push(color('fail', `${imageSnapshotsFailed} failed`));
      }
      console.log(`  Image Snapshots: ${parts.join(', ')}`);
      wroteMessage = true;
    }
    if (wroteMessage) {
      console.log('');
    }
  }
};
