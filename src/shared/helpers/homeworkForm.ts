import { InputNames } from "../../enums/inputNames"
import { coursesListForModalHW } from "../tmp-mock-data/hw/CourseListForHWModal"
import { useCoursesForHomeworkAddModal } from "./entitiesGetters"
import { FormElementSettings } from "./userFormRegisterSettingByKey"

export const homeworkForm = (
    key: InputNames
): FormElementSettings => {
    switch (key) {

        case InputNames.HomeworkDescription:

            return {
                label: "Описание домашней работы",
                inputSettings: {
                    name: key,
                    inputType: 'text',
                    registerOptions: {
                        required: "Введите описание",
                        min: {
                            value: 10,
                            message: "Не менее 10 символов"
                        }

                    }
                }
            }
        case InputNames.HomeworkCourseId:
            return {
                label: "Курс",
                inputSettings: {
                    name: key,
                    inputType: "singleSelect",
                    selectOptions: useCoursesForHomeworkAddModal,
                }
            }
        
        default:
          return {
            label: key,
            inputSettings: {
              name: key,
              inputType: 'text',
            },
          };
    }
}