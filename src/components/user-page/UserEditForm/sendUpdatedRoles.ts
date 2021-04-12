import { sendDeleteRequest, sendPostRequest } from "../../../services/http.service";
import { responseHandlers } from "../../../services/response-handler/responseHandler";

export const getPostOrDeleteRolesRequest = (currentRoleIds:number[], updatedRoleIds:number[]) => {
    const emptyReturnFunc = () => {}
    let rolesForPostQueue:number[];
    let rolesForDeleteQueue:number[];
    let quantityToSend:number;
    currentRoleIds.length > 0 ? quantityToSend = [...currentRoleIds].filter(r => updatedRoleIds.includes(r) && r).length : quantityToSend = 0;
    if (quantityToSend && quantityToSend === currentRoleIds.length){
        return [emptyReturnFunc];
    } else if (quantityToSend > currentRoleIds.length){
        rolesForPostQueue = updatedRoleIds.filter(r => !currentRoleIds.includes(r) && r);
        return [sendPostRequest, rolesForPostQueue, responseHandlers[]];
    } else {
        rolesForDeleteQueue = currentRoleIds.filter(r => !updatedRoleIds.includes(r) && r);
        return [sendDeleteRequest, rolesForDeleteQueue, responseHandlers[]];
    }
}