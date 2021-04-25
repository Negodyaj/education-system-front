import { Controller, useFormContext } from "react-hook-form";
import { ExternalInputSettings } from "../../../shared/helpers/useFormRegisterSettingByKey";
import TextInput from "./TextInput";

function PictureInput(props: {
    inputSettings: ExternalInputSettings
}) {
    const formContext = useFormContext();
    return (
        <Controller
            control={formContext.control}
            name={props.inputSettings.name}
            render={({ field: { onChange, value, } }) => {
                return (
                    <>
                        <TextInput inputSettings={props.inputSettings} onChange={onChange}></TextInput>
                        <img src={value} alt="аватар" />
                    </>
                )
            }} />)
}
export default PictureInput;