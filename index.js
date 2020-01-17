const commonInterface = require('mocha/lib/interfaces/common.js');
const expect = require('expect');
const Mocha = require('mocha');
const snapshotSupport = require('./snapshotSupport.js');
const imageSnapshotSupport = require('./imageSnapshotSupport.js');
const ImageSnapshotAccumulator = require('./ImageSnapshotAccumulator.js');
const SnapshotAccumulator = require('./SnapshotAccumulator.js');
const testContextSpy = require('./testContextSpy.js');

const { Suite, Test, interfaces } = Mocha;
/**
 * Jest Style Interface with Expect and Snapshots
 *      describe('Array', function() {
 *          test('should return -1 when not present', () => {
 *            expect(arr.indexOf('foo')).toBe(-1);
 *          });
 *
 *          it('should return the index when present', function() {
 *            // ...
 *          });
 *        });
 *      });
 *
 */
function jestInterface(suite) {
  const suites = [suite];

  suite.on('pre-require', (context, file, mocha) => {
    const common = commonInterface(suites, context, mocha);

    expect.extend({
      toMatchSnapshot: snapshotSupport.toMatchSnapshot,
      toMatchImageSnapshot: imageSnapshotSupport.toMatchImageSnapshot,
    });
    context.expect = expect;
    context.beforeAll = common.before;
    context.afterAll = common.after;
    context.beforeEach = common.beforeEach;
    context.afterEach = common.afterEach;
    context.run = mocha.options.delay && common.runWithSuite(suite);

    context.describe = (title, fn) => createSuite({
      title,
      file,
      fn,
    });
    context.describe.skip = (title, fn) => createSuite({
      title,
      file,
      fn,
      pending: true,
    });
    context.describe.only = (title, fn) => createSuite({
      title,
      file,
      fn,
      isOnly: true,
    });

    context.test = test;
    context.test.only = (title, fn) => {
      const t = test(title, fn);
      suites[0]._onlyTests = suites[0]._onlyTests.concat(t);
      return t;
    };
    context.test.skip = title => test(title);
    context.test.retries = (n) => {
      context.retries(n);
    };
    context.it = context.test;

    function test(title, fn) {
      const s = suites[0];
      if (s.isPending()) {
        fn = null;
      }
      const t = new Test(title, fn);
      t.file = file;
      s.addTest(t);
      return t;
    }

    function createSuite(opts) {
      const s = Suite.create(suites[0], opts.title);
      s.pending = Boolean(opts.pending);
      s.file = opts.file;
      suites.unshift(s);
      if (opts.isOnly) {
        if (mocha.options.forbidOnly && shouldBeTested(s)) {
          throw new Error('`.only` forbidden');
        }
        s.parent._onlySuites = s.parent._onlySuites.concat(s);
      }
      if (s.pending) {
        if (mocha.options.forbidPending && shouldBeTested(s)) {
          throw new Error('Pending test forbidden');
        }
      }
      if (typeof opts.fn === 'function') {
        wireContextCapture();
        opts.fn.call(s);
        suites.shift();
      } else if (typeof opts.fn === 'undefined' && !s.pending) {
        throw new Error(`Suite ${s.fullTitle()} was defined but no callback was supplied. Supply a callback or explicitly skip the suite.`);
      } else if (!opts.fn && s.pending) {
        suites.shift();
      }
      return s;
    }

    function wireContextCapture() {
      context.beforeAll(captureContext);
      context.beforeEach(captureContext);
      context.afterAll(captureContext);
      context.afterEach(captureContext);
    }

    function captureContext() {
      snapshotSupport.setTestContext(this);
      imageSnapshotSupport.setTestContext(this);
      testContextSpy.setTestContext(this);
    }

    function shouldBeTested(testSuite) {
      return (
        !mocha.options.grep
        || (mocha.options.grep
          && mocha.options.grep.test(testSuite.fullTitle())
          && !mocha.options.invert)
      );
    }
  });
}

module.exports = jestInterface;
interfaces.jest = jestInterface;
jestInterface.description = 'Jest style test with expect and snapshots';
jestInterface.imageSnapshotSupport = imageSnapshotSupport;
jestInterface.snapshotSupport = snapshotSupport;
jestInterface.ImageSnapshotAccumulator = ImageSnapshotAccumulator;
jestInterface.SnapshotAccumulator = SnapshotAccumulator;
jestInterface.testContextSpy = testContextSpy;
