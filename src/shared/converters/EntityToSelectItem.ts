import { DictionaryEntity } from "../../components/interfaces/DictionaryEntity";
import { SelectItem } from "../../components/interfaces/SelectItem";



export const convertEntityToSelectItem = (entity: DictionaryEntity): SelectItem => {
    return { value: entity.id, label: entity.name };
}

export const convertEntitiesToSelectItems = (entities: DictionaryEntity[]): SelectItem[] => {
    return entities.map(entity => convertEntityToSelectItem(entity));
}