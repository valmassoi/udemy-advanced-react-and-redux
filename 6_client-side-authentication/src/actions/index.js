// action creater returns object and has a type,
// now with redux thunk it returns a function
// allows for async
import axios from 'axios'
import { browserHistory } from 'react-router'
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from './types'

const API_URL = 'http://localhost:3090'

export function signinUser({ email, password }) {
  return function(dispatch) { // thunk
    axios.post(`${API_URL}/signin`, { email, password })
      .then(res => {
        dispatch({ type: AUTH_USER })
        localStorage.setItem('token', res.data.token)
        browserHistory.push('/feature')
      })
      .catch(() => {
        dispatch(authError('Invaild Email or Password'))
      })
  }
}

export function signupUser({ email, password }) { // Could DRY up with signinUser
  return function(dispatch) {
    axios.post(`${API_URL}/signup`, { email, password })
      .then(res => {
        dispatch({ type: AUTH_USER })// flips state to logged in
        localStorage.setItem('token', res.data.token)
        browserHistory.push('/feature')
      })
      .catch(res => {
        dispatch(authError(res.data.error))
      })
  }
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser() {
  localStorage.removeItem('token')
  return {
    type: UNAUTH_USER
  }
}

export function fetchMessage() {//could use redux promise instead of thunk
  return function(dispatch) {
    axios.get(API_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(res => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: res.data.message
        })
      })
  }
}
