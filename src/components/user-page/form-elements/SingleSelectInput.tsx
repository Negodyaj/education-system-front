import { Controller, useFormContext } from "react-hook-form";
import { convertEntitiesToSelectItems } from "../../../shared/converters/entityToSelectItemConverter";
import { convertEnumToDictionary, getRussianDictionary } from "../../../shared/converters/enumToDictionaryEntity";
import { convertRoleIdsToSelectItems } from "../../../shared/converters/roleIdsToSelectItems";
import { ExternalInputSettings } from "../../../shared/helpers/useFormRegisterSettingByKey";
import { MultiSelect, SingleSelect } from "../../multi-select/CustomMultiSelect";


function SingleSelectInput(props: {
    inputSettings: ExternalInputSettings
}) {
    const formContext = useFormContext()
    return (
        <Controller
            control={formContext.control}
            name={props.inputSettings.name}
            render={({ field: { onChange, value, } }) => {
                return SingleSelect(
                    convertEntitiesToSelectItems(
                        getRussianDictionary(convertEnumToDictionary(props.inputSettings.selectOptions))
                    ),
                    (value !== undefined ? value?.label ? value : convertRoleIdsToSelectItems(value) : undefined),
                    onChange)
            }} />)
}
export default SingleSelectInput;