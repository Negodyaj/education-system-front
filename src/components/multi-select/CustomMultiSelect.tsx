import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { NONAME } from 'node:dns';
import { useEffect, useState } from 'react'
import Select, { NonceProvider, OptionsType } from 'react-select'
import { getJSDocReadonlyTag, reduceEachTrailingCommentRange } from 'typescript';
import { useState } from 'react'
import { SelectItem } from '../../interfaces/SelectItem';

type selectType = "single"|"multi"

interface SelectProps {
  selectType?: selectType;
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
    <Select
      options={props.options}
      isMulti={false}
      value={userOption}
      styles={customStyles}
      placeholder='Выберите опцию'
      onChange={onSingleSelect} />
  )
  const MultiSelect = () => (
    <Select
      isMulti={true}
      name="Role"
      options={props.options}
      value={userOptions}
      className="basic-multi-select"
      classNamePrefix="select"
      styles={customStyles}
      placeholder='Выберите опцию'
      noOptionsMessage={() => 'Опций больше нет'}
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