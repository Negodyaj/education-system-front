import { 
    CURRENT_USER_LOGGED_IN, 
    CURRENT_USER_LOGGED_OUT, 
    INCREASE_LOADERS_COUNT,
    DECREASE_LOADERS_COUNT,
} from "../actionTypes";

export type AppActions =
    | ReturnType<typeof setIsLoggedOut>
    | ReturnType<typeof setIsLoggedIn>
    | ReturnType<typeof setIsLoading>
    | ReturnType<typeof setIsLoaded>

export const setIsLoggedOut = () => {
    return ({
        type: CURRENT_USER_LOGGED_OUT,
        payload: undefined
    } as const);
}
export const setIsLoggedIn = () => {
    return ({
        type: CURRENT_USER_LOGGED_IN,
        payload: undefined
    } as const);
}
export const setIsLoading = () => {
    return ({
        type: INCREASE_LOADERS_COUNT,
        payload: undefined
    } as const);
}
export const setIsLoaded = () => {
    return ({
        type: DECREASE_LOADERS_COUNT,
        payload: undefined
    } as const);
}
