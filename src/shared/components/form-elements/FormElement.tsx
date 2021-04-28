import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";
import { InputNames } from "../../../enums/inputNames";
import { ExternalInputSettings, FormElementSettings } from "../../helpers/useFormRegisterSettingByKey";
import { getValidationPattern } from "../../validation-rules/validationPatterns";
import DateInput from "./DateInput";
import MultiSelectInput from "./MultiSelectInput";
import PictureInput from "./PictureInput";
import SingleSelectInput from "./SingleSelectInput";
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