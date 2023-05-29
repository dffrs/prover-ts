/* eslint-disable  @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import ProverNumber from "../../../src/prover/number";
describe("ProverString tests", () => {
  const p = new ProverNumber();
  it("Proper Initialize", () => {
    expect(() => p.positive().parse()).toThrow(Error);
  });
  it("Expecting throw if no argument is provided", () => {
    expect(p).toBeInstanceOf(ProverNumber);
  });
  it("Calling positive", () => {
    const testValue = 1;
    const positiveNumber = p.positive().parse(testValue);
    expect(positiveNumber).toBe(testValue);
  });
  it("Expecting positive to throw", () => {
    const testValue = -1;
    expect(() => p.positive().parse(testValue)).toThrow(Error);
  });
});
