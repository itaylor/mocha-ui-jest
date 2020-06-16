declare function MochaUiJest(suite: any): void;

declare module 'mocha-ui-jest' {
  export = MochaUiJest;
}

declare const expect: MochaUiJest.Expect;
declare var beforeAll: MochaUiJest.Lifecycle;
declare var beforeEach: MochaUiJest.Lifecycle;
declare var afterAll: MochaUiJest.Lifecycle;
declare var afterEach: MochaUiJest.Lifecycle;
declare var describe: MochaUiJest.Describe;
declare var fdescribe: MochaUiJest.Describe;
declare var xdescribe: MochaUiJest.Describe;
declare var it: MochaUiJest.It;
declare var fit: MochaUiJest.It;
declare var xit: MochaUiJest.It;
declare var test: MochaUiJest.It;
declare var xtest: MochaUiJest.It;

declare namespace MochaUiJest {

  interface DoneCallback {
      (...args: any[]): any;
      fail(error?: string | { message: string }): any;
  }

  type ProvidesCallback = (cb: DoneCallback) => any;

  type Lifecycle = (fn: ProvidesCallback, timeout?: number) => any;

  type PrintLabel = (string: string) => string;

  type MatcherHintColor = (arg: string) => string;
  
  type EmptyFunction = () => void;

  interface FunctionLike {
    readonly name: string;
}

// interface Each {
//     // Exclusively arrays.
//     <T extends any[] | [any]>(cases: ReadonlyArray<T>): (name: string, fn: (...args: T) => any, timeout?: number) => void;
//     <T extends ReadonlyArray<any>>(cases: ReadonlyArray<T>): (name: string, fn: (...args: ExtractEachCallbackArgs<T>) => any, timeout?: number) => void;
//     // Not arrays.
//     <T>(cases: ReadonlyArray<T>): (name: string, fn: (...args: T[]) => any, timeout?: number) => void;
//     (cases: ReadonlyArray<ReadonlyArray<any>>): (
//         name: string,
//         fn: (...args: any[]) => any,
//         timeout?: number
//     ) => void;
//     (strings: TemplateStringsArray, ...placeholders: any[]): (
//         name: string,
//         fn: (arg: any) => any,
//         timeout?: number
//     ) => void;
// }

// /**
//  * Creates a test closure
//  */
// interface It {
//     /**
//      * Creates a test closure.
//      *
//      * @param name The name of your test
//      * @param fn The function for your test
//      * @param timeout The timeout for an async function test
//      */
//     (name: string, fn?: ProvidesCallback, timeout?: number): void;
//     /**
//      * Only runs this test in the current file.
//      */
//     only: It;
//     /**
//      * Skips running this test in the current file.
//      */
//     skip: It;
//     /**
//      * Sketch out which tests to write in the future.
//      */
//     todo: It;
//     /**
//      * Experimental and should be avoided.
//      */
//     concurrent: It;
//     /**
//      * Use if you keep duplicating the same test with different data. `.each` allows you to write the
//      * test once and pass data in.
//      *
//      * `.each` is available with two APIs:
//      *
//      * #### 1  `test.each(table)(name, fn)`
//      *
//      * - `table`: Array of Arrays with the arguments that are passed into the test fn for each row.
//      * - `name`: String the title of the test block.
//      * - `fn`: Function the test to be ran, this is the function that will receive the parameters in each row as function arguments.
//      *
//      *
//      * #### 2  `test.each table(name, fn)`
//      *
//      * - `table`: Tagged Template Literal
//      * - `name`: String the title of the test, use `$variable` to inject test data into the test title from the tagged template expressions.
//      * - `fn`: Function the test to be ran, this is the function that will receive the test data object..
//      *
//      * @example
//      *
//      * // API 1
//      * test.each([[1, 1, 2], [1, 2, 3], [2, 1, 3]])(
//      *   '.add(%i, %i)',
//      *   (a, b, expected) => {
//      *     expect(a + b).toBe(expected);
//      *   },
//      * );
//      *
//      * // API 2
//      * test.each`
//      * a    | b    | expected
//      * ${1} | ${1} | ${2}
//      * ${1} | ${2} | ${3}
//      * ${2} | ${1} | ${3}
//      * `('returns $expected when $a is added $b', ({a, b, expected}) => {
//      *    expect(a + b).toBe(expected);
//      * });
//      *
//      */
//     each: Each;
// }

