import { useFormContext } from 'react-hook-form';
import { InputSettings } from '../../helpers/useFormRegisterSettingByKey';

function TextInput(props: {
    inputSettings: InputSettings;
    onChange?: (...event: any[]) => void
}) {
    const formContext = useFormContext()
    return (
        !props.onChange
            ?
            <input
                {...formContext.register(props.inputSettings.name, props.inputSettings.registerOptions)}
                type="text"
                className="form-input" />
            :
            <input
                {...formContext.register(props.inputSettings.name, props.inputSettings.registerOptions)}
                onChange={props.onChange}
                type="text"
                className="form-input" />
    )
}
export default TextInput;