import { useSelector } from "react-redux";
import { DictionaryEntity } from "../../interfaces/DictionaryEntity";
import { IRootState } from "../../store";

export type EntitiesGetter = () => DictionaryEntity[];

export const useGetGroupEntities = () => {
    return useSelector((state: IRootState) => state.homeworkAppointModal.groupEntities)
}