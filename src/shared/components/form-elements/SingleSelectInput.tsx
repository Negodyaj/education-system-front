import { useFormContext } from "react-hook-form";
import { ExternalInputSettings } from "../../helpers/useFormRegisterSettingByKey";
import CustomMultiSelect from "../../../components/multi-select/CustomMultiSelect";


function SingleSelectInput(props: {
    inputSettings: ExternalInputSettings
}) {
    const formContext = useFormContext()
    return (
        <CustomMultiSelect
            selectType="single"
            inputSettings={props.inputSettings}
            formContext={formContext}></CustomMultiSelect>)
}
export default SingleSelectInput;