/* eslint-disable  @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import ProverNumber from "../../../src/prover/number";
describe("ProverNumber tests", () => {
  let instance: ProverNumber | null;
  beforeEach(() => {
    instance = new ProverNumber();
  });
  afterEach(() => {
    instance = null;
  });
  it("Proper Initialize", () => {
    expect(instance).toBeInstanceOf(ProverNumber);
  });
  it("Expecting throw if no argument is provided", () => {
    expect(() => instance.positive().parse()).toThrow(Error);
  });
  it("Calling positive", () => {
    const testValue = 1;
    const positiveNumber = instance.positive().parse(testValue);
    expect(positiveNumber).toBe(testValue);
  });
  it("Expecting positive to throw", () => {
    const testValue = -1;
    expect(() => instance.positive().parse(testValue)).toThrow(Error);
  });
  it("Calling negative", () => {
    const testValue = -1;
    const negativeNumber = instance.negative().parse(testValue);
    expect(testValue).toBe(negativeNumber);
  });
  it("Expecting negative to throw", () => {
    const testValue = 1;
    expect(() => instance.negative().parse(testValue)).toThrow(Error);
  });
  it("Calling save", () => {
    const testValue = 1;
    const testNumber = instance.save().parse(testValue);
    expect(testNumber).toBe(testValue);
  });
  it("Expecting save to throw", () => {
    const testValue = Infinity;
    expect(() => instance.save().parse(testValue)).toThrow(Error);
  });
  it("Calling finite", () => {
    const testValue = 1;
    const testing = instance.finite().parse(testValue);
    expect(testing).toBe(testValue);
  });
  it("Expecting finite to throw", () => {
    const testValue = Infinity;
    expect(() => instance.finite().parse(testValue)).toThrow(Error);
  });
  it("Calling equal", () => {
    const testValue = 5;
    const testingValue = instance.equal(testValue).parse(testValue);
    expect(testingValue).toBe(testValue);
  });
  it("Expectig equal to throw", () => {
    const testValue = 5;
    expect(() => instance.equal(testValue).parse(testValue + 1)).toThrow(Error);
  });
  it("Calling gt", () => {
    const testValue = 3;
    const temp = 9;
    const result = instance?.gt(testValue).parse(temp);
    expect(result).toBe(temp);
  });
  it("Expecting gt to throw", () => {
    const testValue = 3;
    expect(() => instance?.gt(testValue).parse(testValue)).toThrow(Error);
  });
  it("Calling lt", () => {
    const testValue = 5;
    const temp = 3;
    const result = instance?.lt(testValue).parse(temp);
    expect(result).toBe(temp);
  });

  it("Expecting lt to throw", () => {
    const testValue = 5;
    expect(() => instance?.lt(testValue).parse(testValue)).toThrow(Error);
  });

  it("Calling gte", () => {
    const testValue = 5;
    const temp = 5;
    const result = instance?.gte(testValue).parse(temp);
    expect(result).toBe(temp);
  });

  it("Expecting gte to throw", () => {
    const testValue = 5;
    expect(() => instance?.gte(testValue).parse(testValue - 1)).toThrow(Error);
  });

  it("Calling lte", () => {
    const testValue = 5;
    const temp = 5;
    const result = instance?.lte(testValue).parse(temp);
    expect(result).toBe(temp);
  });

  it("Expecting lte to throw", () => {
    const testValue = 5;
    expect(() => instance?.lte(testValue).parse(testValue + 1)).toThrow(Error);
  });

  it("Calling multiple", () => {
    const testValue = 10;
    const multipleOf = 5;
    const result = instance?.multiple(multipleOf).parse(testValue);
    expect(result).toBe(testValue);
  });

  it("Expecting multiple to throw", () => {
    const testValue = 10;
    const multipleOf = 3;
    expect(() => instance?.multiple(multipleOf).parse(testValue)).toThrow(Error);
  });
  it("Calling func", () => {
    const testValue = 2;
    const func = jest.fn((arg) => arg === testValue);
    const result = instance?.func(func).parse(testValue);
    expect(func).toBeCalledTimes(1);
    expect(result).toBe(testValue);
  });
  it("Calling func with incorrect func type", () => {
    const testValue = 2;
    const func = jest.fn((arg) => arg?.concat(""));
    // It is supposed to throw, so no calling allow
    expect(func).toBeCalledTimes(0);
    expect(() => instance?.func(func).parse(testValue)).toThrow(Error);
  });
  it("Calling func with null", () => {
    const testValue = 2;
    const func = jest.fn(null);
    // It is supposed to throw, so no calling allow
    expect(func).toBeCalledTimes(0);
    expect(() => instance?.func(func).parse(testValue)).toThrow(Error);
  });
});