  interface Describe {
      // tslint:disable-next-line ban-types
      (name: number | string | Function | FunctionLike, fn: EmptyFunction): void;
      /** Only runs the tests inside this `describe` for the current file */
      only: Describe;
      /** Skips running the tests inside this `describe` for the current file */
      skip: Describe;
    // each: Each;
  }

      /**
     * Creates a test closure
     */
    interface It {
      /**
       * Creates a test closure.
       *
       * @param name The name of your test
       * @param fn The function for your test
       * @param timeout The timeout for an async function test
       */
      (name: string, fn?: ProvidesCallback, timeout?: number): void;
      /**
       * Only runs this test in the current file.
       */
      only: It;
      /**
       * Skips running this test in the current file.
       */
      skip: It;
      /**
       * Sketch out which tests to write in the future.
       */
      todo: It;
      /**
       * Experimental and should be avoided.
       */
      concurrent: It;
      /**
       * Use if you keep duplicating the same test with different data. `.each` allows you to write the
       * test once and pass data in.
       *
       * `.each` is available with two APIs:
       *
       * #### 1  `test.each(table)(name, fn)`
       *
       * - `table`: Array of Arrays with the arguments that are passed into the test fn for each row.
       * - `name`: String the title of the test block.
       * - `fn`: Function the test to be ran, this is the function that will receive the parameters in each row as function arguments.
       *
       *
       * #### 2  `test.each table(name, fn)`
       *
       * - `table`: Tagged Template Literal
       * - `name`: String the title of the test, use `$variable` to inject test data into the test title from the tagged template expressions.
       * - `fn`: Function the test to be ran, this is the function that will receive the test data object..
       *
       * @example
       *
       * // API 1
       * test.each([[1, 1, 2], [1, 2, 3], [2, 1, 3]])(
       *   '.add(%i, %i)',
       *   (a, b, expected) => {
       *     expect(a + b).toBe(expected);
       *   },
       * );
       *
       * // API 2
       * test.each`
       * a    | b    | expected
       * ${1} | ${1} | ${2}
       * ${1} | ${2} | ${3}
       * ${2} | ${1} | ${3}
       * `('returns $expected when $a is added $b', ({a, b, expected}) => {
       *    expect(a + b).toBe(expected);
       * });
       *
       */
    //  each: Each;
  }


  interface MatcherHintOptions {
      comment?: string;
      expectedColor?: MatcherHintColor;
      isDirectExpectCall?: boolean;
      isNot?: boolean;
      promise?: string;
      receivedColor?: MatcherHintColor;
      secondArgument?: string;
      secondArgumentColor?: MatcherHintColor;
  }

  interface ChalkFunction {
      (text: TemplateStringsArray, ...placeholders: any[]): string;
      (...text: any[]): string;
  }

  interface ChalkColorSupport {
      level: 0 | 1 | 2 | 3;
      hasBasic: boolean;
      has256: boolean;
      has16m: boolean;
  }

  type MatcherColorFn = ChalkFunction & { supportsColor: ChalkColorSupport };

  type EqualityTester = (a: any, b: any) => boolean | undefined;

