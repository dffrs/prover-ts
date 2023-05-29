import AProver from "..";
class ProverNumber extends AProver<number> {
  constructor() {
    super(0);
  }

  protected validation(arg: unknown): asserts arg is number {
    if (typeof arg !== "number") throw Error();
  }

  positive() {
    const func = (arg: number) => {
      if (arg < 0) throw Error();
      return arg;
    };
    return super.addFunc(func);
  }

  negative() {
    const func = (arg: number) => {
      if (arg >= 0) throw Error();
      return arg;
    };
    return super.addFunc(func);
  }

  equal(comp: number) {
    const func = (arg: number) => {
      if (comp !== arg) throw Error();
      return arg;
    };
    return super.addFunc(func);
  }

  gt(comp: number) {
    const func = (arg: number) => {
      if (arg <= comp) throw Error();
      return arg;
    };
    return super.addFunc(func);
  }

  gte(comp: number) {
    const func = (arg: number) => {
      if (arg < comp) throw Error();
      return arg;
    };
    return super.addFunc(func);
  }

  lt(comp: number) {
    const func = (arg: number) => {
      if (arg >= comp) throw Error();
      return arg;
    };
    return super.addFunc(func);
  }

  lte(comp: number) {
    const func = (arg: number) => {
      if (arg > comp) throw Error();
      return arg;
    };
    return super.addFunc(func);
  }

  multiple(comp: number) {
    const func = (arg: number) => {
      if (arg % comp !== 0) throw Error();
      return arg;
    };
    return super.addFunc(func);
  }

  save() {
    const func = (arg: number) => {
      if (Number.MIN_SAFE_INTEGER > arg || arg > Number.MAX_SAFE_INTEGER) throw Error();
      return arg;
    };
    return super.addFunc(func);
  }

  finite() {
    const func = (arg: number) => {
      if (arg === Infinity || arg === -Infinity) throw Error();
      return arg;
    };
    return super.addFunc(func);
  }

  func(predicate: (arg: number) => boolean) {
    const func = (arg: number) => {
      if (!predicate(arg)) throw Error();
      return arg;
    };
    return super.addFunc(func);
  }
}

export default ProverNumber;
