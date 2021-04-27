export interface StateTypeLogin {
    isAuth: boolean,
    error: boolean,
    user: string,
}

export const initialStateLogin: StateTypeLogin = {
    isAuth: true,
    error: false,
    user: "Luke",
}

export const loginReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'AUTH_ALLOWED' :
            return {
                ...state,
                isAuth: true,
                error: false,
                user: action.payload.user
            }
        case 'AUTH_FAILED' :
            return {
                ...state,
                isAuth: false,
                error: true,
                user: ""
            }
        case 'AUTH_CLOSE' :
            return {
                ...state,
                isAuth: false,
                error: false,
                user: ""
            }
        default :
            throw new Error("Action not allowed!");
    }
}
