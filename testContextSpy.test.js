const { relative } = require('path');
const { testContextSpy } = require('./index.js');

describe('testContextSpy', () => {
  beforeEach(() => {
    expect(simplifiedContext(testContextSpy.getTestContext())).toEqual({
      file: 'testContextSpy.test.js',
      fullTitle: 'testContextSpy "before each" hook',
      title: '"before each" hook',
    });
  });
  afterEach(() => {
    expect(simplifiedContext(testContextSpy.getTestContext())).toEqual({
      file: 'testContextSpy.test.js',
      fullTitle: 'testContextSpy "after each" hook',
      title: '"after each" hook',
    });
  });
  test('getTestContext gets current test', () => {
    expect(simplifiedContext(testContextSpy.getTestContext())).toEqual({
      file: 'testContextSpy.test.js',
      fullTitle: 'testContextSpy getTestContext gets current test',
      title: 'getTestContext gets current test',
    });
  });
});

function simplifiedContext(currentContext) {
  return {
    title: currentContext.test.title,
    fullTitle: currentContext.test.fullTitle(),
    file: relative(process.cwd(), currentContext.test.file),
  };
}
