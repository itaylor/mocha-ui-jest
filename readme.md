## mocha-ui-jest

This is an attempt to brings as much of the Jest API as possible to Mocha.

### Why not just use Jest?

Jest is great, I use it extensively for unit testing React app code.  However, when it comes to running integration tests that take image snapshots for visual regression testing, it's not so good.  The Jest API doesn't provide a way to get information about individual test cases starting or stopping (see [#4471](https://github.com/facebook/jest/issues/4471)).  The unit of work that jest reports on is a test file, not a single `test` (see [#6616](https://github.com/facebook/jest/issues/6616)]).  Jest also does all kinds of strange things with stdout (see [#6718](https://github.com/facebook/jest/issues/6718), [#5918](https://github.com/facebook/jest/issues/5918)).  Also, the way Jest handles the `--bail` option makes it hard to pinpoint where an error occurred see ([jest#6527](https://github.com/facebook/jest/issues/6527)).  Jest is also moderately difficult to set up with Puppeteer.  These issues combine in making it very difficult to use Jest as an integration test runner.

Mocha is vastly simpler than Jest, and doesn't have many of these issues or restrictions, but it lacks out of the box snapshot support, and it also doesn't have the equivalent of `jest-image-snapshot`'s `toMatchImageSnapshot`.   So I've added them here, while mimicing Jest's API as much as possible to make migrating back to Mocha easier.

### Usage

```bash
yarn add --dev mocha-ui-jest
mocha --require mocha-ui-jest --ui jest <pathToYourTestFile.test.js>
```

Then you can write test files work like your Jest tests:
```js
describe('some test', () => {
  test('with snapshots', () => {
    expect([{ that: 'this' }]).toMatchSnapshot();
  });
```

### Image Snapshot Support

This Mocha UI also includes support for making image snapshots

```js
describe('some test', () => {
  test('with image snapshots', () => {
    test('multiple image assertions work', () => {
    const buf1 = require('fs').readFileSync(`${__dirname}/fixtures/test-1.png`);
    expect(buf1).toMatchImageSnapshot();
  });
```

### Allowing snapshot failures to not cause test failures
For visual regression testing, it can be desirable to essentially treat image snapshot failures as a warnings instead of a failures and capture the diff files to put them into some other system.

To do that, you can use `setImageSnapshotConfig`.

```js
const { imageSnapshotSupport } = require('mocha-ui-jest')
const { emitter, events, setImageSnapshotConfig } = imageSnapshotSupport;

describe('image snapshot config', () => { 
  beforeAll(() => {
    setImageSnapshotConfig({ imageFailuresThrow: false });
    // you can listen for image snapshot events and log them how you'd like.
    emitter.on(events.IMAGE_SNAPSHOT_FAIL, (testContext) => {
      console.warn('Image snapshot failed!, check the diff: ' + testContext.diffOutputPath );
    })
  });
  test('this would normally fail, but will now just warn', () => {
    expect(someRandomImage()).toMatchImageSnapshot();
  });
})

```
## What's missing
This is still using `expect` 1.20.x and doesn't yet have support for jest's mocking features.  I'd also like to add a custom reporter that reports snapshot add

## License: MIT
