const commonInterface = require('mocha/lib/interfaces/common.js');
const expect = require('expect');
const Mocha = require('mocha');
const { toMatchSnapshot, newSnapshotContext, toMatchImageSnapshot } = require('./snapshotSupport.js');

console.log(Mocha);
const { Suite, Test, interfaces } = Mocha;

/**
 * Jest Style Interface with Expect and Snapshots
 *      describe('Array', function() {
 *          test('should return -1 when not present', function() {
 *            // ...
 *          });
 *
 *          it('should return the index when present', function() {
 *            // ...
 *          });
 *        });
 *      });
 *
 * @param {Suite} suite Root suite.
 */
function jestInterface(suite) {
  const suites = [suite];

  suite.on('pre-require', (context, file, mocha) => {
    const common = commonInterface(suites, context, mocha);

    expect.extend({
      toMatchSnapshot,
      toMatchImageSnapshot,
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
      test.parent._onlyTests = test.parent._onlyTests.concat(t);
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
      const suite = Suite.create(suites[0], opts.title);
      suite.pending = Boolean(opts.pending);
      suite.file = opts.file;
      suites.unshift(suite);
      if (opts.isOnly) {
        if (mocha.options.forbidOnly && shouldBeTested(suite)) {
          throw new Error('`.only` forbidden');
        }
        suite.parent._onlySuites = suite.parent._onlySuites.concat(suite);
      }
      if (suite.pending) {
        if (mocha.options.forbidPending && shouldBeTested(suite)) {
          throw new Error('Pending test forbidden');
        }
      }
      if (typeof opts.fn === 'function') {
        wireContextCapture();
        opts.fn.call(suite);
        suites.shift();
      } else if (typeof opts.fn === 'undefined' && !suite.pending) {
        throw new Error(`Suite ${suite.fullTitle()} was defined but no callback was supplied. Supply a callback or explicitly skip the suite.`);
      } else if (!opts.fn && suite.pending) {
        suites.shift();
      }
      return suite;
    }

    function wireContextCapture() {
      context.beforeAll(captureContext);
      context.beforeEach(captureContext);
      context.afterAll(captureContext);
      context.afterEach(captureContext);
    }

    function captureContext() {
      newSnapshotContext(this);
    }

    function shouldBeTested(testSuite) {
      return (
        !mocha.options.grep ||
        (mocha.options.grep &&
          mocha.options.grep.test(testSuite.fullTitle()) &&
          !mocha.options.invert)
      );
    }
  });
};

module.exports = jestInterface;
interfaces['jest'] = jestInterface;

module.exports.description = 'Jest style test with expect and snapshots';
