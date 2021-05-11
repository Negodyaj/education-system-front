import { Role } from '../../enums/role';

import { getEnToRuTranslation } from './enumToDictionaryEntity';

export const convertRoleIdsToSelectItems = (roleIds: number[] | undefined) =>
  roleIds?.map((roleId) => ({
    value: roleId,
    label: getEnToRuTranslation(Role[roleId]),
  }));
