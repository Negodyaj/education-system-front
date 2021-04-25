import { useFormContext } from "react-hook-form";
import { ExternalInputSettings } from "../../../shared/helpers/useFormRegisterSettingByKey";
import CustomMultiSelect, { MultiSelect } from "../../multi-select/CustomMultiSelect";


function MultiSelectInput(props: {
    inputSettings: ExternalInputSettings
}) {
    const formContext = useFormContext()
    return (
        <CustomMultiSelect
            selectType="multi"
            inputSettings={props.inputSettings}
            formContext={formContext}></CustomMultiSelect>
    )
}
export default MultiSelectInput;