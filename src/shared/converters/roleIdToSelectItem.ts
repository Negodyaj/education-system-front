import { Role } from "../../enums/role"
import { SelectItem } from "../../interfaces/SelectItem"
import { getEnToRuTranslation } from "./enumToDictionaryEntity"

export const convertRoleIdToSelectItem = (arg: number, selectedOptions: SelectItem[]) => {
    return {
        value: arg,
        label: selectedOptions[arg - 1]?.label
    }
}