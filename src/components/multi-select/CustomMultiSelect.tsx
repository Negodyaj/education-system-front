import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { NONAME } from 'node:dns';
import { useEffect, useState } from 'react'
import Select, { NonceProvider, OptionsType } from 'react-select'
import { getJSDocReadonlyTag, reduceEachTrailingCommentRange } from 'typescript';
import { SelectItem } from '../../interfaces/SelectItem';

type selectType = "single"|"multi"

interface SelectProps {
  selectType?: selectType;
  selectedOptions?: SelectItem[] | undefined;
  selectedOption?: SelectItem | undefined;
  options: SelectItem[] | undefined;
  onMultiSelect?: (optionIds: number[]) => void;
  onSingleSelect?: (optionId: number | null) => void;
}

function CustomMultiSelect(props: SelectProps) {
  const [userOptions, setUserOptions] = useState<SelectItem[] | undefined>(props.selectedOptions?.length ? [...props.selectedOptions] : undefined);
  const [userOption, setUserOption] = useState<SelectItem | undefined>(props.selectedOption || undefined)
  const onMultiSelect = (selectedOptions: OptionsType<object>) => {
    setUserOptions(selectedOptions as SelectItem[])
    let roleIds = (selectedOptions as SelectItem[]).map(i => i.value)
    props.onMultiSelect && props.onMultiSelect(roleIds);
  }

  const onSingleSelect = (selectedOption: SelectItem | null) => {
    setUserOption(selectedOption as SelectItem)
    props.onSingleSelect && props.onSingleSelect(selectedOption?.value || null)
  }

  const customStyleColors = {
    main: '#00CCF2',
    light: '#BEF1F9',
    shadow: '#272D3B26',
    borderLight: '#E0E7FF',
    borderDark: '#ABADB3'
  }
  const customStyleHeight = 40;

  const customStyles = {
    control: (baseStyles: any, state: any) => ({
      ...baseStyles,
      border: state.isFocused 
        ? "1px solid " + customStyleColors.borderDark 
        : "1px solid " + customStyleColors.borderLight,
      ':hover': {
        border: state.isFocused 
          ? "1px solid " + customStyleColors.borderDark 
          : "1px solid " + customStyleColors.borderLight,
      },
      borderRadius: 5,
      boxShadow: 'none',
      padding: "0px 5px",
      outline: 'none',
      caretColor: 'transparent',
    }),
    singleValue: () => ({
      padding: "0px 5px"
    }),
    valueContainer: (baseStyles: any) => ({
      ...baseStyles,
      padding: 0,
    }),
    option: (baseStyles: any, state: any) => ({
      ...baseStyles,
      borderRadius: 5,
      height: customStyleHeight,
      color: state.isSelected
        ? 'white' 
        : 'black',
      backgroundColor: state.isSelected
        ? customStyleColors.main
        : state.isFocused 
        ? customStyleColors.light 
        : 'white',
    }),
    menu: (baseStyles: any) => ({
      ...baseStyles,
      margin: 0,
      borderRadius: 5,
    }),
    menuList: (baseStyles: any) => ({
      ...baseStyles,
      padding: 0,
    }),
    multiValue: (baseStyles: any) => ({
      ...baseStyles,
      backgroundColor: customStyleColors.light,
      height: 28,
      lineHeight: "22px",
      borderRadius: 5,
      padding: "0px 5px",
      ':hover': {
        backgroundColor: customStyleColors.main,
      },
      ':hover div': {
        color: 'white',
      },
    }),
    multiValueLabel: (baseStyles: any) => ({
      ...baseStyles,
    }),
    multiValueRemove: (baseStyles: any) => ({
      ...baseStyles,
      cursor: 'pointer',
      ':hover': {
        background: 'none',
      }
    }),
    placeholder: () => ({
      color: 'lightgray',
    })
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