  interface MatcherUtils {
      readonly isNot: boolean;
      readonly dontThrow: () => void;
      readonly promise: string;
      readonly assertionCalls: number;
      readonly expectedAssertionsNumber: number | null;
      readonly isExpectingAssertions: boolean;
      readonly suppressedErrors: any[];
      readonly expand: boolean;
      readonly testPath: string;
      readonly currentTestName: string;
      utils: {
          readonly EXPECTED_COLOR: MatcherColorFn;
          readonly RECEIVED_COLOR: MatcherColorFn;
          readonly INVERTED_COLOR: MatcherColorFn;
          readonly BOLD_WEIGHT: MatcherColorFn;
          readonly DIM_COLOR: MatcherColorFn;
          readonly SUGGEST_TO_CONTAIN_EQUAL: string;
          diff(a: any, b: any, options?: DiffOptions): string | null;
          ensureActualIsNumber(actual: any, matcherName: string, options?: MatcherHintOptions): void;
          ensureExpectedIsNumber(actual: any, matcherName: string, options?: MatcherHintOptions): void;
          ensureNoExpected(actual: any, matcherName: string, options?: MatcherHintOptions): void;
          ensureNumbers(actual: any, expected: any, matcherName: string, options?: MatcherHintOptions): void;
          ensureExpectedIsNonNegativeInteger(expected: any, matcherName: string, options?: MatcherHintOptions): void;
          matcherHint(
              matcherName: string,
              received?: string,
              expected?: string,
              options?: MatcherHintOptions
          ): string;
          matcherErrorMessage(
            hint: string,
            generic: string,
            specific: string
          ): string;
          pluralize(word: string, count: number): string;
          printReceived(object: any): string;
          printExpected(value: any): string;
          printWithType(name: string, value: any, print: (value: any) => string): string;
          stringify(object: {}, maxDepth?: number): string;
          highlightTrailingWhitespace(text: string): string;

          printDiffOrStringify(expected: any, received: any, expectedLabel: string, receivedLabel: string, expand: boolean): string;

          getLabelPrinter(...strings: string[]): PrintLabel;

          iterableEquality: EqualityTester;
          subsetEquality: EqualityTester;
      };
      /**
       *  This is a deep-equality function that will return true if two objects have the same values (recursively).
       */
      equals(a: any, b: any, customTesters?: EqualityTester[], strictCheck?: boolean): boolean;
      [other: string]: any;
  }

  interface ExpectExtendMap {
      [key: string]: CustomMatcher;
  }

  type MatcherContext = MatcherUtils & Readonly<MatcherState>;
  type CustomMatcher = (
      this: MatcherContext,
      received: any,
      ...actual: any[]
  ) => CustomMatcherResult | Promise<CustomMatcherResult>;

  interface CustomMatcherResult {
      pass: boolean;
      message: () => string;
  }

  interface SnapshotSerializerOptions {
      callToJSON?: boolean;
      edgeSpacing?: string;
      spacing?: string;
      escapeRegex?: boolean;
      highlight?: boolean;
      indent?: number;
      maxDepth?: number;
      min?: boolean;
      plugins?: SnapshotSerializerPlugin[];
      printFunctionName?: boolean;
      theme?: SnapshotSerializerOptionsTheme;

      // see https://github.com/facebook/jest/blob/e56103cf142d2e87542ddfb6bd892bcee262c0e6/types/PrettyFormat.js
  }
  interface SnapshotSerializerOptionsTheme {
      comment?: string;
      content?: string;
      prop?: string;
      tag?: string;
      value?: string;
  }
  interface SnapshotSerializerColor {
      close: string;
      open: string;
  }
  interface SnapshotSerializerColors {
      comment: SnapshotSerializerColor;
      content: SnapshotSerializerColor;
      prop: SnapshotSerializerColor;
      tag: SnapshotSerializerColor;
      value: SnapshotSerializerColor;
  }
  interface SnapshotSerializerPlugin {
      print(
          val: any,
          serialize: (val: any) => string,
          indent: (str: string) => string,
          opts: SnapshotSerializerOptions,
          colors: SnapshotSerializerColors
      ): string;
      test(val: any): boolean;
  }

