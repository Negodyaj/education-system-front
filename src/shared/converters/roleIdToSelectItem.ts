import { Role } from '../../enums/role';

import { getEnToRuTranslation } from './enumToDictionaryEntity';

export const convertRoleIdToSelectItem = (arg: number) => ({
  value: arg,
  label: getEnToRuTranslation(Role[arg]),
});
