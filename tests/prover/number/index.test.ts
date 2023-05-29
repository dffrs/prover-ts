import ProverNumber from "../../../src/prover/number";
describe("ProverString tests", () => {
  const p = new ProverNumber();
  it("Proper Initialize", () => {
    expect(p).toBeInstanceOf(ProverNumber);
  });
});
