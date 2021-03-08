import { 
    AUTH_ERROR,
    REGISTER_FAIL,
    REGISTER_SUCESS, 
    USER_LOADED,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE,
    DELETE_ACCOUNT
} from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuth: null,
    loading: true,
    user: null
};

export default function(state=initialState, action){
    const {type, payload} = action
    switch (type) {
        case LOGIN_SUCCESS:
        case REGISTER_SUCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuth: true,
                loading: false
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case DELETE_ACCOUNT: 
        case LOGOUT:
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                isAuth: false,
                loading: false
            }
        case USER_LOADED:
            return {
                ...state,
                isAuth: true,
                loading: false,
                user: payload
            }
        default:
            return state;
    }
}

