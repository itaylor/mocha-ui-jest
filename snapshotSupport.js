const jestSnapshot = require('jest-snapshot');
const { basename, dirname } = require('path');

module.exports = {
  toMatchSnapshot,
  toMatchImageSnapshot,
  newSnapshotContext,
};

let currentContext;
let snapshotState;
function newSnapshotContext(context) {
  const r = context.currentTest || context.test || context._runnable;
  const title = makeTestTitle(r);
  currentContext = {
    file: r.file,
    name: r.name,
    title,
    snapshotCount: 0,
  };
  snapshotState = null;
}

function toMatchSnapshot(name) {
  if (!currentContext) {
    throw new Error('Missing `context` for toMatchSnapshot');
  }
  if (!snapshotState) {
    const fileName = basename(currentContext.file);
    const filePath = dirname(currentContext.file);
    const snapshotPath = `${filePath}/__snapshots__/${fileName}.snap`;

    snapshotState = new jestSnapshot.SnapshotState(snapshotPath, {
      updateSnapshot: process.env.SNAPSHOT_UPDATE ? 'all' : 'new',
    });
  }

  const matcher = jestSnapshot.toMatchSnapshot.bind({
    snapshotState,
    currentTestName: currentContext.title,
  });

  const result = matcher(this.actual, name);
  snapshotState.save();

  expect.assert(result.pass, !result.pass ? result.report() : '');

  return this;
}

function toMatchImageSnapshot() {
  const img = this.actual;
  console.log(img);
}

function makeTestTitle(test) {
  let next = test;
  const title = [];

  for (; ;) {
    if (!next.parent) {
      break;
    }

    title.push(next.title);
    next = next.parent;
  }

  return title.reverse().join(' ');
}
