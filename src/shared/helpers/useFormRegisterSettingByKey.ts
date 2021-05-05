import { RegisterOptions } from "react-hook-form";
import { InputNames } from "../../enums/inputNames";
import { Role } from "../../enums/role";
import NewLesson from "../../components/group-page/lesson-list-component/NewLesson";

export interface BaseInputSettings {
    name: string;
    registerOptions?: RegisterOptions;
}
export  interface InternalInputSettings extends BaseInputSettings {
    inputType: 'text' | 'date' | 'picture' | 'number' | 'textarea';
}
export interface ExternalInputSettings extends BaseInputSettings {
    inputType: 'singleSelect' | 'multiSelect';
    selectOptions: { [index: number]: string }
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
                    selectOptions: Role,
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
        case InputNames.LessonDescription:
            return {
                label: "Описание занятия",
                inputSettings: {
                    name: key,
                    inputType: "text",
                    registerOptions: {
                        required: "Введите описание занятия",
                        min: {
                            value: 2,
                            message: 'Минимальное колличество символов 2'
                        }
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
                        min: {
                            value: 10,
                            message: 'Требуется ввести дату в формате 01-01-2000'
                        }
                    }
                }
            }
        case InputNames.LessonThemesId:
            return {
                label: "Темы занятия",
                inputSettings: {
                    name: key,
                    inputType: 'multiSelect',
                    selectOptions: Role,
                    registerOptions: {
                        required: "Выберите темы занятия"
                    }
                }
            }
        case InputNames.LessonRecordLink:
            return {
                label: "Ссылка на запись занятия",
                inputSettings: {
                    name: key,
                    inputType: "text",
                    registerOptions: {
                        required: "Укажите ссылку на запись занятия"
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