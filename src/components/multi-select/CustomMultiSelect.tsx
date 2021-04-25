import { useState } from 'react'
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';
import Select, { ActionMeta, OptionsType } from 'react-select'
import { SelectItem } from '../../interfaces/SelectItem';
import { convertEntitiesToSelectItems } from '../../shared/converters/entityToSelectItemConverter';
import { convertEnumToDictionary, getRussianDictionary } from '../../shared/converters/enumToDictionaryEntity';
import { convertRoleIdsToSelectItems } from '../../shared/converters/roleIdsToSelectItems';
import { ExternalInputSettings } from '../../shared/helpers/useFormRegisterSettingByKey';
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
  selectType: selectType;
  selectedOptions?: SelectItem[] | undefined;
  selectedOption?: SelectItem | undefined;
  options?: SelectItem[] | undefined;
  onMultiSelect?: (optionIds: number[]) => void;
  onSingleSelect?: (optionId: number | null) => void;
  inputSettings?: ExternalInputSettings;
  formContext?: UseFormReturn<FieldValues>
}
function CustomMultiSelect(props: SelectProps) {
  const [selectedOptions, setSelectedOptions] = useState<SelectItem[] | undefined>(props.selectedOptions?.length ? [...props.selectedOptions] : undefined);
  const [selectedOption, setSelectedOption] = useState<SelectItem | undefined>(props.selectedOption || undefined)
  const onMultiSelect = (selectedOptions: OptionsType<object>) => {
    setSelectedOptions(selectedOptions as SelectItem[])
    let roleIds = (selectedOptions as SelectItem[]).map(i => i.value)
    props.onMultiSelect && props.onMultiSelect(roleIds);
    props.inputSettings && props.formContext?.setValue(props.inputSettings.name, roleIds)
  }
  const onSingleSelect = (selectedOption: SelectItem | null) => {
    setSelectedOption(selectedOption as SelectItem)
    props.onSingleSelect && props.onSingleSelect(selectedOption?.value || null)
    props.inputSettings && props.formContext?.setValue(props.inputSettings.name, selectedOption?.value || null)
  }
  return (
    props.inputSettings
      ?
      <Controller
        control={props.formContext?.control}
        name={props.inputSettings.name}
        render={({ field: { value, } }) => {
          return props.selectType === 'multi'
            ?
            MultiSelect(
              convertEntitiesToSelectItems(
                getRussianDictionary(convertEnumToDictionary(props.inputSettings?.selectOptions))
              ),
              (value !== undefined ? value[0]?.label ? value : convertRoleIdsToSelectItems(value) : undefined),
              onMultiSelect)
            :
            SingleSelect(
              convertEntitiesToSelectItems(
                getRussianDictionary(convertEnumToDictionary(props.inputSettings?.selectOptions))
              ),
              (value !== undefined ? value?.label ? value : convertRoleIdsToSelectItems(value) : undefined),
              onSingleSelect)
        }} />
      :
      <div>
        {props.selectType === 'multi' && MultiSelect(props.options, selectedOptions, onMultiSelect)}
        {props.selectType === 'single' && SingleSelect(props.options, selectedOption, onSingleSelect)}
      </div>
  )
}
export default CustomMultiSelect;