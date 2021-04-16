import { useState } from 'react'
import Select, { OptionsType } from 'react-select'
import { SelectItem } from '../../interfaces/SelectItem';


interface SelectProps {
  selectType?: string;
  userOptions?: SelectItem[] | undefined;
  userOption?: SelectItem | undefined;
  options: SelectItem[] | undefined;
  onMultiSelect?: (optionIds: number[]) => void;
  onSingleSelect?: (optionId: number | null) => void;
}

function CustomMultiSelect(props: SelectProps) {
  const [userOptions, setUserOptions] = useState<SelectItem[] | undefined>(props.userOptions?.length ? [...props.userOptions] : undefined);
  const [userOption, setUserOption] = useState<SelectItem | undefined>(props.userOption || undefined)
  const onMultiSelect = (selectedOptions: OptionsType<object>) => {
    setUserOptions(selectedOptions as SelectItem[])
    let roleIds = (selectedOptions as SelectItem[]).map(i => i.value)
    props.onMultiSelect && props.onMultiSelect(roleIds);
  }

  const onSingleSelect = (selectedOption: SelectItem | null) => {
    setUserOption(selectedOption as SelectItem)
    props.onSingleSelect && props.onSingleSelect(selectedOption?.value || null)
  }

  const SingleSelect = () => (
    <Select options={props.options}
      isMulti={false}
      value={userOption}
      //options={props.options}
      onChange={onSingleSelect}/>
  )
  const MultiSelect = () => (
    <Select
      isMulti={true}
      name="Role"
      options={props.options}
      value={userOptions}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={onMultiSelect}
    />
  )
  return (
    <div>
      {
        props.selectType === 'multi' ? MultiSelect() : SingleSelect()
      }
    </div>
  )
}

export default CustomMultiSelect;