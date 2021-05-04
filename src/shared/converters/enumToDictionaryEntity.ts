import { DictionaryEntity } from "../../interfaces/DictionaryEntity";
import { Role } from "../../enums/role";

export const convertEnumToDictionary = (enumArg: any): DictionaryEntity[] => {

    return Object.keys(enumArg)
        .filter(key => typeof enumArg[key] === "number")
        .map(key => ({ id: enumArg[key], name: key } as DictionaryEntity));
}

export const getRussianDictionary = (entities: DictionaryEntity[]): DictionaryEntity[] =>
    entities.map(entity => {
        return {
            id: entity.id,
            name: dictionary[entity.name]
        }
    })

export const getEnToRuTranslation = (eng: string) => {
    return dictionary[eng];
}

const dictionary: { [key: string]: string } = {
    [Role[Role.Admin]]: "Администратор",
    [Role[Role.Manager]]: "Менеджер",
    [Role[Role.Methodist]]: "Методист",
    [Role[Role.Student]]: "Студент",
    [Role[Role.Teacher]]: "Преподаватель",
    [Role[Role.Tutor]]: "Тьютор",
    [Role[Role.Test]]: "Тестовая роль"
}