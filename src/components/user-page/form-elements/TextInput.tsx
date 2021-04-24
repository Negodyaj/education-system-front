import { useFormContext } from 'react-hook-form';
import { InputSettings } from '../../../shared/helpers/useFormRegisterSettingByKey';

function TextInput(props: {
    inputSettings: InputSettings
}) {
    const formContext = useFormContext()
    return (
        <input
            {...formContext.register(props.inputSettings.name, props.inputSettings.registerOptions)}
            type="text"
            className="form-input" />
    )
}
export default TextInput;