/* eslint-disable  @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import ProverNumber from "../../../src/prover/number";
describe("ProverString tests", () => {
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
    const negetiveNumber = instance.save().parse(testValue);
    expect(negetiveNumber).toBe(testValue);
  });
  it("Expecting save to throw", () => {
    const testValue = Infinity;
    expect(() => instance.save().parse(testValue)).toThrow(Error);
  });
  it("Calling finite", () => {
    const testValue = 1;
    const negetiveNumber = instance.finite().parse(testValue);
    expect(negetiveNumber).toBe(testValue);
  });
  it("Expecting finite to throw", () => {
    const testValue = Infinity;
    expect(() => instance.finite().parse(testValue)).toThrow(Error);
  });
});
