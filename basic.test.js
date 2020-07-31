describe('basic test', () => {
  test('expect works', () => {
    expect(true).toBe(true);
    expect(1).toBe(1);
    expect(1).not.toBe(2);
    expect([{ that: 'this' }]).toMatchSnapshot();
  });

  test('multiple snapshots in one test work', () => {
    expect({ foo: 'bar' }).toMatchSnapshot();
    expect({ bar: 'foo' }).toMatchSnapshot();
  });

  test('async tests with snapshots work', async () => {
    expect({ before: 'sleep' }).toMatchSnapshot();
    await sleep(10);
    expect({ after: 'sleep' }).toMatchSnapshot();
  });

  test('Mismatched Snapshots throw', async () => {
    expect(() => {
      expect({ rando: Math.random() }).toMatchSnapshot();
    }).toThrow();
  });

  test('not.toMatchSnapshot()', async () => {
    expect({ rando: Math.random() }).not.toMatchSnapshot();
  });

  test('Snapshot assertions work when using expect.any to ignore certain properties', () => {
    const obj = {
      cool: 'string',
      random: Math.random(),
    };
    expect(obj).toMatchSnapshot({
      random: expect.any(Number),
    });

    obj.random = 'Now a string';
    expect(() => {
      expect(obj).toMatchSnapshot({
        random: expect.any(Number),
      });
    }).toThrow(/Now a string/);
  });
});

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
