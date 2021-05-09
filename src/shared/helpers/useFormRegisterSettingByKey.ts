import { RegisterOptions } from 'react-hook-form';

import { InputNames } from '../../enums/inputNames';
import { Role } from '../../enums/role';
export interface BaseInputSettings {
  name: string;
  registerOptions?: RegisterOptions;
}
export interface InternalInputSettings extends BaseInputSettings {
  inputType: 'text' | 'date' | 'picture' | 'number' | 'textarea';
}
export interface ExternalInputSettings extends BaseInputSettings {
  inputType: 'singleSelect' | 'multiSelect';
  selectOptions: { [index: number]: string };
}
export type InputSettings = InternalInputSettings | ExternalInputSettings;
export interface FormElementSettings {
    label: string;
    inputSettings: InputSettings;
    width: number;
}

const baseSettings: FormElementSettings = {
    width: 272,
    label: "",
    inputSettings: {
        name: "",
        inputType: "text",
        registerOptions: {
            required: false
        }
    }
}

export const getFormElementSettings = (key: InputNames): FormElementSettings => {
    //call getValidationPattern here
    switch (key) {
        case InputNames.Id:
            return {
                ...baseSettings,
                label: "Id",
                inputSettings: {
                    name: key,
                    inputType: 'text'
                }
            }
        case InputNames.FirstName:
            return {
                ...baseSettings,
                label: "Имя",
                inputSettings: {
                    name: key,
                    inputType: 'text',
                    registerOptions: {
                        required: "Введите имя"
                    },
                }
            };
        case InputNames.LastName:
            return {
                ...baseSettings,
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
                ...baseSettings,
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
                ...baseSettings,
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
                ...baseSettings,
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
                ...baseSettings,
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
                ...baseSettings,
                label: "Дата рождения",
                inputSettings: {
                    inputType: 'date',
                    name: key
                }
            }
        case InputNames.Roles:
            return {
                ...baseSettings,
                label: "Роли",
                inputSettings: {
                    inputType: 'multiSelect',
                    selectOptions: Role,
                    name: key
                }
            }
        case InputNames.ContractNumber:
            return {
                ...baseSettings,
                label: "номер договора",
                inputSettings: {
                    name: key,
                    inputType: 'text'
                }
            }
        default: return {
            ...baseSettings,
            label: key,
            inputSettings: {
                name: key,
                inputType: "text"
            }
        }
    }
}

export const getCourseFormElementSettings = (key: InputNames): FormElementSettings => {
    switch (key) {
        case InputNames.CourseName:
            return {
                ...baseSettings,
                label: 'Название курса',
                inputSettings: {
                    name: key,
                    inputType: 'text'
                },
                width: 450
            }
        case InputNames.CourseDescription:
            return {
                ...baseSettings,
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
                },
                width: 450
            }
        case InputNames.CourseDuration:
            return {
                ...baseSettings,
                label: "Продолжительность курса",
                inputSettings: {
                    name: key,
                    inputType: "number",
                    registerOptions: {
                        required: "Введите продолжительность курса"
                    }
                },
                width: 100
            }
        default: return {
            ...baseSettings,
            label: key,
            inputSettings: {
                name: key,
                inputType: "text"
            }
        }
    }
}