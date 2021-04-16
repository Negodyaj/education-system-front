import { CURRENT_USER_ROLE_ID_SELECTED } from "../actionTypes";

export type AppActions =
    | ReturnType<typeof setCurrentUserRoleId>

export const setCurrentUserRoleId = (roleId: number) => {
    return ({
        type: CURRENT_USER_ROLE_ID_SELECTED,
        payload: roleId
    } as const);
}
