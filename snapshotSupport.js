const jestSnapshot = require('jest-snapshot');
const { basename, dirname, relative } = require('path');
const EventEmitter = require('events');
const matcherUtils = require('jest-matcher-utils');
const { iterableEquality, subsetEquality } = require('expect/build/utils.js');
const { equals } = require('expect/build/jasmineUtils');
const mochaTestContext = require('mocha-test-context');

const { shouldUpdateSnapshots } = require('./utils.js');

const events = {
  SNAPSHOT_PASS: 'snapshotPass',
  SNAPSHOT_FAIL: 'snapshotFail',
  SNAPSHOT_UPDATE: 'snapshotUpdate',
  SNAPSHOT_ADD: 'snapshotAdd',
};
class SnapshotEmitter extends EventEmitter {}
const emitter = new SnapshotEmitter();

module.exports = {
  toMatchSnapshot,
  emitter,
  events,
};

let snapshotState;

function toMatchSnapshot(...args) {
  const currentContext = mochaTestContext();
  if (!currentContext) {
    throw new Error('Missing `context` for toMatchSnapshot');
  }
  const fileName = basename(currentContext.file);
  const filePath = dirname(currentContext.file);
  const snapshotFile = `${filePath}/__snapshots__/${fileName}.snap`;

  if (!snapshotState) {
    snapshotState = new jestSnapshot.SnapshotState(snapshotFile, {
      updateSnapshot: shouldUpdateSnapshots() ? 'all' : 'new',
    });
  }
  const snapshotStateAddedBefore = snapshotState.added;
  const snapshotStateUpdatedBefore = snapshotState.updated;
  const matcher = jestSnapshot.toMatchSnapshot.bind({
    equals,
    utils: { ...matcherUtils, iterableEquality, subsetEquality },
    snapshotState,
    currentTestName: currentContext.title,
  });
  const result = matcher(...args);
  snapshotState.save();
  const snapshotStateAddedAfter = snapshotState.added;
  const snapshotStateUpdatedAfter = snapshotState.updated;
  const resultObj = {
    ...currentContext,
    snapshotFile: relative(process.cwd(), snapshotFile),
  };
  let evt = events.SNAPSHOT_FAIL;
  if (snapshotStateAddedAfter > snapshotStateAddedBefore) {
    evt = events.SNAPSHOT_ADD;
  } else if (snapshotStateUpdatedAfter > snapshotStateUpdatedBefore) {
    evt = events.SNAPSHOT_UPDATE;
  } else if (result.pass) {
    evt = events.SNAPSHOT_PASS;
  }
  emitter.emit(evt, resultObj);
  return result;
}
