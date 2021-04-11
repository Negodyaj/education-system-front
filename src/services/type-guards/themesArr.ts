import { Themes } from '../../shared/themes/Themes';

export const isThemesArr = (data: any): data is Themes[] => {
    const dataToCheck = data as Themes[];
    console.log(dataToCheck);
    return Array.isArray(dataToCheck) && !!dataToCheck[0].name;
}