import { useFormContext } from "react-hook-form";
import { Role } from "../../../enums/role";
import { convertEntitiesToSelectItems } from "../../../shared/converters/entityToSelectItemConverter";
import { convertEnumToDictionary, getRussianDictionary } from "../../../shared/converters/enumToDictionaryEntity";
import { convertRoleIdsToSelectItems } from "../../../shared/converters/roleIdsToSelectItems";
import { InputSettings } from "../../../shared/helpers/useFormRegisterSettingByKey";
import CustomMultiSelect from "../../multi-select/CustomMultiSelect";

function MultiSelectInput(props: {
    inputSettings: InputSettings
}) {
    const formContext = useFormContext()
    const multiSelectOnChange = (options: number[]) => {
        formContext.setValue(props.inputSettings.name, options);
    }
    return (
        <CustomMultiSelect
            {...formContext.register(props.inputSettings.name)}
            selectType={"multi"}
            selectedOptions={convertRoleIdsToSelectItems(formContext.getValues(props.inputSettings.name) || []) || undefined}
            options={convertEntitiesToSelectItems(getRussianDictionary(convertEnumToDictionary(Role)))}
            onMultiSelect={multiSelectOnChange}></CustomMultiSelect>)
}

export default MultiSelectInput;