export function sessionReducer(state = {
  session: !!localStorage.jwt,
}, action) {
  switch(action.type) {
    case 'SIGN_UP_SUCCESS':
      return Object.assign({}, state, {session: !!localStorage.jwt});

    case 'SIGN_IN_SUCCESS':
      return Object.assign({}, state, {session: !!localStorage.jwt});

    case 'SIGN_OUT':
      return Object.assign({}, state, {session: !!localStorage.jwt});

    default:
      return state;
  }
}
