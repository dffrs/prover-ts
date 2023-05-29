abstract class AProver<T> {
  protected value: T;
  protected operations: Set<(arg: T) => T>;
  constructor(initialValue: T) {
    this.value = initialValue;
    this.operations = new Set([]);
  }
  protected abstract validation(arg: unknown): asserts arg is T;

  protected addFunc(func: (arg: T) => T) {
    this.operations.add(func);
    return this;
  }

  parse(arg: unknown) {
    this.operations.forEach((func) => {
      this.validation(arg);
      this.value = func(arg);
    });
    this.operations.clear();
    return this.value;
  }
}

export default AProver;
