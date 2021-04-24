import { Controller, useFormContext } from "react-hook-form";
import Select from 'react-select'
import { convertEntitiesToSelectItems } from "../../../shared/converters/entityToSelectItemConverter";
import { convertEnumToDictionary, getRussianDictionary } from "../../../shared/converters/enumToDictionaryEntity";
import { convertRoleIdsToSelectItems } from "../../../shared/converters/roleIdsToSelectItems";
import { ExternalInputSettings } from "../../../shared/helpers/useFormRegisterSettingByKey";
import { customStyles } from "./multiSelectCosnts";

function MultiSelectInput(props: {
    inputSettings: ExternalInputSettings
}) {
    const formContext = useFormContext()
    return (
        <Controller
            control={formContext.control}
            name={props.inputSettings.name}
            render={({ field: { onChange, value, } }) => (
                <Select
                    isMulti={true}
                    name={props.inputSettings.name}
                    options={convertEntitiesToSelectItems(getRussianDictionary(convertEnumToDictionary(props.inputSettings.selectOptions)))}
                    value={convertRoleIdsToSelectItems(value)}
                    onChange={onChange}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    styles={customStyles}
                    placeholder='Выберите опцию'
                    noOptionsMessage={() => 'Опций больше нет'}
                />)} />)
}
export default MultiSelectInput;