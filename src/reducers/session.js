export function sessionReducer(state = {
  session: !!sessionStorage.jwt,
}, action) {
  switch(action.type) {
    case 'SIGN_UP_SUCCESS':
      return Object.assign({}, state, {session: !!sessionStorage.jwt});

    case 'SIGN_IN_SUCCESS':
      return Object.assign({}, state, {session: !!sessionStorage.jwt});

    case 'SIGN_OUT':
      return Object.assign({}, state, {session: !!sessionStorage.jwt});

    default:
      return state;
  }
}
