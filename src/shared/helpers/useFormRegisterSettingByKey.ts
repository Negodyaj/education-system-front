import { RegisterOptions } from "react-hook-form";
import { InputNames } from "../../enums/inputNames";
export interface FormElementSettings {
    label: string;
    name: InputNames;
    options?: RegisterOptions;
}
export const getRegisterSettings = (key: InputNames): FormElementSettings => {
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
        case InputNames.UserPic:
            return {
                label: "Аватар",
                name: key,
                options: {
                    required: "Вставьте ссылку на изображение"
                }
            }
        case InputNames.Phone:
            return {
                label: "Телефон",
                name: key,
                options: {
                    required: "Введите номер телефона"
                }
            }
        case InputNames.BirthDate:
            return {
                label: "Дата рождения",
                name: key
            }
        case InputNames.Roles:
            return {
                label: "Роли",
                name: key
            }
        case InputNames.ContractNumber:
            return {
                label: "номер договора",
                name: key
            }
        default: return {
            label: key,
            name: key
        }
    }
}