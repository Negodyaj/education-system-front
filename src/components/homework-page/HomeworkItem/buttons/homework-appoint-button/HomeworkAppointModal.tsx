import { FormProvider, useForm } from "react-hook-form";
import { InputNames } from "../../../../../enums/inputNames";
import { AppointInput } from "../../../../../interfaces/AppointInput";
import FormElement from "../../../../../shared/components/form-elements/FormElement";
import { getAppointFormElementSettings } from "../../../../../shared/helpers/appointFormRegisterSettingsByKey";
import { CommonButton, RoundButton } from "../../../../../shared/styled-components/buttonStyledComponent";
import {
    AppointModalWindow,
    AppointModalWindowFooter,
    AppointModalWindowHeader,
    AppointModalWindowMain,
    ModalBg
} from "../../../styled-components/consts";

function HomeworkAppointModal(props: {
    visibility: boolean;
    setVisibility: (value: boolean) => void
}) {
    const onSubmit = (data: AppointInput) => {
        //dispatch(postAppointment(data))
    }
    const { register, formState, handleSubmit, getValues, setValue, ...methods } = useForm<AppointInput>();
    return (
        <FormProvider
            register={register}
            formState={formState}
            handleSubmit={handleSubmit}
            getValues={getValues} setValue={setValue} {...methods}>
            <ModalBg elementVisibility={props.visibility}>
                <AppointModalWindow elementVisibility={props.visibility}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <AppointModalWindowHeader>
                            <RoundButton onClick={() => props.setVisibility(!props.visibility)}>+</RoundButton>
                        </AppointModalWindowHeader>
                        <AppointModalWindowMain>
                            {
                                Object.keys({
                                    group: "",
                                    startDate: "",
                                    deadline: ""
                                }).map(key => {
                                    return <FormElement
                                        formElementSettings={getAppointFormElementSettings(key as InputNames)}
                                        key={key}></FormElement>
                                })
                            }
                        </AppointModalWindowMain>
                        <AppointModalWindowFooter>
                            <CommonButton as="button" type={"submit"} onClick={() => props.setVisibility(!props.visibility)}>Назначить</CommonButton>
                            <CommonButton onClick={() => props.setVisibility(!props.visibility)}>Отмена</CommonButton>
                        </AppointModalWindowFooter>
                    </form>
                </AppointModalWindow>
            </ModalBg>
        </FormProvider>
    )
}
export default HomeworkAppointModal;