import { DictionaryEntity } from '../../interfaces/DictionaryEntity';
import { SelectItem } from '../../interfaces/SelectItem';

export const convertEntityToSelectItem = (
  entity: DictionaryEntity
): SelectItem => ({ value: entity.id, label: entity.name });

export const convertEntitiesToSelectItems = (entities: any): SelectItem[] => {
  if (entities.length && entities[0].id && entities[0].name) {
    return (entities as DictionaryEntity[]).map((entity) =>
      convertEntityToSelectItem(entity)
    );
  }

  return [];
};
