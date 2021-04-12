import { Tag } from "../../components/interfaces/Tag";

export const isTagArr = (data: any): data is Tag[] => {
    const dataToCheck = data as Tag[];
    return Array.isArray(dataToCheck) && !!dataToCheck[0].name && !!dataToCheck[0].id;
}