module.exports = {
  shouldUpdateSnapshots,
};

function shouldUpdateSnapshots() {
  return process.env.SNAPSHOT_UPDATE === true || process.env.SNAPSHOT_UPDATE === 'true';
}
