import axios from 'axios'
import {setAlert} from './alert'
import {
    CLEAR_PROFILE,
    DELETE_ACCOUNT,
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    GET_PROFILES,
    GET_REPOS
} from './types'


export const getCurrentProfile = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({type: PROFILE_ERROR, payload: {msg: err.msg, status: err.status}})
    }
}


// kreiraj profil

export const createProfile = (formData, history, edit=false) => async dispatch => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.post('/api/profile', formData, config)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
        dispatch(setAlert((edit ? 'Profile updated' : 'Profile created'), 'success'))

        if(!edit){
            history.push('/dashboard')
        }
        window.scroll({top: 0, left: 0, behavior: 'smooth' })
    } catch (err) {
        dispatch({type:PROFILE_ERROR, payload: {msg: err.msg, status: err.status}})
        const errors = err.response.data.errors

        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 5000)))
        }
        window.scroll({top: 0, left: 0, behavior: 'smooth' })
    }

}

// xp / edu

export const addXp = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/experience', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience added', 'success'))
        history.push('/dashboard')
        
    } catch (err) {
        const errors = err.response.data.errors
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 5000)))
        }
        window.scroll({top: 0, left: 0, behavior: 'smooth' })

        dispatch({type:PROFILE_ERROR, payload: {msg: err.msg, status: err.status}})
        

    }
}


export const addEdu = (formData, history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await axios.put('/api/profile/education', formData, config)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education added', 'success'))
        history.push('/dashboard')
        
    } catch (err) {
        if(errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger', 5000)))
        }
        window.scroll({top: 0, left: 0, behavior: 'smooth' })

        dispatch({type:PROFILE_ERROR, payload: {msg: err.msg, status: err.status}})
        const errors = err.response.data.errors

    }
}


// delete xp
export const delXp = id => async dispatch => {

    try {
        const res = await axios.delete(`/api/profile/experience/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Experience removed', 'success'))
    } catch (err) {
        dispatch({type:PROFILE_ERROR, payload: {msg: err.msg, status: err.status}})
    }
}

// delete education
export const delEdu = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`)
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
        dispatch(setAlert('Education removed', 'success'))
    } catch (err) {
        dispatch({type:PROFILE_ERROR, payload: {msg: err.msg, status: err.status}})
    }
}


// delete account and profile

export const delAccount = () => async dispatch => {
    if(window.confirm('Are you sure? This can NOT be undone')){
        try {
            dispatch({type: CLEAR_PROFILE})
            dispatch({type: DELETE_ACCOUNT})
            dispatch(setAlert('Account removed'))
        } catch (err) {
            dispatch({type:PROFILE_ERROR, payload: {msg: err.msg, status: err.status}})
        }
    }   
}

// get profiles / profile by id / get github

export const getProfiles = () => async dispatch => {
    dispatch({type: CLEAR_PROFILE})
    try {
        const res = await axios.get('/api/profile');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        })
    } catch (err) {
        dispatch({type:PROFILE_ERROR, payload: {msg: err.msg, status: err.status}})
    }
}

export const getRepos = username => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`);
        dispatch({
            type: GET_REPOS,
            payload: res.data,
            loading: false
        })
    } catch (err) {
        dispatch({type:PROFILE_ERROR, payload: {msg: err.msg, status: err.status}})
    }
}



export const getProfileById = userId => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch({type:PROFILE_ERROR, payload: {msg: err.msg, status: err.status}})
    }
}