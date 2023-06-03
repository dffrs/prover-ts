type ParseMethod<T> = (arg: unknown) => T;
type Parse<T> = Record<"parse", ParseMethod<T>>;
export type { Parse, ParseMethod };
