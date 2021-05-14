import { DictionaryEntity } from '../../interfaces/DictionaryEntity';
import { SelectItem } from '../../interfaces/SelectItem';

export const convertEntityToSelectItem = (
  entity: DictionaryEntity
): SelectItem => ({ value: entity.id, label: entity.name });

export const convertEntitiesToSelectItems = (
  entities: DictionaryEntity[]
): SelectItem[] => entities.map((entity) => convertEntityToSelectItem(entity));
