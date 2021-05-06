import { RegisterOptions } from "react-hook-form";
import { InputNames } from "../../enums/inputNames";
import { Role } from "../../enums/role";
import { DictionaryEntity } from "../../interfaces/DictionaryEntity";
import { themeList } from "../tmp-mock-data/themeList";

export interface BaseInputSettings {
    name: string;
    registerOptions?: RegisterOptions;
}
export  interface InternalInputSettings extends BaseInputSettings {
    inputType: 'text' | 'date' | 'picture' | 'number' | 'textarea';
}
export interface ExternalInputSettings extends BaseInputSettings {
    inputType: 'singleSelect' | 'multiSelect';
    selectOptions: DictionaryEntity[]
}
export type InputSettings = InternalInputSettings | ExternalInputSettings;
export interface FormElementSettings {
    label: string;
    inputSettings: InputSettings;
}
export const getFormElementSettings = (key: InputNames): FormElementSettings => {
    //call getValidationPattern here
    switch (key) {
        case InputNames.Id:
            return {
                label: "Id",
                inputSettings: {
                    name: key,
                    inputType: 'text'
                }
            }
        case InputNames.FirstName:
            return {
                label: "Имя",
                inputSettings: {
                    name: key,
                    inputType: 'text',
                    registerOptions: {
                        required: "Введите имя"
                    }
                }
            };
        case InputNames.LastName:
            return {
                label: "Фамилия",
                inputSettings: {
                    name: key,
                    inputType: 'text',
                    registerOptions: {
                        required: "Введите фамилию"
                    }
                }
            };
        case InputNames.Login:
            return {
                label: "Логин",
                inputSettings: {
                    name: key,
                    inputType: 'text',
                    registerOptions: {
                        required: "Введите логин"
                    }
                }
            };
        case InputNames.Password:
            return {
                label: "Пароль",
                inputSettings: {
                    name: key,
                    inputType: 'text',
                    registerOptions: {
                        required: "Введите пароль"
                    }
                }
            }
        case InputNames.UserPic:
            return {
                label: "Аватар",
                inputSettings: {
                    name: key,
                    inputType: 'picture',
                    registerOptions: {
                        required: "Вставьте ссылку на изображение"
                    }
                }
            }
        case InputNames.Phone:
            return {
                label: "Телефон",
                inputSettings: {
                    name: key,
                    inputType: 'text',
                    registerOptions: {
                        required: "Введите номер телефона"
                    }
                }
            }
        case InputNames.BirthDate:
            return {
                label: "Дата рождения",
                inputSettings: {
                    inputType: 'date',
                    name: key
                }
            }
        case InputNames.Roles:
            return {
                label: "Роли",
                inputSettings: {
                    inputType: 'multiSelect',
                    selectOptions: themeList,
                    name: key
                }
            }
        case InputNames.ContractNumber:
            return {
                label: "номер договора",
                inputSettings: {
                    name: key,
                    inputType: 'text'
                }
            }
        case InputNames.CourseName:
            return {
                label: "Название курса",
                inputSettings: {
                    name: key,
                    inputType: "text",
                    registerOptions: {
                        required: "Введите название курса",
                        min: {
                            value: 2,
                            message: 'Минимальное колличество символов 2'
                        }
                    }
                }
            }
        case InputNames.CourseDescription:
            return {
                label: "Описание курса",
                inputSettings: {
                    name: key,
                    inputType: "textarea",
                    registerOptions: {
                        required: "Введите описание курса",
                        min: {
                            value: 2,
                            message: 'Минимальное колличество символов 2'
                        }
                    }
                }
            }
        case InputNames.CourseDuration:
            return {
                label: "Продолжительность курса",
                inputSettings: {
                    name: key,
                    inputType: "number",
                    registerOptions: {
                        required: "Введите продолжительность курса"
                    }
                }
            }
        default: return {
            label: key,
            inputSettings: {
                name: key,
                inputType: "text"
            }
        }
    }
}

