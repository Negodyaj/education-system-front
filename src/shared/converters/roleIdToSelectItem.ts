import { SelectItem } from '../../interfaces/SelectItem';

export const convertIdToSelectItem = (
  id: number,
  selectedOptions: SelectItem[]
) => ({
  value: id,
  label:
    selectedOptions[
      selectedOptions.indexOf(
        selectedOptions.filter((option) => option.value === id)[0]
      )
    ]?.label,
});
