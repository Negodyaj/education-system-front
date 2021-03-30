import { ChangeEvent } from "react";

export const validateTopLevelDomain = (e: ChangeEvent<HTMLInputElement>) => {
    if (!(/(\w+)\.(\w+)/.test(e.target.value))) {
        e.target.setCustomValidity('Неверно введён адрес');
    } else {
        e.target.setCustomValidity('');
    }
    return e.target.value.trimStart().trimEnd();
}