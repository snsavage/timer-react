import fetch from 'isomorphic-fetch'

export function signUpUser(register, history) {
  return(dispatch) => {

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: {
          first_name: register.name,
          email: register.email,
          password: register.password,
          password_confirmation: register.password,
        }
      }),
    };

    return fetch('api/v1/register', options)
      .then(response => response.json())
      .then(response => {
        localStorage.setItem('jwt', response.jwt);
        history.push("/");
        dispatch({
          type: 'SIGN_UP_SUCCESS',
          payload: response,
        });
      });
  }
}

export function signInUser(credentials, history, redirect) {
  return(dispatch) => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        auth: {
          email: credentials.email,
          password: credentials.password,
        }
      }),
    };

    return fetch('api/v1/signin', options)
      .then(response => response.json())
      .then(response => {
        localStorage.setItem('jwt', response.jwt);
        dispatch({
          type: 'SIGN_IN_SUCCESS',
          payload: response,
        })
      }).then(() => history.push(redirect));
  }
}

export function signOutUser() {
  localStorage.removeItem('jwt');

  return(dispatch) => {
    dispatch({ type: 'CLEAR_CURRENT_ROUTINE' });
    dispatch({ type: 'SIGN_OUT' });
  }
}
