import ProverString from "../../../src/prover/string";
describe("ProverString tests", () => {
  const p = new ProverString();
  it("Proper Initialize", () => {
    expect(p).toBeInstanceOf(ProverString);
  });
});
