import { InputNames } from "../../enums/inputNames"
import { Role } from "../../enums/role"
import { themeList } from "../tmp-mock-data/themeList"
import { getLessonValidationPattern } from "../validation-rules/lessonValidationPatterns"
import { FormElementSettings } from "./useFormRegisterSettingByKey"

export const getLessonFormElementSettings = (key: InputNames): FormElementSettings => {
    switch (key) {
        case InputNames.LessonDescription:
            return {
                label: "Описание занятия",
                inputSettings: {
                    name: key,
                    inputType: "textarea",
                    registerOptions: {
                        required: "Введите описание занятия",
                    }
                }
            }
        case InputNames.LessonDate:
            return {
                label: "Дата занятия",
                inputSettings: {
                    name: key,
                    inputType: "text",
                    registerOptions: {
                        required: "Введите дату занятия",
                        pattern: getLessonValidationPattern(key)
                    }
                }
            }
        case InputNames.LessonThemesId:
            return {
                label: "Темы занятия",
                inputSettings: {
                    name: key,
                    inputType: 'multiSelect',
                    selectOptions: themeList,
                    registerOptions: {
                        required: "Выберите темы занятия"
                    }
                }
            }
        /* case InputNames.LessonRecordLink:
            return {
                label: "Ссылка на запись занятия",
                inputSettings: {
                    name: key,
                    inputType: "text",
                    registerOptions: {
                        required: "Укажите ссылку на запись занятия",
                        pattern: getLessonValidationPattern(key)
                    }
                }
            } */
        default: return {
            label: key,
            inputSettings: {
                name: key,
                inputType: "text"
            }
        }
    }
}