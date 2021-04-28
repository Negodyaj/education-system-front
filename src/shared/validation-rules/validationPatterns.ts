import { InputNames } from "../../enums/inputNames";

export const getValidationPattern = (key: InputNames) => {
    switch (key) {
        case InputNames.FirstName || InputNames.LastName:
            return {
                value: /[A-Za-zА-Яа-я]/,
                message: "Допустимы только буквенные символы"
            }
        case InputNames.Login:
            return {
                value: /[a-z0-9]/,
                message: "Допустимы только строчные буквы и цифры"
            }
        case InputNames.Phone:
            return {
                value: /[0-9]/,
                message: "Допустимы только цифры"
            }
        case InputNames.UserPic:
            return {
                value: /\S/,
                message: "Недопустимый формат ссылки"
            }
    }
}