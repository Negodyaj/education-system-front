import { Homework } from "../../interfaces/Homework";
import { HomeworksByGroup } from "../../store/state";
import { homeworkList } from "../tmp-mock-data/hw/homeworkList";

const INIT_HOMEWORK: Homework = { ...homeworkList[0] }

export const convertHomeworkListForTeacherMode = (actionPayload: Homework[]): HomeworksByGroup => {
    let previousGroupId: number | undefined = undefined;
    let result: HomeworksByGroup = {};
    actionPayload.map(hw => {
        if (hw.group.id === previousGroupId) {
            result[hw.group.id].push(hw)
        } else {
            if (result[hw.group.id] === undefined) {
                result[hw.group.id] = [...[INIT_HOMEWORK]]
            }
            if (result[hw.group.id].length === 1) result[hw.group.id][0] = hw;
            else result[hw.group.id].push(hw)
        }
        previousGroupId = hw.group.id;
    })
    return result;
}