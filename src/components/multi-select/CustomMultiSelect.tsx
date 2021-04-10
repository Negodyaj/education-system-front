import { NONAME } from 'node:dns';
import { useEffect, useState } from 'react'
import Select, { NonceProvider, OptionsType } from 'react-select'
import { reduceEachTrailingCommentRange } from 'typescript';
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
  }

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      height: 40,
      border: state.isFocused 
        ? "2px solid " + customStyleColors.main 
        : "1px solid " + customStyleColors.shadow,
      ':hover': {
        border: state.isFocused 
          ? "2px solid " + customStyleColors.main 
          : "1px solid " + customStyleColors.main,
      },
      borderRadius: 20,
      boxShadow: "0px 3px 6px " + customStyleColors.shadow,
      padding: "0px 5px",
      outline: 'none',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      borderRadius: 20,
      height: 40,
      color: state.isSelected
        ? 'white' 
        : 'black',
      backgroundColor: state.isSelected
        ? customStyleColors.main
        : state.isFocused 
        ? customStyleColors.light 
        : 'white',
    }),
    menu: (provided: any, state: any) => ({
      ...provided,
      margin: 0,
      borderRadius: 20,
    }),
    menuList: (provided: any, state: any) => ({
      ...provided,
      padding: 0,
    })
    // option: (provided: any, state: any) => ({
    //   ...provided,
    //   borderBottom: '1px dotted pink',
    //   color: state.isSelected ? 'red' : 'blue',
    //   padding: 20,
    // }),
    // control: () => ({
    //   // none of react-select's styles are passed to <Control />
    //   width: 200,
    // }),
    // singleValue: (provided: any, state: any) => {
    //   const opacity = state.isDisabled ? 0.5 : 1;
    //   const transition = 'opacity 300ms';
  
    //   return { ...provided, opacity, transition };
    // }
  }

  const SingleSelect = () => (
    <Select 
      options={props.options} 
      styles={customStyles}/>
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