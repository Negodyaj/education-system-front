import { Role } from "../../enums/role"
import { getEnToRuTranslation } from "./enumToDictionaryEntity"

export const convertRoleIdsToSelectItems = (roleIds: number[] | undefined) => {
    return roleIds?.map(roleId => {
        return {
            value: roleId,
            label: getEnToRuTranslation(Role[roleId])
        }
    })
}