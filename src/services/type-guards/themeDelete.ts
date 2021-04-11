import { Themes } from "../../shared/themes/Themes";

export const isThemeDelete = (data: any): data is Themes => {
    const dataToCheck = data as Themes;
    return !Array.isArray(dataToCheck) && !!dataToCheck.isDeleted && !!dataToCheck.name;
}