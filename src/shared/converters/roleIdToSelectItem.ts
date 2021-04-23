import { Role } from "../../enums/role"
import { getEnToRuTranslation } from "./enumToDictionaryEntity"

export const convertRoleIdToSelectItem = (arg: number) => {
    return {
        value: arg,
        label: getEnToRuTranslation(Role[arg])
    }
}