  interface InverseAsymmetricMatchers {
      /**
       * `expect.not.arrayContaining(array)` matches a received array which
       * does not contain all of the elements in the expected array. That is,
       * the expected array is not a subset of the received array. It is the
       * inverse of `expect.arrayContaining`.
       *
       * Optionally, you can provide a type for the elements via a generic.
       */
      arrayContaining<E = any>(arr: E[]): any;
      /**
       * `expect.not.objectContaining(object)` matches any received object
       * that does not recursively match the expected properties. That is, the
       * expected object is not a subset of the received object. Therefore,
       * it matches a received object which contains properties that are not
       * in the expected object. It is the inverse of `expect.objectContaining`.
       *
       * Optionally, you can provide a type for the object via a generic.
       * This ensures that the object contains the desired structure.
       */
      objectContaining<E = {}>(obj: E): any;
      /**
       * `expect.not.stringMatching(string | regexp)` matches the received
       * string that does not match the expected regexp. It is the inverse of
       * `expect.stringMatching`.
       */
      stringMatching(str: string | RegExp): any;
      /**
       * `expect.not.stringContaining(string)` matches the received string
       * that does not contain the exact expected string. It is the inverse of
       * `expect.stringContaining`.
       */
      stringContaining(str: string): any;
  }
  interface MatcherState {
      assertionCalls: number;
      currentTestName: string;
      expand: boolean;
      expectedAssertionsNumber: number;
      isExpectingAssertions?: boolean;
      suppressedErrors: Error[];
      testPath: string;
  }
  /**
   * The `expect` function is used every time you want to test a value.
   * You will rarely call `expect` by itself.
   */
  interface Expect {
      /**
       * The `expect` function is used every time you want to test a value.
       * You will rarely call `expect` by itself.
       *
       * @param actual The value to apply matchers against.
       */
      <T = any>(actual: T): JestMatchers<T>;
      /**
       * Matches anything but null or undefined. You can use it inside `toEqual` or `toBeCalledWith` instead
       * of a literal value. For example, if you want to check that a mock function is called with a
       * non-null argument:
       *
       * @example
       *
       * test('map calls its argument with a non-null argument', () => {
       *   const mock = jest.fn();
       *   [1].map(x => mock(x));
       *   expect(mock).toBeCalledWith(expect.anything());
       * });
       *
       */
      anything(): any;
      /**
       * Matches anything that was created with the given constructor.
       * You can use it inside `toEqual` or `toBeCalledWith` instead of a literal value.
       *
       * @example
       *
       * function randocall(fn) {
       *   return fn(Math.floor(Math.random() * 6 + 1));
       * }
       *
       * test('randocall calls its callback with a number', () => {
       *   const mock = jest.fn();
       *   randocall(mock);
       *   expect(mock).toBeCalledWith(expect.any(Number));
       * });
       */
      any(classType: any): any;
      /**
       * Matches any array made up entirely of elements in the provided array.
       * You can use it inside `toEqual` or `toBeCalledWith` instead of a literal value.
       *
       * Optionally, you can provide a type for the elements via a generic.
       */
      arrayContaining<E = any>(arr: E[]): any;
      /**
       * Verifies that a certain number of assertions are called during a test.
       * This is often useful when testing asynchronous code, in order to
       * make sure that assertions in a callback actually got called.
       */
      assertions(num: number): void;
      /**
       * Verifies that at least one assertion is called during a test.
       * This is often useful when testing asynchronous code, in order to
       * make sure that assertions in a callback actually got called.
       */
      hasAssertions(): void;
      /**
       * You can use `expect.extend` to add your own matchers to Jest.
       */
      extend(obj: ExpectExtendMap): void;
      /**
       * Adds a module to format application-specific data structures for serialization.
       */
      addSnapshotSerializer(serializer: SnapshotSerializerPlugin): void;
      /**
       * Matches any object that recursively matches the provided keys.
       * This is often handy in conjunction with other asymmetric matchers.
       *
       * Optionally, you can provide a type for the object via a generic.
       * This ensures that the object contains the desired structure.
       */
      objectContaining<E = {}>(obj: E): any;
      /**
       * Matches any string that contains the exact provided string
       */
      stringMatching(str: string | RegExp): any;
      /**
       * Matches any received string that contains the exact expected string
       */
      stringContaining(str: string): any;

      not: InverseAsymmetricMatchers;

      setState(state: object): void;
      getState(): MatcherState & Record<string, any>;
  }

  type JestMatchers<T> = JestMatchersShape<Matchers<void, T>, Matchers<Promise<void>, T>>;

