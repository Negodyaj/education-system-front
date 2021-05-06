import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { useFormContext } from "react-hook-form";
import { InputNames } from "../../../enums/inputNames";
import { ExternalInputSettings, FormElementSettings } from "../../helpers/userFormRegisterSettingByKey";
import { getValidationPattern } from "../../validation-rules/validationPatterns";
import DateInput from "./DateInput";
import MultiSelectInput from "./MultiSelectInput";
import NumberInput from "./NumberInput";
import PictureInput from "./PictureInput";
import SingleSelectInput from "./SingleSelectInput";
import TextAreaInput from "./TextareaInput";
import TextInput from "./TextInput";


function FormElement(props: {
    formElementSettings: FormElementSettings;
}) {
    const formContext = useFormContext();
    const inputType = props.formElementSettings.inputSettings.inputType;
    const inputSettings = { ...props.formElementSettings.inputSettings };
    return (
        <div className="form-row">
            <label className="form-label">{props.formElementSettings.label}</label>
            {inputType === 'text' && <TextInput inputSettings={inputSettings}></TextInput>}
            {inputType === 'textarea' && <TextAreaInput inputSettings={inputSettings}></TextAreaInput>}
            {inputType === 'number' && <NumberInput inputSettings={inputSettings}></NumberInput>}
            {inputType === 'date' && <DateInput inputSettings={inputSettings as ExternalInputSettings}></DateInput>}
            {inputType === 'multiSelect' && <MultiSelectInput inputSettings={inputSettings as ExternalInputSettings}></MultiSelectInput>}
            {inputType === 'singleSelect' && <SingleSelectInput inputSettings={inputSettings as ExternalInputSettings}></SingleSelectInput>}
            {inputType === 'picture' && <PictureInput inputSettings={inputSettings as ExternalInputSettings}></PictureInput>}
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