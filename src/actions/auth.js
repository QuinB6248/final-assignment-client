import request from 'superagent'
//const baseUrl = 'http://localhost:4000'
const baseUrl ='https://secure-dusk-52930.herokuapp.com'


//////////////////SIGNIN ACTION////////////////
export const SIGNUP_SUCCES = 'SIGNUP_SUCCES'
const signupSucces = event => ({
  type: SIGNUP_SUCCES,
  payload: event
})

export const signup = (name, email, password) => (dispatch) => {
  request
    .post(`${baseUrl}/signup`)
    .send({name, email, password})
    .then(response => dispatch(signupSucces(response.body)))
    .catch(console.error)
}

///////////////LOGIN, LOGOUT, CHECK TOKEN ACTION//////////////
export const LOGIN_SUCCES = 'LOGIN_SUCCES'
const loginSucces = data => ({
  type: LOGIN_SUCCES,
  payload: data
})

////////////////////LOGIN ACTION////////////////////
export const login = (email, password) => (dispatch) => {
  request
    .post(`${baseUrl}/login`)
    .send({email, password})
    .withCredentials()
    .then((response)=> {
      sessionStorage.setItem("name", response.body.name)
      dispatch(loginSucces(response.body))})
    .catch(console.error)
}

////////////////////LOGOUT ACTION//////////////////
export const logout = () => (dispatch) => {
  sessionStorage.removeItem("name")
  request(`${baseUrl}/cleartoken`)
    .withCredentials()
    .then(response => dispatch(loginSucces(response.body)))
    .catch(console.error)
}

////////////////////CHECK TOKEN ACTION///////////////
export const checkToken = (check) => (dispatch) => {
  request(`${baseUrl}/gettoken`)
    .then(response => {
      if (response.body) {
        request(`${baseUrl}/authtoken`)
          .set('Authorization', `Bearer ${response.body.token}`)
          .then(res => {
            if(res.body === false) { return logout()(dispatch)}
            return dispatch(loginSucces(response.body))
          })
          .catch(console.error)
      }
      dispatch(loginSucces(false))
    })
    .catch(console.error)
}