  type JestMatchersShape<TNonPromise extends {} = {}, TPromise extends {} = {}> = {
      /**
       * Use resolves to unwrap the value of a fulfilled promise so any other
       * matcher can be chained. If the promise is rejected the assertion fails.
       */
      resolves: AndNot<TPromise>,
      /**
       * Unwraps the reason of a rejected promise so any other matcher can be chained.
       * If the promise is fulfilled the assertion fails.
       */
      rejects: AndNot<TPromise>
  } & AndNot<TNonPromise>;
  type AndNot<T> = T & {
      not: T
  };
  // should be R extends void|Promise<void> but getting dtslint error
  interface Matchers<R, T = {}> {
      /**
       * Ensures the last call to a mock function was provided specific args.
       *
       * Optionally, you can provide a type for the expected arguments via a generic.
       * Note that the type must be either an array or a tuple.
       */
      lastCalledWith<E extends any[]>(...args: E): R;
      /**
       * Ensure that the last call to a mock function has returned a specified value.
       *
       * Optionally, you can provide a type for the expected value via a generic.
       * This is particuarly useful for ensuring expected objects have the right structure.
       */
      lastReturnedWith<E = any>(value: E): R;
      /**
       * Ensure that a mock function is called with specific arguments on an Nth call.
       *
       * Optionally, you can provide a type for the expected arguments via a generic.
       * Note that the type must be either an array or a tuple.
       */
      nthCalledWith<E extends any[]>(nthCall: number, ...params: E): R;
      /**
       * Ensure that the nth call to a mock function has returned a specified value.
       *
       * Optionally, you can provide a type for the expected value via a generic.
       * This is particuarly useful for ensuring expected objects have the right structure.
       */
      nthReturnedWith<E = any>(n: number, value: E): R;
      /**
       * Checks that a value is what you expect. It uses `Object.is` to check strict equality.
       * Don't use `toBe` with floating-point numbers.
       *
       * Optionally, you can provide a type for the expected value via a generic.
       * This is particuarly useful for ensuring expected objects have the right structure.
       */
      toBe<E = any>(expected: E): R;
      /**
       * Ensures that a mock function is called.
       */
      toBeCalled(): R;
      /**
       * Ensures that a mock function is called an exact number of times.
       */
      toBeCalledTimes(expected: number): R;
      /**
       * Ensure that a mock function is called with specific arguments.
       *
       * Optionally, you can provide a type for the expected arguments via a generic.
       * Note that the type must be either an array or a tuple.
       */
      toBeCalledWith<E extends any[]>(...args: E): R;
      /**
       * Using exact equality with floating point numbers is a bad idea.
       * Rounding means that intuitive things fail.
       * The default for numDigits is 2.
       */
      toBeCloseTo(expected: number, numDigits?: number): R;
      /**
       * Ensure that a variable is not undefined.
       */
      toBeDefined(): R;
      /**
       * When you don't care what a value is, you just want to
       * ensure a value is false in a boolean context.
       */
      toBeFalsy(): R;
      /**
       * For comparing floating point numbers.
       */
      toBeGreaterThan(expected: number): R;
      /**
       * For comparing floating point numbers.
       */
      toBeGreaterThanOrEqual(expected: number): R;
      /**
       * Ensure that an object is an instance of a class.
       * This matcher uses `instanceof` underneath.
       *
       * Optionally, you can provide a type for the expected value via a generic.
       * This is particuarly useful for ensuring expected objects have the right structure.
       */
      toBeInstanceOf<E = any>(expected: E): R;
      /**
       * For comparing floating point numbers.
       */
      toBeLessThan(expected: number): R;
      /**
       * For comparing floating point numbers.
       */
      toBeLessThanOrEqual(expected: number): R;
      /**
       * This is the same as `.toBe(null)` but the error messages are a bit nicer.
       * So use `.toBeNull()` when you want to check that something is null.
       */
      toBeNull(): R;
      /**
       * Use when you don't care what a value is, you just want to ensure a value
       * is true in a boolean context. In JavaScript, there are six falsy values:
       * `false`, `0`, `''`, `null`, `undefined`, and `NaN`. Everything else is truthy.
       */
      toBeTruthy(): R;
      /**
       * Used to check that a variable is undefined.
       */
      toBeUndefined(): R;
      /**
       * Used to check that a variable is NaN.
       */
      toBeNaN(): R;
      /**
       * Used when you want to check that an item is in a list.
       * For testing the items in the list, this uses `===`, a strict equality check.
       *
       * Optionally, you can provide a type for the expected value via a generic.
       * This is particuarly useful for ensuring expected objects have the right structure.
       */
      toContain<E = any>(expected: E): R;
      /**
       * Used when you want to check that an item is in a list.
       * For testing the items in the list, this matcher recursively checks the
       * equality of all fields, rather than checking for object identity.
       *
       * Optionally, you can provide a type for the expected value via a generic.
       * This is particuarly useful for ensuring expected objects have the right structure.
       */
      toContainEqual<E = any>(expected: E): R;
      /**
       * Used when you want to check that two objects have the same value.
       * This matcher recursively checks the equality of all fields, rather than checking for object identity.
       *
       * Optionally, you can provide a type for the expected value via a generic.
       * This is particuarly useful for ensuring expected objects have the right structure.
       */
      toEqual<E = any>(expected: E): R;
      /**
       * Ensures that a mock function is called.
       */
      toHaveBeenCalled(): R;
      /**
       * Ensures that a mock function is called an exact number of times.
       */
      toHaveBeenCalledTimes(expected: number): R;
      /**
       * Ensure that a mock function is called with specific arguments.
       *
       * Optionally, you can provide a type for the expected arguments via a generic.
       * Note that the type must be either an array or a tuple.
       */
      toHaveBeenCalledWith<E extends any[]>(...params: E): R;
      /**
       * Ensure that a mock function is called with specific arguments on an Nth call.
       *
       * Optionally, you can provide a type for the expected arguments via a generic.
       * Note that the type must be either an array or a tuple.
       */
      toHaveBeenNthCalledWith<E extends any[]>(nthCall: number, ...params: E): R;
      /**
       * If you have a mock function, you can use `.toHaveBeenLastCalledWith`
       * to test what arguments it was last called with.
       *
       * Optionally, you can provide a type for the expected arguments via a generic.
       * Note that the type must be either an array or a tuple.
       */
      toHaveBeenLastCalledWith<E extends any[]>(...params: E): R;
      /**
       * Use to test the specific value that a mock function last returned.
       * If the last call to the mock function threw an error, then this matcher will fail
       * no matter what value you provided as the expected return value.
       *
       * Optionally, you can provide a type for the expected value via a generic.
       * This is particuarly useful for ensuring expected objects have the right structure.
       */
      toHaveLastReturnedWith<E = any>(expected: E): R;
      /**
       * Used to check that an object has a `.length` property
       * and it is set to a certain numeric value.
       */
      toHaveLength(expected: number): R;
      /**
       * Use to test the specific value that a mock function returned for the nth call.
       * If the nth call to the mock function threw an error, then this matcher will fail
       * no matter what value you provided as the expected return value.
       *
       * Optionally, you can provide a type for the expected value via a generic.
       * This is particuarly useful for ensuring expected objects have the right structure.
       */
      toHaveNthReturnedWith<E = any>(nthCall: number, expected: E): R;
      /**
       * Use to check if property at provided reference keyPath exists for an object.
       * For checking deeply nested properties in an object you may use dot notation or an array containing
       * the keyPath for deep references.
       *
       * Optionally, you can provide a value to check if it's equal to the value present at keyPath
       * on the target object. This matcher uses 'deep equality' (like `toEqual()`) and recursively checks
       * the equality of all fields.
       *
       * @example
       *
       * expect(houseForSale).toHaveProperty('kitchen.area', 20);
       */
      toHaveProperty<E = any>(propertyPath: string | any[], value?: E): R;
      /**
       * Use to test that the mock function successfully returned (i.e., did not throw an error) at least one time
       */
      toHaveReturned(): R;
      /**
       * Use to ensure that a mock function returned successfully (i.e., did not throw an error) an exact number of times.
       * Any calls to the mock function that throw an error are not counted toward the number of times the function returned.
       */
      toHaveReturnedTimes(expected: number): R;
      /**
       * Use to ensure that a mock function returned a specific value.
       *
       * Optionally, you can provide a type for the expected value via a generic.
       * This is particuarly useful for ensuring expected objects have the right structure.
       */
      toHaveReturnedWith<E = any>(expected: E): R;
      /**
       * Check that a string matches a regular expression.
       */
      toMatch(expected: string | RegExp): R;
      /**
       * Used to check that a JavaScript object matches a subset of the properties of an object
       *
       * Optionally, you can provide an object to use as Generic type for the expected value.
       * This ensures that the matching object matches the structure of the provided object-like type.
       *
       * @example
       *
       * type House = {
       *   bath: boolean;
       *   bedrooms: number;
       *   kitchen: {
       *     amenities: string[];
       *     area: number;
       *     wallColor: string;
       *   }
       * };
       *
       * expect(desiredHouse).toMatchObject<House>(...standardHouse, kitchen: {area: 20}) // wherein standardHouse is some base object of type House
       */
      toMatchObject<E extends {} | any[]>(expected: E): R;
      /**
       * This ensures that a value matches the most recent snapshot with property matchers.
       * Check out [the Snapshot Testing guide](http://facebook.github.io/jest/docs/snapshot-testing.html) for more information.
       */
      toMatchSnapshot<U extends { [P in keyof T]: any }>(propertyMatchers: Partial<U>, snapshotName?: string): R;
      /**
       * This ensures that a value matches the most recent snapshot.
       * Check out [the Snapshot Testing guide](http://facebook.github.io/jest/docs/snapshot-testing.html) for more information.
       */
      toMatchSnapshot(snapshotName?: string): R;
      /**
       * This ensures that a value matches the most recent snapshot with property matchers.
       * Instead of writing the snapshot value to a .snap file, it will be written into the source code automatically.
       * Check out [the Snapshot Testing guide](http://facebook.github.io/jest/docs/snapshot-testing.html) for more information.
       */
      toMatchInlineSnapshot<U extends { [P in keyof T]: any }>(propertyMatchers: Partial<U>, snapshot?: string): R;
      /**
       * This ensures that a value matches the most recent snapshot with property matchers.
       * Instead of writing the snapshot value to a .snap file, it will be written into the source code automatically.
       * Check out [the Snapshot Testing guide](http://facebook.github.io/jest/docs/snapshot-testing.html) for more information.
       */
      toMatchInlineSnapshot(snapshot?: string): R;
      /**
       * Ensure that a mock function has returned (as opposed to thrown) at least once.
       */
      toReturn(): R;
      /**
       * Ensure that a mock function has returned (as opposed to thrown) a specified number of times.
       */
      toReturnTimes(count: number): R;
      /**
       * Ensure that a mock function has returned a specified value at least once.
       *
       * Optionally, you can provide a type for the expected value via a generic.
       * This is particuarly useful for ensuring expected objects have the right structure.
       */
      toReturnWith<E = any>(value: E): R;
      /**
       * Use to test that objects have the same types as well as structure.
       *
       * Optionally, you can provide a type for the expected value via a generic.
       * This is particuarly useful for ensuring expected objects have the right structure.
       */
      toStrictEqual<E = any>(expected: E): R;
      /**
       * Used to test that a function throws when it is called.
       */
      toThrow(error?: string | Constructable | RegExp | Error): R;
      /**
       * If you want to test that a specific error is thrown inside a function.
       */
      toThrowError(error?: string | Constructable | RegExp | Error): R;
      /**
       * Used to test that a function throws a error matching the most recent snapshot when it is called.
       */
      toThrowErrorMatchingSnapshot(): R;
      /**
       * Used to test that a function throws a error matching the most recent snapshot when it is called.
       * Instead of writing the snapshot value to a .snap file, it will be written into the source code automatically.
       */
      toThrowErrorMatchingInlineSnapshot(snapshot?: string): R;
  }

