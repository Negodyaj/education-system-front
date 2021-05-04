import { Homework } from "../../interfaces/Homework";
import { IndexedObj } from "../../interfaces/IndexedObj";
import { homeworkList } from "../tmp-mock-data/hw/homeworkList";

const INIT_HOMEWORK: Homework = { ...homeworkList[0] }

export const convertHomeworkListForMethodistMode = (actionPayload: Homework[]): IndexedObj<Homework> => {
    let previousCourseName: string | undefined = undefined;
    let result: IndexedObj<Homework> = {};
    actionPayload.map(hw => {
        if (hw.group.course.name === previousCourseName) {
            result[hw.group.course.name].push(hw)
        } else {
            if (result[hw.group.course.name] === undefined) {
                result[hw.group.course.name] = [...[INIT_HOMEWORK]]
            }
            if (result[hw.group.course.name].length === 1) result[hw.group.course.name][0] = hw;
            else result[hw.group.course.name].push(hw)
        }
        previousCourseName = hw.group.course.name;
    })
    return result;
}