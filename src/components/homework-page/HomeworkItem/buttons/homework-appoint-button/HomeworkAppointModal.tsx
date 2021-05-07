import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { InputNames } from "../../../../../enums/inputNames";
import { AppointInput } from "../../../../../interfaces/AppointInput";
import FormElement from "../../../../../shared/components/form-elements/FormElement";
import { getAppointFormElementSettings } from "../../../../../shared/helpers/appointFormRegisterSettingsByKey";
import { CommonButton, RoundButton } from "../../../../../shared/styled-components/buttonStyledComponent";
import { IRootState } from "../../../../../store";
import { getGroupsByTeacherId } from "../../../../../store/homework-page/homework-appoint-modal/thunk";
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
    const appState = useSelector((state: IRootState) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGroupsByTeacherId(appState.roleSelector.currentUserRoleId))
    }, [])
    const onSubmit = (data: AppointInput) => {
        //dispatch(postAppointment(data))
    }
    const { ...methods } = useForm<AppointInput>();
    return (
        <FormProvider {...methods}>
            <ModalBg elementVisibility={props.visibility}>
                <AppointModalWindow elementVisibility={props.visibility}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <AppointModalWindowHeader>
                            <RoundButton onClick={() => props.setVisibility(!props.visibility)}>
                                <FontAwesomeIcon icon='times' />
                            </RoundButton>
                        </AppointModalWindowHeader>
                        <AppointModalWindowMain>
                            {
                                Object.keys(appState.homeworkAppointModal.appointFormDefaults).map(key => {
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