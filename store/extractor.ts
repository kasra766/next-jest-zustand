type StateValues<T extends {}> = {
  [K in keyof T]: ReturnType<T[K]>;
};

export function extractor<T extends {}>(values: T) {
  const result = Object.entries(values).reduce((acc, currentValue) => {
    // @ts-ignore
    acc[currentValue[0]] = currentValue[1]();
    return acc;
  }, {} as StateValues<T>);
  return result;
}
