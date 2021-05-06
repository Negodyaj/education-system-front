import { InputNames } from "../../enums/inputNames";

export const getLessonValidationPattern = (key: InputNames) => {
    switch (key) {
        case InputNames.LessonDate:
            return {
                value: /[0-9]/,
                message: "Допустим ввод даты только в формате 01-01-2001"
            }
/*         case InputNames.LessonRecordLink:
            return {
                value: /\S/,
                message: "Недопустимый формат ссылки"
            } */
    }
}