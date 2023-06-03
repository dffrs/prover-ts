import { Parse } from "../util/type";
import ProverNumber from "./prover/number";
import ProverObject from "./prover/object";
import ProverString from "./prover/string";
class Prover {
  private isBoolean(args: unknown): asserts args is boolean {
    if (typeof args !== "boolean") throw Error();
  }

  private isFunction(args: unknown): asserts args is (...args: unknown[]) => unknown {
    if (typeof args !== "function") throw Error();
  }

  public string() {
    return new ProverString();
  }

  public number() {
    return new ProverNumber();
  }

  public boolean() {
    const _isBoolean: typeof this.isBoolean = this.isBoolean; // Explicit type annotation
    return {
      parse: (arg: unknown) => {
        _isBoolean(arg);
        return arg;
      },
    };
  }

  public function() {
    const _isFunction: typeof this.isFunction = this.isFunction; // Explicit type annotation
    return {
      parse: (arg: unknown) => {
        _isFunction(arg);
        return arg;
      },
    };
  }

  public object<T, O extends Record<PropertyKey, Parse<T>>>(obj: O) {
    return new ProverObject(obj);
  }

  public record<K extends PropertyKey, T>(values: Parse<T>): Parse<Record<K, T>> {
    function isValidRecord(arg: unknown): asserts arg is Record<K, T> {
      if (arg == null || typeof arg !== "object" || Array.isArray(arg)) throw Error();

      Object.entries(arg).forEach(([, value]) => {
        values.parse(value);
      });
    }

    return {
      parse(arg: unknown) {
        isValidRecord(arg);
        return arg;
      },
    };
  }

  public tuple<T, Tupp extends ReadonlyArray<Parse<T>>>(tupple: Tupp) {
    function isValidTupple(arg: unknown): asserts arg is ReadonlyArray<ReturnType<Tupp[number]["parse"]>> {
      if (arg == null || !Array.isArray(arg)) throw Error();

      arg.forEach((element) => {
        const index = arg.indexOf(element);
        if (index !== -1) tupple[index].parse(arg[index]);
        else throw Error();
      });
    }
    return {
      parse(arg: unknown) {
        isValidTupple(arg);
        return arg;
      },
    };
  }

  public array<T>(array: Parse<T>) {
    function isValidArray(arg: unknown): asserts arg is T[] {
      if (arg == null || !Array.isArray(arg)) throw Error();

      arg.forEach((element) => {
        array.parse(element);
      });
    }
    return {
      parse(arg: unknown) {
        isValidArray(arg);
        return arg;
      },
    };
  }
}

export default Prover;
