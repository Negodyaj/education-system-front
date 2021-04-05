import { useEffect } from 'react'
import Select, { OptionsType } from 'react-select'
import { Role } from '../../enums/role';
import { getEnToRuTranslation } from '../../shared/converters/enumToDictionaryEntity';
import { SelectItem } from '../interfaces/SelectItem';

interface SelectProps {
  selectType?: string;
  userOptionsIds: number[] | undefined;
  options: SelectItem[];
  onSelect: (optionIds: number[]) => void;
}

function CustomMultiSelect(props: SelectProps) {
  let userOptions: SelectItem[];

  useEffect(() => {
    userOptions = props.userOptionsIds?.map(optionId => {
      return {
        value: optionId,
        label: getEnToRuTranslation(Role[optionId])
      }
    }) as SelectItem[]
  }, []
  )

  const onSelect = (selectedOptions: OptionsType<object>) => {
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