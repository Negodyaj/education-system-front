
import { RegisterOptions } from "react-hook-form";
import { FormElementSettings } from "../../../shared/helpers/useFormRegisterSettingByKey";
import { getValidationPattern } from "../../../shared/validation-rules/validationPatterns";
import TextInput from "./TextInput";

export interface InputSettings {
    name: string;
    options: RegisterOptions;
}

function FormElement(props: {
    formElementSettings: FormElementSettings
}) {
    const inputSettings: InputSettings = {
        name: props.formElementSettings.name,
        options: {
            ...props.formElementSettings.options,
            pattern: getValidationPattern(props.formElementSettings.name)
        }
    }
    return (
        <div className="form-row">
            <label className="form-label">{props.formElementSettings.label}</label>
            <TextInput inputSettings={inputSettings}></TextInput>
        </div>
    )
}

export default FormElement;