  type RemoveFirstFromTuple<T extends any[]> =
  T['length'] extends 0 ? [] :
      (((...b: T) => void) extends (a: any, ...b: infer I) => void ? I : []);

  type Parameters<T extends (...args: any[]) => any> = T extends (...args: infer P) => any ? P : never;

  interface AsymmetricMatcher {
      asymmetricMatch(other: unknown): boolean;
  }
  type NonAsyncMatchers<TMatchers extends ExpectExtendMap> = {
      [K in keyof TMatchers]: ReturnType<TMatchers[K]> extends Promise<CustomMatcherResult>? never: K
  }[keyof TMatchers];
  type CustomAsyncMatchers<TMatchers extends ExpectExtendMap> = {[K in NonAsyncMatchers<TMatchers>]: CustomAsymmetricMatcher<TMatchers[K]>};
  type CustomAsymmetricMatcher<TMatcher extends (...args: any[]) => any> = (...args: RemoveFirstFromTuple<Parameters<TMatcher>>) => AsymmetricMatcher;

  // should be TMatcherReturn extends void|Promise<void> but getting dtslint error
  type CustomJestMatcher<TMatcher extends (...args: any[]) => any, TMatcherReturn> = (...args: RemoveFirstFromTuple<Parameters<TMatcher>>) => TMatcherReturn;

