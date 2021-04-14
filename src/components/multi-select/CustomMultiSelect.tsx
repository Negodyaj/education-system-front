import { useEffect, useState } from 'react'
import Select, { OptionsType } from 'react-select'
import { Role } from '../../enums/role';
import { SelectItem } from '../../interfaces/SelectItem';
import { getEnToRuTranslation } from '../../shared/converters/enumToDictionaryEntity';


interface SelectProps {
  selectType?: string;
  userOptionsIds: number[] | undefined;
  options: SelectItem[];
  onSelect: (optionIds: number[]) => void;
}

function CustomMultiSelect(props: SelectProps) {
  const[userOptions, setUserOptions] = useState<SelectItem[]>(props.userOptionsIds?.map(optionId => {
    return {
      value: optionId,
      label: getEnToRuTranslation(Role[optionId])
    }
  }) as SelectItem[]);

  const onSelect = (selectedOptions: OptionsType<object>) => {
    setUserOptions(selectedOptions as SelectItem[])
    let roleIds = (selectedOptions as SelectItem[]).map(i => i.value)
    props.onSelect(roleIds);
  }

  const SingleSelect = () => (
    <Select options={props.options} />
  )
  const MultiSelect = () => (
    <Select
      isMulti
      name="Role"
      options={props.options}
      value={userOptions}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={onSelect}
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