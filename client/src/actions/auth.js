import { 
    REGISTER_FAIL,
    REGISTER_SUCESS,
    AUTH_ERROR,
    USER_LOADED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_PROFILE
} from "./types";
import {setAlert} from './alert'
import setAuthToken from '../utils/setAuthToken'
import axios from 'axios'
import { getCurrentProfile } from "./profile";

// load user / validacija

export const loadUser = () => async dispatch => {


    if (localStorage.token){
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}



// registracija

export const register = ({name,email,password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({name,email,password})

    try {
        const res = await axios.post('/api/users', body, config)

        dispatch({
            type:REGISTER_SUCESS,
            payload: res.data
        })
        dispatch(setAlert(`Successfully registered a user, ${name} `, 'success', 5000))
        dispatch(loadUser())
    } catch (error) {
        const errors = error.response.data.errors

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 5000)))
        }

        dispatch({type:REGISTER_FAIL});

    }
}

// logiranje

export const login = (email,password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({email,password})

    try {
        const res = await axios.post('/api/auth', body, config)

        dispatch({
            type:LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch(loadUser())
    } catch (error) {
        const errors = error.response.data.errors
        
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 5000)))
        }

        dispatch({type:LOGIN_FAIL});

    }
}

// logout

export const logout = () => dispatch => {
    dispatch({type:CLEAR_PROFILE})
    dispatch({type:LOGOUT})
}