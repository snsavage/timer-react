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
      .then(token => {
        sessionStorage.setItem('jwt', token.jwt);
        history.push("/");
        dispatch({ type: 'SIGN_UP_SUCCESS' });
      });
  }
}

export function signInUser(credentials, history) {
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
      .then(token => {
        sessionStorage.setItem('jwt', token.jwt);
        history.push("/");
        dispatch({ type: 'SIGN_IN_SUCCESS' });
      });
  }
}

export function signOutUser() {
  sessionStorage.removeItem('jwt');

  return(dispatch) => {
    dispatch({ type: 'CLEAR_CURRENT_ROUTINE' });
    dispatch({ type: 'SIGN_OUT' });
  }
}
