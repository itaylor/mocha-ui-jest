const jestSnapshot = require('jest-snapshot');
const { basename, dirname, relative } = require('path');
const EventEmitter = require('events');
const { buildTestContext, shouldUpdateSnapshots } = require('./utils.js');

const events = {
  SNAPSHOT_PASS: 'snapshotPass',
  SNAPSHOT_FAIL: 'snapshotFail',
};
class SnapshotEmitter extends EventEmitter {}
const emitter = new SnapshotEmitter();

module.exports = {
  toMatchSnapshot,
  setTestContext,
  emitter,
  events,
};

let currentContext;
let snapshotState;
function setTestContext(context) {
  currentContext = buildTestContext(context);
  snapshotState = null;
}

function toMatchSnapshot(name) {
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
  const matcher = jestSnapshot.toMatchSnapshot.bind({
    snapshotState,
    currentTestName: currentContext.title,
  });
  const result = matcher(this.actual, name);
  snapshotState.save();
  const resultObj = {
    title: currentContext.title,
    fullTitle: currentContext.fullTitle,
    file: relative(process.cwd(), currentContext.file),
    snapshotFile: relative(process.cwd(), snapshotFile),
  };
  let evt = events.SNAPSHOT_FAIL;
  if (result.pass) {
    evt = events.SNAPSHOT_PASS;
  }
  emitter.emit(evt, resultObj);
  expect.assert(result.pass, !result.pass ? result.report() : '');
  return this;
}
