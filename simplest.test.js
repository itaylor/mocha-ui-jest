describe('simplest test', () => {
  test('expect works', () => {
    expect(true).toBe(true);
    expect([{ that: 'this' }]).toMatchSnapshot();
  });

  test('multiple snapshots in one test work', () => {
    expect({ foo: 'bar' }).toMatchSnapshot();
    expect({ bar: 'foo' }).toMatchSnapshot();
  });
});
