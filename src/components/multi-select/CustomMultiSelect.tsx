import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { NONAME } from 'node:dns';
import { useEffect, useState } from 'react'
import Select, { NonceProvider, OptionsType } from 'react-select'
import { getJSDocReadonlyTag, reduceEachTrailingCommentRange } from 'typescript';
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
      height: customStyleHeight,
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
      height: customStyleHeight,
    }),
    input: (baseStyles: any) => ({
      ...baseStyles,
      height: customStyleHeight,
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
      padding: "0px 5px",
      color: 'lightgray',
    })
  }

  const SingleSelect = () => (
    <Select 
      options={props.options} 
      styles={customStyles}
      placeholder='Выберите опцию'
    />
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
      styles={customStyles}
      placeholder='Выберите опцию'
      noOptionsMessage={() => 'Опций больше нет'}
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