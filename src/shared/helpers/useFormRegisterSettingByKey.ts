import { RegisterOptions } from "react-hook-form";
import { InputNames } from "../../enums/inputNames";
import { getValidationRule } from "../validation-rules/validationRules";
export interface InputSettings {
    label: string;
    name: InputNames;
    options?: RegisterOptions;
}
export const getRegisterSettings = (key: InputNames): InputSettings => {
    switch (key) {
        case InputNames.Id:
            return {
                label: "Id",
                name: key,
            }
        case InputNames.FirstName:
            return {
                label: "Имя",
                name: key,
                options: {
                    required: "Введите имя"
                }
            };
        case InputNames.LastName:
            return {
                label: "Фамилия",
                name: key,
                options: {
                    required: "Введите фамилию"
                }
            };
        case InputNames.Login:
            return {
                label: "Логин",
                name: key,
                options: {
                    required: "Введите логин"
                }
            };
        case InputNames.Password:
            return {
                label: "Пароль",
                name: key,
                options: {
                    required: "Введите пароль"
                }
            }
        default: return {
            label: key,
            name: key
        }
    }
}