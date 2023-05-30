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
    this.validation(arg);
    let result = arg;
    this.operations.forEach((func) => {
      try {
        result = func(result);
      } catch (error) {
        throw Error();
      }
    });
    this.operations.clear();
    this.value = result;
    return this.value;
  }
}

export default AProver;
