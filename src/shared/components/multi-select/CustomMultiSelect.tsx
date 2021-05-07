import { useState } from 'react';
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';
import Select, { ActionMeta, OptionsType } from 'react-select';

import { SelectItem } from '../../../interfaces/SelectItem';
import { convertEntitiesToSelectItems } from '../../converters/entityToSelectItem';
import {
  convertEnumToDictionary,
  getRussianDictionary,
} from '../../converters/enumToDictionaryEntity';
import { convertRoleIdsToSelectItems } from '../../converters/roleIdsToSelectItems';
import { ExternalInputSettings } from '../../helpers/useFormRegisterSettingByKey';

import { customStyles } from './multiSelectCosnts';

type selectType = 'single' | 'multi';

export const MultiSelect = (
  options: SelectItem[] | undefined,
  value: SelectItem[] | undefined,
  onChange:
    | (((value: OptionsType<any>, actionMeta: ActionMeta<any>) => void) &
        ((value: OptionsType<any>, action: ActionMeta<any>) => void))
    | undefined
) => (
  <Select
    isMulti
    name="Role"
    options={options}
    value={value}
    className="basic-multi-select"
    classNamePrefix="select"
    styles={customStyles}
    placeholder="Выберите опцию"
    noOptionsMessage={() => 'Опций больше нет'}
    onChange={onChange}
  />
);
export const SingleSelect = (
  options: SelectItem[] | undefined,
  value: any,
  onChange:
    | (((value: any, actionMeta: ActionMeta<any>) => void) &
        ((value: any, action: ActionMeta<any>) => void))
    | undefined
) => (
  <Select
    options={options}
    isMulti={false}
    value={value}
    styles={customStyles}
    placeholder="Выберите опцию"
    onChange={onChange}
  />
);
interface SelectProps {
  selectType: selectType;
  selectedOptions?: SelectItem[] | undefined;
  selectedOption?: SelectItem | undefined;
  options?: SelectItem[] | undefined;
  onMultiSelect?: (optionIds: number[]) => void;
  onSingleSelect?: (optionId: number | null) => void;
  inputSettings?: ExternalInputSettings;
  formContext?: UseFormReturn<FieldValues>;
}
function CustomMultiSelect(props: SelectProps) {
  const {
    selectType,
    selectedOptions,
    selectedOption,
    options,
    onMultiSelect,
    onSingleSelect,
    inputSettings,
    formContext,
  } = props;
  const [selectedOptionsState, setSelectedOptionsState] = useState<
    SelectItem[] | undefined
  >(selectedOptions?.length ? [...selectedOptions] : undefined);
  const [selectedOptionState, setSelectedOptionState] = useState<
    SelectItem | undefined
  >(selectedOption || undefined);
  const onMultiSelectLocal = (selectedOptionsArg: OptionsType<object>) => {
    setSelectedOptionsState(selectedOptionsArg as SelectItem[]);
    const roleIds = (selectedOptionsArg as SelectItem[]).map((i) => i.value);
    onMultiSelect && onMultiSelect(roleIds);
    inputSettings && formContext?.setValue(inputSettings.name || '', roleIds);
  };
  const onSingleSelectLocal = (selectedOptionArg: SelectItem | null) => {
    setSelectedOptionState(selectedOptionArg as SelectItem);
    onSingleSelect && onSingleSelect(selectedOption?.value || null);
    inputSettings &&
      formContext?.setValue(inputSettings.name, selectedOption?.value || null);
  };

  return inputSettings ? (
    <Controller
      control={formContext?.control}
      name={inputSettings.name}
      render={({ field: { value } }) =>
        props.selectType === 'multi'
          ? MultiSelect(
              convertEntitiesToSelectItems(
                getRussianDictionary(
                  convertEnumToDictionary(props.inputSettings?.selectOptions)
                )
              ),
              value !== undefined
                ? (() => {
                    if (value[0]?.label) {
                      return value;
                    }

                    return convertRoleIdsToSelectItems(value);
                  })()
                : undefined,
              onMultiSelectLocal
            )
          : SingleSelect(
              convertEntitiesToSelectItems(
                getRussianDictionary(
                  convertEnumToDictionary(inputSettings.selectOptions)
                )
              ),
              value !== undefined
                ? (() => {
                    if (value?.label) {
                      return value;
                    }

                    return convertRoleIdsToSelectItems(value);
                  })()
                : undefined,
              onSingleSelectLocal
            )
      }
    />
  ) : (
    <div>
      {selectType === 'multi' &&
        MultiSelect(options, selectedOptionsState, onMultiSelectLocal)}
      {selectType === 'single' &&
        SingleSelect(options, selectedOptionState, onSingleSelectLocal)}
    </div>
  );
}
export default CustomMultiSelect;
