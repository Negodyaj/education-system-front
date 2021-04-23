import { UserInput } from "../../../interfaces/UserInput";
import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from "react-hook-form";

interface TextInputProps{
    name: string;
}

function TextInput(props:TextInputProps) {
    const { register, formState } = useFormContext();
    return (
        <div className="form-row">
            <label className="form-label">Имя</label>
            <input
                {...register(props.name, {
                    required: {
                        value: true,
                        message: "Введите имя"
                    },
                    pattern: {
                        value: /[A-Za-zА-Яа-я]/,
                        message: "Допустимы только буквенные символы"
                    }
                })}
                type="text"
                className="form-input" />
            <ErrorMessage
                errors={formState.errors}
                name={"firstName"}
                className="bad-feedback"
                as="div">
            </ErrorMessage>
        </div>
    )
}

export default TextInput;