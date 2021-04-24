export const convertStringToDate = (value: any) => {

    let date: number[] = [];
    let dateConstructorArg = value ? (value instanceof Date) ? value.toLocaleDateString().split('.') : value.split('.') : [["0", "0"], ["0", "0"], ["0", "0", "0", "0"]];
    date.push(Number.parseInt(value ? dateConstructorArg[2] : new Date().getFullYear().toString()));
    date.push(Number.parseInt(value ? dateConstructorArg[1] : new Date().getMonth().toString()));
    date.push(Number.parseInt(value ? dateConstructorArg[0] : new Date().getDate().toString()));

    return new Date(date[0], date[1], date[2])
}