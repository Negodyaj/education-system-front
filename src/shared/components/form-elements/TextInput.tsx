import { useFormContext } from 'react-hook-form';

import { InputSettings } from '../../helpers/useFormRegisterSettingByKey';
import { InputText } from '../../styled-components/globalStyledConsts';

function TextInput(props: {
    inputSettings: InputSettings;
    onChange?: (...event: any[]) => void
    width?: number;
}) {
    const formContext = useFormContext()
    return (
        !props.onChange
            ?
            <InputText
                {...formContext.register(props.inputSettings.name, props.inputSettings.registerOptions)}
                type="text"
                className="form-input"
                width={props.width}
            />
            :
            <InputText
                {...formContext.register(props.inputSettings.name, props.inputSettings.registerOptions)}
                onChange={props.onChange}
                type="text"
                className="form-input"
                width={props.width}
            />
    )
}
export default TextInput;
