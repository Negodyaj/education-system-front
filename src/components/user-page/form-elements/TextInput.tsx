import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';
import { InputSettings } from './FormElement';

function TextInput(props: {
    inputSettings: InputSettings
}) {
    console.log(props.inputSettings)
    const formContext = useFormContext()
    return (
        <>
            <input
                {...formContext.register(props.inputSettings.name, props.inputSettings.options)}
                type="text"
                className="form-input" />
            <ErrorMessage
                errors={formContext.formState.errors}
                name={props.inputSettings.name}
                className="bad-feedback"
                as="div">
            </ErrorMessage>
        </>
    )
}
export default TextInput;