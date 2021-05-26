export const convertStringToDate = (value: any) => {
  const date: number[] = [];
  const dateConstructorArg = value
    ? (() => {
        if (value instanceof Date) {
          return value.toLocaleDateString().split('.');
        }

        return value.concat().split('.');
      })()
    : [
        ['0', '0'],
        ['0', '0'],
        ['0', '0', '0', '0'],
      ];
  date.push(
    Number.parseInt(
      value ? dateConstructorArg[2] : new Date().getFullYear().toString(),
      10
    )
  );
  date.push(
    Number.parseInt(
      value ? dateConstructorArg[1] : new Date().getMonth().toString(),
      10
    )
  );
  date.push(
    Number.parseInt(
      value ? dateConstructorArg[0] : new Date().getDate().toString(),
      10
    )
  );

  return new Date(date[0], value ? date[1] - 1 : date[1], date[2]);
};
