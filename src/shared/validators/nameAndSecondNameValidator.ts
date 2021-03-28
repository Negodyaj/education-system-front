import { ChangeEvent } from "react";

export const validateNameAndSecondName = (e: ChangeEvent<HTMLInputElement>) => {
    if (/!@"#№\$;%\^:&\?\*\(\)_-\+=/.test(e.target.value)) {
        e.target.setCustomValidity('Это поле может содержать только буквенные символы');
    } else {
        e.target.setCustomValidity('');
    }
    return e.target.value.trimStart().trimEnd();
}