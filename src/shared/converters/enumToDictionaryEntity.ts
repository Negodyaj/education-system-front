import { DictionaryEntity } from '../../interfaces/DictionaryEntity';
import { Role } from '../../enums/role';
import { HWAttemptStatuses } from '../../enums/hwAttemptStatuses';
import { HWListTypes } from '../../enums/HWListTypes';

export const convertEnumToDictionary = (enumArg: any): DictionaryEntity[] =>
  Object.keys(enumArg)
    .filter((key) => typeof enumArg[key] === 'number')
    .map((key) => ({ id: enumArg[key], name: key } as DictionaryEntity));

export const getRussianDictionary = (
  entities: DictionaryEntity[]
): DictionaryEntity[] =>
  entities.map((entity) => ({
    id: entity.id,
    name: dictionary[entity.name],
  }));

export const getEnToRuTranslation = (eng: string) => dictionary[eng];

const dictionary: { [key: string]: string } = {
  [Role[Role.Admin]]: 'Администратор',
  [Role[Role.Manager]]: 'Менеджер',
  [Role[Role.Methodist]]: 'Методист',
  [Role[Role.Student]]: 'Студент',
  [Role[Role.Teacher]]: 'Преподаватель',
  [Role[Role.Tutor]]: 'Тьютор',
  [Role[Role.Test]]: 'Тестовая роль',
  [HWListTypes.Appointed]: 'Назначенные',
  [HWListTypes.Proposed]: 'Предложенные',
  [HWListTypes.Submitted]: 'Ожидают проверки',
  [HWListTypes.Passed]: 'Сдано',
  [HWAttemptStatuses[HWAttemptStatuses.Await]]: 'Ожидает проверки',
  [HWAttemptStatuses[HWAttemptStatuses.Late]]: 'Отправлено с опозданием',
  [HWAttemptStatuses[HWAttemptStatuses.Passed]]: 'Сдано',
};
