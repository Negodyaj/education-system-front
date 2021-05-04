import { SelectItem } from "../../interfaces/SelectItem"

export const convertRoleIdsToSelectItems = (roleIds: number[] | undefined, selectedOptions: SelectItem[]) => {
    return roleIds?.map(roleId => {
        return {
            value: roleId,
            label: selectedOptions[roleId - 1]?.label
        }
    })
}