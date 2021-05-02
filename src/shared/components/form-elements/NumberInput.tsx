import { useFormContext } from 'react-hook-form';
import { InputSettings } from '../../helpers/useFormRegisterSettingByKey';

function NumberInput(props: {
    inputSettings: InputSettings;
    onChange?: (...event: any[]) => void
}) {
    const formContext = useFormContext()
    return (
        !props.onChange
            ?
            <input
                {...formContext.register(props.inputSettings.name, props.inputSettings.registerOptions)}
                type="number"
                className="form-input" />
            :
            <input
                {...formContext.register(props.inputSettings.name, props.inputSettings.registerOptions)}
                onChange={props.onChange}
                type="number"
                className="form-input" />
    )
}
export default NumberInput;