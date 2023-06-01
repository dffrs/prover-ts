// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import Prover from "./../src";
describe("Prover", () => {
  let prover: Prover;

  beforeEach(() => {
    prover = new Prover();
  });

  describe("string()", () => {
    it("should return the same string when parsed", () => {
      const input = "Hello";
      const result = prover.string().parse(input);
      expect(result).toBe(input);
    });
    it("should throw an error when parsing a non-string value", () => {
      const input = 123;
      expect(() => {
        prover.string().parse(input);
      }).toThrow();
    });
    // Add more test cases for ProverString methods
  });

  describe("number()", () => {
    it("should return the same number when parsed", () => {
      const input = 42;
      const result = prover.number().parse(input);
      expect(result).toBe(input);
    });
    it("should throw an error when parsing a non-number value", () => {
      const input = "42";
      expect(() => {
        prover.number().parse(input);
      }).toThrow();
    });
    // Add more test cases for ProverNumber methods
  });

  describe("boolean()", () => {
    it("should return the same boolean value when parsed", () => {
      const input = true;
      const result = prover.boolean().parse(input);
      expect(result).toBe(input);
    });
    it("should throw an error when parsing a non-boolean value", () => {
      const input = "true";
      expect(() => {
        prover.boolean().parse(input);
      }).toThrow();
    });
  });

  describe("function()", () => {
    it("should return the same function when parsed", () => {
      const input = () => {
        console.log("Hello");
      };
      const result = prover.function().parse(input);
      expect(result).toBe(input);
    });
    it("should throw an error when parsing a non-function value", () => {
      const input = 123;
      expect(() => {
        prover.function().parse(input);
      }).toThrow();
    });
  });

  describe("record()", () => {
    test("should return the same record when parsed", () => {
      const input = { 1: "John", 2: "Doe" };
      const result = prover.record(prover.string()).parse(input);
      expect(result).toBe(input);
    });

    test("should throw an error when parsing a record with invalid values", () => {
      const input = { 1: "John", 2: 30 };
      expect(() => {
        prover.record(prover.string()).parse(input);
      }).toThrow();
    });
    test("should throw an error when parsing a record with missing required keys", () => {
      const input = { name: "John" };
      expect(() => {
        prover.record(prover.object({ name: prover.string(), age: prover.number() })).parse(input);
      }).toThrow();
    });
    // Add more tests
  });

  describe("object()", () => {
    it("should return the same object when parsing an empty object", () => {
      const input = {};
      const result = prover.object({}).parse(input);
      expect(result).toBe(input);
    });
    it("should return the same object when parsing an object with valid values", () => {
      const input = { name: "John", age: 25 };
      const result = prover.object({ name: prover.string(), age: prover.number() }).parse(input);
      expect(result).toBe(input);
    });
    it("should throw an error when parsing an object with missing required values", () => {
      const input = { name: "John" };
      expect(() => {
        prover.object({ name: prover.string(), age: prover.number() }).parse(input);
      }).toThrow();
    });
    // Ignoring this test until object has its own class.// it("should throw an error when parsing an object with extra values", () => {//   const input = { name: "John", age: 25, gender: "Male" };//   expect(() => {//     prover.object({ name: prover.string(), age: prover.number() }).parse(input);//   }).toThrow();// });
    it("should throw an error when parsing an object with invalid values", () => {
      const input = { name: "John", age: "25" };
      expect(() => {
        prover.object({ name: prover.string(), age: prover.number() }).parse(input);
      }).toThrow();
    });
    it("should throw an error when parsing an object with mixed valid and invalid values", () => {
      const input = { name: "John", age: "25", gender: "Male" };
      expect(() => {
        prover.object({ name: prover.string(), age: prover.number() }).parse(input);
      }).toThrow();
    });
  });

  describe("tuple()", () => {
    it("should return the same tuple when parsed", () => {
      const input = [1, "John", true];
      const result = prover.tuple([prover.number(), prover.string(), prover.boolean()]).parse(input);
      expect(result).toBe(input);
    });
    it("should throw an error when parsing a tuple with invalid values", () => {
      const input = [1, "John", 25];
      expect(() => {
        prover.tuple([prover.number(), prover.string(), prover.boolean()]).parse(input);
      }).toThrow();
    });
    it("should throw an error when parsing a tuple with extra elements", () => {
      const input = [1, "John", true, "extra"];
      expect(() => {
        prover.tuple([prover.number(), prover.string(), prover.boolean()]).parse(input);
      }).toThrow();
    });
    it("should parse an empty tuple", () => {
      const input: [] = [];
      const result = prover.tuple([]).parse(input);
      expect(result).toEqual(input);
    });
    it("should throw an error when parsing a tuple with mismatched types", () => {
      const input = [1, "John", true];
      expect(() => {
        prover.tuple([prover.number(), prover.number(), prover.boolean()]).parse(input);
      }).toThrow();
    });
    it("should parse a tuple with optional elements", () => {
      const input = [1, "John"];
      const result = prover.tuple([prover.number(), prover.string(), prover.boolean()]).parse(input);
      expect(result).toEqual(input);
    });
  });

  describe("array()", () => {
    it("should return the same array when parsing an empty array", () => {
      const input: number[] = [];
      const result = prover.array(prover.number()).parse(input);
      expect(result).toBe(input);
    });
    it("should return the same array when parsing an array of valid values", () => {
      const input = [1, 2, 3, 4, 5];
      const result = prover.array(prover.number()).parse(input);
      expect(result).toBe(input);
    });
    it("should throw an error when parsing an array with invalid values", () => {
      const input = [1, 2, "3", 4, 5];
      expect(() => {
        prover.array(prover.number()).parse(input);
      }).toThrow();
    });
    it("should throw an error when parsing an array with missing required values", () => {
      const input = [1, 2, undefined, 4, 5];
      expect(() => {
        prover.array(prover.number()).parse(input);
      }).toThrow();
    });
    it("should throw an error when parsing an array with mixed valid and invalid values", () => {
      const input = [1, 2, "3", 4, "5"];
      expect(() => {
        prover.array(prover.number()).parse(input);
      }).toThrow();
    });
  });
});
