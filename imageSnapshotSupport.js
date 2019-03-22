const dashify = require('dashify');
const { basename, dirname, relative } = require('path');
const EventEmitter = require('events');
const { diffImageToSnapshot } = require('jest-image-snapshot/src/diff-snapshot.js');
const { shouldUpdateSnapshots, buildTestContext } = require('./utils.js');

const events = {
  IMAGE_SNAPSHOT_FAIL: 'imageSnapshotFail',
  IMAGE_SNAPSHOT_ADD: 'imageSnapshotAdd',
  IMAGE_SNAPSHOT_UPDATE: 'imageSnapshotUpdate',
  IMAGE_SNAPSHOT_PASS: 'imageSnapshotPass',
};

class SnapshotEmitter extends EventEmitter { }
const emitter = new SnapshotEmitter();

module.exports = {
  toMatchImageSnapshot,
  setImageSnapshotConfig,
  setTestContext,
  emitter,
  events,
};

const imageConfigDefaults = {
  imageFailuresThrow: true,
};
let imageConfig = imageConfigDefaults;
let currentContext;

function setTestContext(context) {
  currentContext = buildTestContext(context);
  currentContext.snapshotCount = 0;
}

function setImageSnapshotConfig(config) {
  imageConfig = Object.assign({}, imageConfigDefaults, config);
}

function toMatchImageSnapshot() {
  currentContext.snapshotCount++;
  const receivedImageBuffer = this.actual;
  const fileName = basename(currentContext.file);
  const filePath = dirname(currentContext.file);
  const snapshotsDir = `${filePath}/__snapshots__`;
  const snapshotIdentifier = dashify(`${fileName}-${currentContext.title}-${currentContext.snapshotCount}`);
  const snapshotFileName = `${snapshotsDir}/${snapshotIdentifier}`;
  const options = {
    receivedImageBuffer,
    snapshotIdentifier,
    snapshotsDir,
    diffDir: snapshotsDir,
    diffDirection: 'horizontal',
    updateSnapshot: shouldUpdateSnapshots(),
    updatePassedSnapshot: false,
    customDiffConfig: {},
    failureThreshold: 0,
    failureThresholdType: 'pixel',
  };
  const diffResult = diffImageToSnapshot(options);
  const {
    pass,
    updated,
    added,
    diffOutputPath,
  } = diffResult;
  const resultObj = {
    title: currentContext.title,
    fullTitle: currentContext.fullTitle,
    file: relative(process.cwd(), currentContext.file),
    snapshotFile: relative(process.cwd(), `${snapshotFileName}.png`),
  };
  if (diffOutputPath) {
    resultObj.diffOutputPath = relative(process.cwd(), diffOutputPath);
  }
  let evt = events.IMAGE_SNAPSHOT_FAIL;
  if (updated) {
    evt = events.IMAGE_SNAPSHOT_UPDATE;
  } else if (added) {
    evt = events.IMAGE_SNAPSHOT_ADD;
  } else if (pass) {
    evt = events.IMAGE_SNAPSHOT_PASS;
  }
  emitter.emit(evt, resultObj);
  if (!added && !updated && imageConfig.imageFailuresThrow) {
    expect.assert(pass, `Image snapshot did not match for '${currentContext.title}'.  See diff at '${diffOutputPath}'`);
  }
  return this;
}
