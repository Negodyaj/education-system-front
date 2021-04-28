import TextInput from "./text-input";

function FormElement(inputProps: {
    name: string
}) {
    return (<TextInput name={inputProps.name}></TextInput>)
}

export default FormElement;