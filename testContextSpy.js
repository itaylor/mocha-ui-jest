// Allows you to get the current running test context object from anywhere.

let context;

module.exports = {
  setTestContext,
  getTestContext,
};

function setTestContext(_context) {
  context = _context;
}

function getTestContext() {
  return context;
}
