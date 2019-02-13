module.exports = {
  buildTestContext,
  shouldUpdateSnapshots,
};

function buildTestContext(context) {
  const r = context.currentTest || context.test || context._runnable;
  const fullTitle = makeTestTitle(r);
  return {
    file: r.file,
    title: r.title,
    fullTitle,
  };
}

function shouldUpdateSnapshots() {
  return process.env.SNAPSHOT_UPDATE === true || process.env.SNAPSHOT_UPDATE === 'true';
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
