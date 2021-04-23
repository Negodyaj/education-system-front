import { UserInput } from "../../../interfaces/UserInput";
import { ErrorMessage } from '@hookform/error-message';
import { RegisterOptions, useFormContext } from "react-hook-form";
import { InputNames } from "../../../enums/inputNames";

interface TextInputProps {
    name: InputNames;
    options? :RegisterOptions;
}



function TextInput(props: TextInputProps) {
    const formContext = useFormContext()
    return (
        <div className="form-row">
            <label className="form-label">Имя</label>
            <input
                {...formContext.register(props.name, props.options)}
                type="text"
                className="form-input" />
            <ErrorMessage
                errors={formContext.formState.errors}
                name={"firstName"}
                className="bad-feedback"
                as="div">
            </ErrorMessage>
        </div>
    )
}

export default TextInput;