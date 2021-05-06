import { InputNames } from "../../enums/inputNames"
import { useGetGroupEntities } from "./entitiesGetters"
import { FormElementSettings } from "./userFormRegisterSettingByKey"

export const getAppointFormElementSettings = (key: InputNames): FormElementSettings => {
    //call getValidationPattern here
    switch (key) {
        case InputNames.AppointGroup:
            return {
                label: "группа",
                inputSettings: {
                    name: key,
                    inputType: 'multiSelect',
                    selectOptions: useGetGroupEntities
                }
            }
        case InputNames.AppointStartDate:
            return {
                label: "дата назначения",
                inputSettings: {
                    name: key,
                    inputType: "date"
                }
            }
        case InputNames.AppointDeadline:
            return {
                label: "дедлайн",
                inputSettings: {
                    name: key,
                    inputType: 'date'
                }
            }
        default: return {
            label: key,
            inputSettings: {
                name: key,
                inputType: 'text'
            }
        }
    }
}