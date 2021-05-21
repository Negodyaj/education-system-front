import React from 'react';
import { useFormContext } from 'react-hook-form';
import { InputSettings } from '../../helpers/userFormRegisterSettingByKey';
import { TextareaStyled } from '../../styled-components/globalStyledConsts';

import { InputSettings } from '../../helpers/userFormRegisterSettingByKey';

function TextAreaInput(props: {
    inputSettings: InputSettings;
    onChange?: (...event: any[]) => void;
    width: number
}) {
    const formContext = useFormContext()
    return (
        !props.onChange
            ?
            <TextareaStyled
                {...formContext.register(props.inputSettings.name, props.inputSettings.registerOptions)}
                typeof='text'
                width={props.width}
            />
            :
            <TextareaStyled
                {...formContext.register(props.inputSettings.name, props.inputSettings.registerOptions)}
                onChange={props.onChange}
                typeof='text'
                width={props.width}
            />
    )
}
export default TextAreaInput;
