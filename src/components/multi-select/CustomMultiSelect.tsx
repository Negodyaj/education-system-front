import { ChangeEventHandler, SetStateAction, useEffect, useState } from 'react'
import Select, { ActionMeta, OptionsType, SelectOptionActionMeta } from 'react-select'
import { dictionary } from '../../shared/converters/enumToDictionaryEntity';
import { SelectItem } from '../interfaces/SelectItem';

interface SelectProps {
  selectType?: string;
  userOptions: number[] | undefined;
  options: SelectItem[];
  onSelect: (roleIds: number[]) => void;
}

function CustomMultiSelect(props: SelectProps) {
  let userOptions: SelectItem[];
  useEffect(() => {
    userOptions = props.userOptions?.map(roleId => {
      return { value: roleId, label: dictionary[roleId] }
    }) as SelectItem[]
  }, []
  )

  const onSelect = (selectedOptions: OptionsType<object>) => {
    let roleIds = (selectedOptions as SelectItem[]).map(i => i.value)
    console.log(props.userOptions?.map(roleId => { return { value: roleId, label: dictionary[roleId] } }))
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