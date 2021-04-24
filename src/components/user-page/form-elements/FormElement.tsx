import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { InputNames } from "../../../enums/inputNames";
import { ExternalInputSettings, FormElementSettings } from "../../../shared/helpers/useFormRegisterSettingByKey";
import { getValidationPattern } from "../../../shared/validation-rules/validationPatterns";
import DateInput from "./DateInput";
import MultiSelectInput from "./MultiSelectInput";
import TextInput from "./TextInput";

function FormElement(props: {
    formElementSettings: FormElementSettings;
}) {
    const formContext = useFormContext();
    const inputType = props.formElementSettings.inputSettings.inputType;
    const inputSettings = { ...props.formElementSettings.inputSettings };
    inputSettings.registerOptions = {
        ...inputSettings.registerOptions,
        pattern: getValidationPattern(inputSettings.name as InputNames)
    };
    return (
        <div className="form-row">
            <label className="form-label">{props.formElementSettings.label}</label>
            {inputType === 'text' && <TextInput inputSettings={inputSettings}></TextInput>}
            {inputType === 'date' && <DateInput inputSettings={inputSettings as ExternalInputSettings}></DateInput>}
            {inputType === 'multiSelect' && <MultiSelectInput inputSettings={inputSettings as ExternalInputSettings}></MultiSelectInput>}
            {inputType === 'singleSelect' && <TextInput inputSettings={inputSettings}></TextInput>}
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