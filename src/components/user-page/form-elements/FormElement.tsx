
import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { Role } from "../../../enums/role";
import DatePickerComponent from "../../../shared/components/date-picker/DatePickerComponent";
import { convertEntitiesToSelectItems } from "../../../shared/converters/entityToSelectItemConverter";
import { convertEnumToDictionary, getRussianDictionary } from "../../../shared/converters/enumToDictionaryEntity";
import { convertRoleIdsToSelectItems } from "../../../shared/converters/roleIdsToSelectItems";
import { FormElementSettings, getFormElementSettings, InputSettings } from "../../../shared/helpers/useFormRegisterSettingByKey";
import { getValidationPattern } from "../../../shared/validation-rules/validationPatterns";
import CustomMultiSelect from "../../multi-select/CustomMultiSelect";
import DateInput from "./DateInput";
import MultiSelectInput from "./MultiSelectInput";
import TextInput from "./TextInput";



function FormElement(props: {
    formElementSettings: FormElementSettings;
}) {
    const formContext = useFormContext();
    const inputType = props.formElementSettings.inputSettings.inputType;
    const inputSettings = props.formElementSettings.inputSettings;

    const multiSelectOnChange = (options: number[]) => {
        formContext.setValue(inputSettings.name, options);
    }
    return (
        <div className="form-row">
            <label className="form-label">{props.formElementSettings.label}</label>
            {
                inputType === 'text' && <TextInput inputSettings={inputSettings}></TextInput>
            }
            {
                inputType === 'date' && <DateInput inputSettings={inputSettings}></DateInput>
            }
            {
                inputType === 'multiSelect' && <CustomMultiSelect
                    {...formContext.register(inputSettings.name)}
                    selectType={"multi"}
                    //selectedOptions={convertRoleIdsToSelectItems(formContext.getValues(inputSettings.name) || []) || undefined}
                    options={convertEntitiesToSelectItems(getRussianDictionary(convertEnumToDictionary(Role)))}
                    onMultiSelect={multiSelectOnChange}></CustomMultiSelect>
            }
            {
                inputType === 'singleSelect' && <TextInput inputSettings={inputSettings}></TextInput>
            }
            <ErrorMessage
                errors={formContext.formState.errors}
                name={inputSettings.name}
                className="bad-feedback"
                as="div">
            </ErrorMessage>
        </div>
    )
}

export default FormElement;