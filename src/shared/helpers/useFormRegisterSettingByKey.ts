import { RegisterOptions } from "react-hook-form";
import { InputNames } from "../../enums/inputNames";
import { Role } from "../../enums/role";
import { DictionaryEntity } from "../../interfaces/DictionaryEntity";
import { convertEnumToDictionary, getRussianDictionary } from "../converters/enumToDictionaryEntity";
import { groupList } from "../tmp-mock-data/hw/groupList";
export interface BaseInputSettings {
    name: string;
    registerOptions?: RegisterOptions;
}
export interface InternalInputSettings extends BaseInputSettings {
    inputType: 'text' | 'date' | 'picture';
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
                    selectOptions: getRussianDictionary(convertEnumToDictionary(Role)),
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
        case InputNames.AppointGroup:
            return {
                label: "группа",
                inputSettings: {
                    name: key,
                    inputType: 'multiSelect',
                    selectOptions: groupList
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