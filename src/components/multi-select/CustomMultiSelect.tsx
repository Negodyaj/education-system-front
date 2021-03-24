import { ChangeEventHandler, SetStateAction, useState } from 'react'
import Select, { ActionMeta, OptionsType, SelectOptionActionMeta } from 'react-select'
import { SelectItem } from '../interfaces/SelectItem';

interface SelectProps {
  selectType?: string;
  userOptions: OptionsType<object>;
  options: OptionsType<object>;
  onSelect: (items: OptionsType<object>) => void;
}

function CustomMultiSelect(props: SelectProps) {

  const onSelect = (selectedOptions: OptionsType<object>) => {
    props.onSelect(selectedOptions);
  }

  const SingleSelect = () => (
    <Select options={props.userOptions} />
  )
  const MultiSelect = () => (
    <Select
      isMulti
      name="Role"
      options={props.options}
      value={props.userOptions}
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