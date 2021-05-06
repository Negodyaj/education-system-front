import { SelectItem } from "../../interfaces/SelectItem"

export const convertIdsToSelectItems = (ids: number[] | undefined, selectedOptions: SelectItem[]) => {
    return ids?.map(id => {
        return {
            value: id,
            label: selectedOptions[selectedOptions.indexOf(selectedOptions.filter(option => option.value === id)[0])]?.label
        }
    })
}