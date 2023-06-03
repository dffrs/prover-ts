// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import ProverNumber from "../../../src/prover/number";
import ProverObject from "../../../src/prover/object";
import ProverString from "../../../src/prover/string";
describe("ProverObject", () => {
  let instance: ProverObject<unknown, unknown> | null;
  let stringInstance: ProverString | null;
  let numberInstance: ProverNumber | null;
  beforeEach(() => {
    stringInstance = new ProverString();
    numberInstance = new ProverNumber();
  });
  afterEach(() => {
    instance = null;
    stringInstance = null;
    numberInstance = null;
  });
  it("Proper Initialize", () => {
    instance = new ProverObject({});
    expect(instance).toBeInstanceOf(ProverObject);
  });
  it("Expecting throw if no argument is provided", () => {
    expect(() => (instance = new ProverObject())).toThrow(Error);
    expect(() => instance.parse()).toThrow(Error);
  });
  it("should throw an error when parsing an object with invalid properties", () => {
    const input = { name: "John", age: "twenty-five" };
    const prover = new ProverObject({
      name: stringInstance,
      age: numberInstance,
    });
    expect(() => {
      prover.parse(input);
    }).toThrow(Error);
  });
  it("should throw an error when parsing an object with missing required properties", () => {
    const input = { name: "John" };
    const prover = new ProverObject({
      name: stringInstance,
      age: numberInstance,
    });
    expect(() => {
      prover.parse(input);
    }).toThrow(Error);
  });
  it("should NOT parse an object with additional optional properties", () => {
    const input = { name: "John", age: 25, gender: "Male" };
    const prover = new ProverObject({
      name: stringInstance,
      age: numberInstance,
    });
    const result = prover.parse(input);
    expect(result).toEqual({ name: "John", age: 25, gender: "Male" });
  });
  it("should parse an empty object", () => {
    const input = {};
    const prover = new ProverObject({});
    const result = prover.parse(input);
    expect(result).toEqual({});
  });
});
