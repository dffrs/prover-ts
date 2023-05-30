import ProverString from "../../../src/prover/string";
describe("ProverString", () => {
  let prover: ProverString;
  beforeEach(() => {
    prover = new ProverString();
  });
  it("should parse non-empty strings", () => {
    expect(() => {
      prover.nonEmpty().parse("Hello");
    }).not.toThrow();
    expect(() => {
      prover.nonEmpty().parse("");
    }).toThrow();
  });
  it("should parse strings with a maximum length", () => {
    expect(() => {
      prover.max(5).parse("Hello");
    }).not.toThrow();
    expect(() => {
      prover.max(5).parse("Hello World");
    }).toThrow();
  });
  it("should parse strings with a minimum length", () => {
    expect(() => {
      prover.min(5).parse("Hello");
    }).not.toThrow();
    expect(() => {
      prover.min(5).parse("Hi");
    }).toThrow();
  });
  it("should parse strings with a specific length", () => {
    expect(() => {
      prover.length(5).parse("Hello");
    }).not.toThrow();
    expect(() => {
      prover.length(5).parse("Hi");
    }).toThrow();
  });
  it("should parse strings that include a specific substring", () => {
    expect(() => {
      prover.includes("world").parse("Hello, world!");
    }).not.toThrow();
    expect(() => {
      prover.includes("world").parse("Hello, universe!");
    }).toThrow();
  });
  it("should parse strings that start with a specific substring", () => {
    expect(() => {
      prover.startsWith("Hello").parse("Hello, world!");
    }).not.toThrow();
    expect(() => {
      prover.startsWith("Hello").parse("Hi, world!");
    }).toThrow();
  });
  it("should parse strings that end with a specific substring", () => {
    expect(() => {
      prover.endsWith("world!").parse("Hello, world!");
    }).not.toThrow();
    expect(() => {
      prover.endsWith("world!").parse("Hello, universe!");
    }).toThrow();
  });
  it("should parse strings using a regular expression pattern", () => {
    expect(() => {
      prover.regex(/^\d{4}$/).parse("1234");
    }).not.toThrow();
    expect(() => {
      prover.regex(/^\d{4}$/).parse("12345");
    }).toThrow();
  });
  it("should parse email addresses", () => {
    expect(() => {
      prover.email().parse("test@example.com");
    }).not.toThrow();
    expect(() => {
      prover.email().parse("invalid-email");
    }).toThrow();
  });
  it("should parse dates", () => {
    expect(() => {
      prover.date().parse("2023-05-30");
    }).toThrow();
    expect(() => {
      prover.date().parse("30/05/2023");
    }).not.toThrow();
  });
  it("should parse numeric strings", () => {
    expect(() => {
      prover.numeric().parse("12345");
    }).not.toThrow();
    expect(() => {
      prover.numeric().parse("abc123");
    }).toThrow();
  });
  it("should parse alphanumeric strings", () => {
    expect(() => {
      prover.alphanumeric().parse("abc123");
    }).not.toThrow();
    expect(() => {
      prover.alphanumeric().parse("abc@123");
    }).toThrow();
  });
  it("should parse phone numbers", () => {
    expect(() => {
      prover.phoneNumber().parse("1234567890");
    }).not.toThrow();
    expect(() => {
      prover.phoneNumber().parse("abc123");
    }).toThrow();
  });
  it("should parse zip codes", () => {
    expect(() => {
      prover.zipCode().parse("12345");
    }).not.toThrow();
    expect(() => {
      prover.zipCode().parse("abc123");
    }).toThrow();
  });
  it("should parse IPv4 addresses", () => {
    expect(() => {
      prover.ipv4().parse("192.168.0.1");
    }).not.toThrow();
    expect(() => {
      prover.ipv4().parse("256.256.256.256");
    }).toThrow();
  });
  it("should parse strings using a custom predicate function", () => {
    const isUpperCase = (arg: string) => arg === arg.toUpperCase();
    expect(() => {
      prover.func(isUpperCase).parse("HELLO");
    }).not.toThrow();
    expect(() => {
      prover.func(isUpperCase).parse("Hello");
    }).toThrow();
  });
});
