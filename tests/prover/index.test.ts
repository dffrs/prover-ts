// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import AProver from "../../src/prover";
describe("AProver", () => {
  class TestProver<T> extends AProver<T> {
    constructor(initialValue: T) {
      super(initialValue);
    }

    public addOperation(func: (arg: T) => T) {
      return this.addFunc(func);
    }

    protected validation(arg: unknown): asserts arg is T {
      // Mock validation function
    }
  }

  it("should parse the initial value without any operations", () => {
    const prover = new TestProver<number>();
    expect(prover.parse(null)).toBe(null);
  });

  it("should apply and parse the value using a single operation", () => {
    const prover = new TestProver<string>("");
    const operation = (arg: string) => arg.toUpperCase();
    prover.addOperation(operation);

    expect(prover.parse("hello")).toBe("HELLO");
  });

  it("should apply and parse the value using multiple operations", () => {
    const prover = new TestProver<number>(0);
    const operation1 = (arg: number) => arg + 5;
    const operation2 = (arg: number) => arg * 2;
    const operation3 = (arg: number) => arg - 10;
    prover.addOperation(operation1);
    prover.addOperation(operation2);
    prover.addOperation(operation3);

    expect(prover.parse(7)).toBe(14);
  });

  it("should throw an error if an operation throws an error", () => {
    const prover = new TestProver<string>("");
    const operation1 = (arg: string) => arg.toUpperCase();
    const operation2 = () => {
      throw new Error("Custom error");
    };
    prover.addOperation(operation1);
    prover.addOperation(operation2);

    expect(() => {
      prover.parse("hello");
    }).toThrow();
  });

  it("should clear the operations after parsing", () => {
    const prover = new TestProver<number>(0);
    const operation = (arg: number) => arg + 1;
    prover.addOperation(operation);

    expect(prover.parse(5)).toBe(6);
    expect(prover.parse(10)).toBe(10);
  });
});
