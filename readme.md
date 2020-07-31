## mocha-ui-jest

This is an attempt to brings as much of the Jest API as possible to Mocha.

### Why not just use Jest?

Jest is great, I use it extensively for unit testing React app code.  However, when it comes to running integration tests that take image snapshots for visual regression testing, it's not so good.  The Jest API doesn't provide a way to get information about individual test cases starting or stopping (see [jest#4471](https://github.com/facebook/jest/issues/4471)).  The unit of work that jest reports on is a test file, not a single `test` (see [jest#6616](https://github.com/facebook/jest/issues/6616)).  Jest also does all kinds of strange things with stdout (see [jest#6718](https://github.com/facebook/jest/issues/6718), [jest#5918](https://github.com/facebook/jest/issues/5918)).  Also, the way Jest handles the `--bail` option makes it hard to pinpoint where an error occurred (see [jest#6527](https://github.com/facebook/jest/issues/6527)).  Jest is also moderately difficult to set up with Puppeteer.  These issues combine in making it very difficult to use Jest as an integration test runner for visual regression testing.

Mocha is vastly simpler than Jest, and doesn't have many of these issues or restrictions, but it lacks out of the box snapshot support, and I like Jest's syntax better.  So I've added them here, while mimicing Jest's API as much as possible to make migrating back to Mocha easier.

### Usage

```bash
yarn add --dev mocha-ui-jest
mocha --require mocha-ui-jest --ui jest <pathToYourTestFile.test.js>
```

Then you can write test files that work like your Jest tests:
```js
describe('some test', () => {
  test('with snapshots', () => {
    expect([{ that: 'this' }]).toMatchSnapshot();
  });
]);
```
If you want to regenerate your snapshots, use the env var `SNAPSHOT_UPDATE=true`

```bash
SNAPSHOT_UPDATE=true mocha --require mocha-ui-jest --ui jest <pathToYourTestFile.test.js>
```

### Reporter
This packages also bundles a reporter that extends the default 'spec' mocha reporter with some extra info about snapshot passes/adds/updates/failures.

To use it:
```bash
mocha --require mocha-ui-jest --ui jest --reporter=mocha-ui-jest/reporter <pathToYourTestFile.test.js>
```

You'll get extra output of end of the test run like the following if there are snapshots.
```
  Snapshots: 12 passed, 2 added, 1 updated, 3 failed
```

### Getting more information about snapshot state

If all you want is a summary at the end, there are also included accumulator classes `SnapshotAccumulator` that will listen for the events and accumlate a state that you can read by calling the `getState()` method.  You can stop the accumulator listenting for future events by calling its `destroy()` method.

```js
const { SnapshotAccumulator } = require('mocha-ui-jest');

describe('using the snapshot accumulator', () => {
  let accum;
  beforeAll(() => {
    const accum = new SnapshotAccumulator();
  });
  test('does something with snapshots', () => {
    expect(true).toMatchSnapshot();
  });
  afterAll(() => {
    const { passCount, failCount, addCount, updateCount, failures } = accum.getState();
    accum.destroy();
    // do something with the data.
    console.log(`${passCount}, ${failCount}, ${updateCount}, ${addCount}`);
    // failures contains a list of objects that look like this, one for each snapshot that failed.
    // [{ 
    //   title: 'does something with snapshots',
    //   fullTitle: 'using the snapshot accumulator does something with snapshots',
    //   file: 'relative/path/to/test.file',
    //   snapshotFile: 'relative/path/to/shapshot.file',
    // }];
  });
});
```

## What's missing
Missing support for the following jest features:
* All of jest's mocking features
* `jest.setTimeout` (you can use mocha's `this.timeout(number)` instead)
* `expect().toMatchInlineSnapshot()`;
* `expect().toThrowErrorMatchingSnapshot()`,
* `expect().toThrowErrorMatchingInlineSnapshot()`,

If someone wants to lend a hand getting those implemented, I'd be thankful!

## Changelog:
0.4.0:
  * Removes image snapshot support.  It didn't work well in the real world and was complicated.  
  * Get mocha test context from `mocha-test-context`, which is much simpler than the previous way we got test context 

## License: MIT

