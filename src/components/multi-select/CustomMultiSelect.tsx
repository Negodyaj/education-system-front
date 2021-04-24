import { useState } from 'react'
import Select, { ActionMeta, OptionsType } from 'react-select'
import { SelectItem } from '../../interfaces/SelectItem';
import { customStyles } from './multiSelectCosnts';

type selectType = "single" | "multi"

export const MultiSelect = (
  options: SelectItem[] | undefined,
  value: SelectItem[] | undefined,
  onChange: (((value: OptionsType<any>, actionMeta: ActionMeta<any>) => void) & ((value: OptionsType<any>, action: ActionMeta<any>) => void)) | undefined) => (
  <Select
    isMulti={true}
    name="Role"
    options={options}
    value={value}
    className="basic-multi-select"
    classNamePrefix="select"
    styles={customStyles}
    placeholder='Выберите опцию'
    noOptionsMessage={() => 'Опций больше нет'}
    onChange={onChange}
  />
)
export const SingleSelect = (
  options: SelectItem[] | undefined,
  value: any,
  onChange: (((value: any, actionMeta: ActionMeta<any>) => void) & ((value: any, action: ActionMeta<any>) => void)) | undefined) => (
  <Select
    options={options}
    isMulti={false}
    value={value}
    styles={customStyles}
    placeholder='Выберите опцию'
    onChange={onChange} />
)
interface SelectProps {
  selectType?: selectType;
  selectedOptions?: SelectItem[] | undefined;
  selectedOption?: SelectItem | undefined;
  options: SelectItem[] | undefined;
  onMultiSelect?: (optionIds: number[]) => void;
  onSingleSelect?: (optionId: number | null) => void;
}
function CustomMultiSelect(props: SelectProps) {
  const [selectedOptions, setSelectedOptions] = useState<SelectItem[] | undefined>(props.selectedOptions?.length ? [...props.selectedOptions] : undefined);
  const [selectedOption, setSelectedOption] = useState<SelectItem | undefined>(props.selectedOption || undefined)
  const onMultiSelect = (selectedOptions: OptionsType<object>) => {
    setSelectedOptions(selectedOptions as SelectItem[])
    let roleIds = (selectedOptions as SelectItem[]).map(i => i.value)
    props.onMultiSelect && props.onMultiSelect(roleIds);
  }
  const onSingleSelect = (selectedOption: SelectItem | null) => {
    setSelectedOption(selectedOption as SelectItem)
    props.onSingleSelect && props.onSingleSelect(selectedOption?.value || null)
  }
  return (
    <div>
      { props.selectType === 'multi' && MultiSelect(props.options, selectedOptions, onMultiSelect)}
      { props.selectType === 'single' && SingleSelect(props.options, selectedOption, onSingleSelect)}
    </div>
  )
}
export default CustomMultiSelect;