  type ExpectProperties= {
      [K in keyof Expect]: Expect[K]
  };
  // should be TMatcherReturn extends void|Promise<void> but getting dtslint error
  // Use the `void` type for return types only. Otherwise, use `undefined`. See: https://github.com/Microsoft/dtslint/blob/master/docs/void-return.md
  // have added issue https://github.com/microsoft/dtslint/issues/256 - Cannot have type union containing void ( to be used as return type only
  type ExtendedMatchers<TMatchers extends ExpectExtendMap, TMatcherReturn, TActual> = Matchers<TMatcherReturn, TActual> & {[K in keyof TMatchers]: CustomJestMatcher<TMatchers[K], TMatcherReturn>};
  type JestExtendedMatchers<TMatchers extends ExpectExtendMap, TActual> = JestMatchersShape<ExtendedMatchers<TMatchers, void, TActual>, ExtendedMatchers<TMatchers, Promise<void>, TActual>>;

  // when have called expect.extend
  type ExtendedExpectFunction<TMatchers extends ExpectExtendMap> = <TActual>(actual: TActual) => JestExtendedMatchers<TMatchers, TActual>;

  type ExtendedExpect<TMatchers extends ExpectExtendMap>=
  ExpectProperties &
  AndNot<CustomAsyncMatchers<TMatchers>> &
  ExtendedExpectFunction<TMatchers>;
  /**
   * Construct a type with the properties of T except for those in type K.
   */
  type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
  type NonPromiseMatchers<T extends JestMatchersShape> = Omit<T, 'resolves' | 'rejects' | 'not'>;
  type PromiseMatchers<T extends JestMatchersShape> = Omit<T['resolves'], 'not'>;

  interface Constructable {
    new (...args: any[]): any;
}

export type DiffOptionsColor = (arg: string) => string; // subset of Chalk type

export type DiffOptions = {
  aAnnotation?: string;
  aColor?: DiffOptionsColor;
  aIndicator?: string;
  bAnnotation?: string;
  bColor?: DiffOptionsColor;
  bIndicator?: string;
  changeColor?: DiffOptionsColor;
  changeLineTrailingSpaceColor?: DiffOptionsColor;
  commonColor?: DiffOptionsColor;
  commonIndicator?: string;
  commonLineTrailingSpaceColor?: DiffOptionsColor;
  contextLines?: number;
  emptyFirstOrLastLinePlaceholder?: string;
  expand?: boolean;
  includeChangeCounts?: boolean;
  omitAnnotationLines?: boolean;
  patchColor?: DiffOptionsColor;
};

}