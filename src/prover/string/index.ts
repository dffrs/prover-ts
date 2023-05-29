import AProver from "..";
import * as patterns from "./util";
class ProverString extends AProver<string> {
  constructor() {
    super("");
  }

  protected validation(arg: unknown): asserts arg is string {
    if (typeof arg !== "string") throw Error();
  }

  nonEmpty() {
    const func = (arg: string) => {
      if (!arg.length) throw Error();
      return arg;
    };
    return super.addFunc(func);
  }

  max(maxLength: number) {
    const func = (arg: string) => {
      if (arg.length > maxLength) throw Error();
      return arg;
    };
    return super.addFunc(func);
  }

  min(minLength: number) {
    const func = (arg: string) => {
      if (arg.length < minLength) throw Error();
      return arg;
    };
    return super.addFunc(func);
  }

  length(length: number) {
    const func = (arg: string) => {
      if (arg.length !== length) throw Error();
      return arg;
    };
    return super.addFunc(func);
  }

  includes(toInclude: string) {
    const func = (arg: string) => {
      if (!arg.includes(toInclude)) throw Error();
      return arg;
    };
    return super.addFunc(func);
  }

  startsWith(toStartWith: string) {
    const func = (arg: string) => {
      if (!arg.startsWith(toStartWith)) throw Error();
      return arg;
    };
    return super.addFunc(func);
  }

  endsWith(endsWith: string) {
    const func = (arg: string) => {
      if (!arg.endsWith(endsWith)) throw Error();
      return arg;
    };
    return super.addFunc(func);
  }

  regex(pattern: RegExp | string) {
    const func = (arg: string) => {
      if (!new RegExp(pattern).test(arg)) throw Error();
      return arg;
    };
    return super.addFunc(func);
  }

  email() {
    function func(arg: string) {
      if (!new RegExp(patterns.emailPattern).test(arg)) throw Error();
      return arg;
    }
    return super.addFunc(func);
  }

  date() {
    function func(arg: string) {
      if (!new RegExp(patterns.dateFormatPattern).test(arg)) throw Error();
      return arg;
    }
    return super.addFunc(func);
  }

  numeric() {
    function func(arg: string) {
      if (!new RegExp(patterns.numericPattern).test(arg)) throw Error();
      return arg;
    }
    return super.addFunc(func);
  }

  alphanumeric() {
    function func(arg: string) {
      if (!new RegExp(patterns.alphanumericPattern).test(arg)) throw Error();
      return arg;
    }
    return super.addFunc(func);
  }

  phoneNumber() {
    function func(arg: string) {
      if (!new RegExp(patterns.phoneNumberPattern).test(arg)) throw Error();
      return arg;
    }
    return super.addFunc(func);
  }

  zipCode() {
    function func(arg: string) {
      if (!new RegExp(patterns.zipCodePattern).test(arg)) throw Error();
      return arg;
    }
    return super.addFunc(func);
  }

  ipv4() {
    function func(arg: string) {
      if (!new RegExp(patterns.ipv4Pattern).test(arg)) throw Error();
      return arg;
    }
    return super.addFunc(func);
  }

  func(predicate: (arg: string) => boolean) {
    function func(arg: string) {
      if (!predicate(arg)) throw Error();
      return arg;
    }
    return super.addFunc(func);
  }
}

export default ProverString;
