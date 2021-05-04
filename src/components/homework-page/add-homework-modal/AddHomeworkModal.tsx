import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { InputNames } from "../../../enums/inputNames";
import { HomeworkInput } from "../../../interfaces/HomeworkInput";
import FormElement from "../../../shared/components/form-elements/FormElement"
import { getFormElementSettings } from "../../../shared/helpers/useFormRegisterSettingByKey";
import { IRootState } from "../../../store";
import { addHomework } from "../../../store/homework-page/add-homework-modal/thunk";
import { HomeworkModalContainer } from "../styled-components/st-components-for-modalw"

function AddHomeworkModal() {
    const { register, formState, handleSubmit, getValues, setValue, ...methods } = useForm<HomeworkInput>();
    const dispatch = useDispatch();
    const onSubmit = (data: HomeworkInput) => dispatch(addHomework(data))
    const addHomeWorkModal = useSelector((state: IRootState) => { return state.addHomeWorkModal })
    return (
        <HomeworkModalContainer>
            <FormProvider
                register={register}
                formState={formState}
                handleSubmit={handleSubmit}
                getValues={getValues} setValue={setValue} {...methods}>
                <div className={"needs-validation was-validated"}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {
                            Object.keys(addHomeWorkModal.defaultFormValue).map(key => {
                                return <FormElement
                                    formElementSettings={getFormElementSettings(key as InputNames)}
                                    key={key}></FormElement>
                            })
                        }
                    </form>
                </div >
            </FormProvider>
        </HomeworkModalContainer>
    )
}

export default AddHomeworkModal