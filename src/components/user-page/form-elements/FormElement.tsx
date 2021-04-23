import React from "react";
import { InputSettings } from "../../../shared/helpers/useFormRegisterSettingByKey";
import { getValidationPattern } from "../../../shared/validation-rules/validationPatterns";
import TextInput from "./TextInput";

function FormElement(inputProps: {
    settings: InputSettings
}) {
    return (<TextInput name={inputProps.settings.name} label={inputProps.settings.label} options={{
        required: inputProps.settings.options?.required,
        pattern: getValidationPattern(inputProps.settings.name)
    }}></TextInput>)
}

export default FormElement;