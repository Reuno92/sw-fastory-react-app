
export const initialState = {
    loading: false,
    error: null,
    data: null,
    count: null,
    next: null,
    previous: null,
    payload: null,
    firstTime: true,
};

export const httpReducer = (currentHttpState: any, action: any) => {
    switch (action.type) {
        case "SEND":
            return {
                loading: true,
                error: null,
                data: null,
                payload: action.identifier,
                firstTime: false
            }
        case "RESPONSE":
            return {
                ...currentHttpState,
                loading: false,
                data: action.response,
                firstTime: false,
            }
        case "ERROR":
            return {
                loading: false,
                error: action.errorMessage,
                firstTime: false
            }
        case "CLEAR":
            return initialState
        default:
            throw new Error("should not be reached!")
    }
}
