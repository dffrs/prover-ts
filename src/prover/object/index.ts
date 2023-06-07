// import AProver from "..";
// import { Parse } from "../../../util/type";
// class ProverObject<T, O extends Record<PropertyKey, Parse<T>>> extends AProver<O> {
//   constructor(obj: O) {
//     if (obj === undefined) throw Error();
//     super(obj);
//   }
//   private isNonEmptyObject(obj: object): obj is Record<PropertyKey, unknown> {
//     return Object.keys(obj).length > 0;
//   }
//   private isValidKey<K extends PropertyKey, O extends Record<PropertyKey, unknown>>(key: K, obj: O): key is K {
//     return key in obj;
//   }
//   protected validation(arg: unknown): asserts arg is { [Key in keyof O]: ReturnType<O[Key]["parse"]> } {
//     if (arg == null || Array.isArray(arg) || typeof arg !== "object") throw Error();
//     Object.keys(this.value).forEach((objKey) => {
//       if (this.isNonEmptyObject(arg) && this.isValidKey(objKey, arg)) this.value[objKey].parse(arg[objKey]);
//       else throw Error();
//     });
//   }

//   // Implementation to throw error if there's a key that was not expected to be there in the first place.
//   // function isValidObject(arg: unknown): asserts arg is { [Key in keyof O]: ReturnType<O[Key]["parse"]> } {
//   //   if (arg == null || Array.isArray(arg) || typeof arg !== "object") throw Error();

//   //   const extraKeys = Object.keys(arg).filter(key => !isValidKey(key, obj));
//   //   if (extraKeys.length > 0) {
//   //     throw Error(`Unexpected properties found: ${extraKeys.join(', ')}`);
//   //   }

//   //   Object.keys(obj).forEach((objKey) => {
//   //     if (isNonEmptyObject(arg) && isValidKey(objKey, arg)) {
//   //       obj[objKey].parse(arg[objKey]);
//   //     } else {
//   //       throw Error();
//   //     }
//   //   });
//   // }

//   // Implementation to "parse" those unexpected keys.
//   // function isValidObject(arg: unknown): asserts arg is { [Key in keyof O]: ReturnType<O[Key]['parse']> } {
//   //   if (arg == null || Array.isArray(arg) || typeof arg !== 'object') throw Error();

//   //   const parsedObject: { [Key in keyof O]?: ReturnType<O[Key]['parse']> } = {};

//   //   Object.keys(obj).forEach((objKey) => {
//   //     if (isNonEmptyObject(arg) && isValidKey(objKey, arg)) {
//   //       try {
//   //         parsedObject[objKey] = obj[objKey].parse(arg[objKey]);
//   //       } catch (error) {
//   //         // Ignore the error and skip the property
//   //       }
//   //     }
//   //   });

//   //   return parsedObject as { [Key in keyof O]: ReturnType<O[Key]['parse']> };
//   // }
// }

import AProver from "..";
import { Parse } from "../../../util/type";

// Infer the unwrapped type of a Prover instance
type UnwrapProver<T> = T extends AProver<infer U> ? U : T extends Parse<infer A> ? A : never;

// Infer the unwrapped object type with unwrapped Prover types
type UnwrapProverObject<T> = {
  [K in keyof T]: UnwrapProver<T[K]>;
} & NonNullable<unknown>;

class ProverObject<T, O extends Record<PropertyKey, Parse<T>>> extends AProver<UnwrapProverObject<O>> {
  constructor(obj: O) {
    if (obj === undefined) throw Error();
    super(obj as UnwrapProverObject<O>); // temp
  }
  private isNonEmptyObject(obj: object): obj is Record<PropertyKey, unknown> {
    return Object.keys(obj).length > 0;
  }

  private isValidKey<K extends PropertyKey, O extends Record<PropertyKey, unknown>>(key: K, obj: O): key is K {
    return key in obj;
  }
  protected validation(arg: unknown): asserts arg is UnwrapProverObject<O> {
    if (arg == null || Array.isArray(arg) || typeof arg !== "object") throw Error();

    Object.keys(this.value).forEach((objKey) => {
      if (this.isNonEmptyObject(arg) && this.isValidKey(objKey, arg)) {
        const prover = this.value[objKey] as Parse<UnwrapProverObject<O>[typeof objKey]>; // temp
        prover.parse(arg[objKey]);
      } else {
        throw Error();
      }
    });
  }
}

export default ProverObject;
