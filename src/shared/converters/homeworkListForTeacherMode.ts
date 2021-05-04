import { Homework } from "../../interfaces/Homework";
import { IndexedObj } from "../../interfaces/IndexedObj";
import { INIT_HOMEWORK } from "../tmp-mock-data/hw/initHomewwork";

export const convertHomeworkListForTeacherMode = (actionPayload: Homework[]): IndexedObj<Homework> => {
    let previousGroupId: number[] | undefined = undefined;
    let result: IndexedObj<Homework> = {};
    actionPayload.map(hw => {
        const index = `${hw.group.course.name} ${hw.group.startDate}`;
        if (previousGroupId?.includes(hw.group.id)) {
            result[index].push(hw)
        } else {
            if (result[index] === undefined) {
                result[index] = [INIT_HOMEWORK];
                result[index][0] = hw;
            } else result[index].push(hw)
        }
        previousGroupId?.push(hw.group.id);
    })
    return result;
}