import { useFormContext, UseFormRegister } from "react-hook-form";
import { UserInput } from "../../../interfaces/UserInput";

const ConnectForm = ({ children }:any) => {
    const methods = useFormContext();

    return children({ ...methods });
};

export default ConnectForm;