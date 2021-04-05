import { ChangeEvent } from "react";

export const validateName = (e: ChangeEvent<HTMLInputElement>) => {
    if (/([^a-zA-Zа-яА-Я\s])/.test(e.target.value)) {
        e.target.setCustomValidity('Это поле может содержать только буквенные символы');
    } else {
        e.target.setCustomValidity('');
    }
    return e.target.value.trimStart().trimEnd();
}