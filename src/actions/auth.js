import request from 'superagent'
const baseUrl = 'http://localhost:4000'


export const LOGIN_SUCCES = 'LOGIN_SUCCES'
const loginSucces = jwt => ({
  type: LOGIN_SUCCES,
  payload: jwt
})
export const login = (email, password) => (dispatch) => {
  request
    .post(`${baseUrl}/login`)
    .send({email, password})
    .then((response)=> {
      console.log('RRRRRESP', response)
      dispatch(loginSucces(response.body.jwt))
      
    })
    .catch(console.error)
}


export const SIGNUP_SUCCES = 'SIGNUP_SUCCES'
const signupSucces = event => ({
  type: SIGNUP_SUCCES,
  payload: event
})
export const signup = (name, email, password) => (dispatch) => {
  request
    .post(`${baseUrl}/signup`)
    .send({name, email, password})
    .then(response => {
      console.log('REEEEEEEE', response)
      //response.body{id:"", name: "", email: "", password: ""}
      dispatch(signupSucces(response.body))
    })
    .catch(console.error)
}