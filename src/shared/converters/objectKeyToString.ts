export const getName = <T>(
  obj: T,
  getString: (arg: T) => string | undefined
) => {
  const keyToStringMMap = {} as T;
  Object.keys(obj).map((key) => ((keyToStringMMap as any)[key] = key));

  return getString(keyToStringMMap);
};
