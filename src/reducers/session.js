export function sessionReducer(state = {
  session: !!localStorage.jwt,
  user: {},
}, action) {
  switch(action.type) {
    case 'LOAD_USER_TRAITS':
      return Object.assign({}, state, {
        user: JSON.parse(localStorage.user),
      });

    case 'SIGN_UP_SUCCESS':
      return Object.assign(
        {}, state, {
          session: !!localStorage.jwt,
          user: {
            id: action.payload.id,
            email: action.payload.email,
            name: action.payload.name,
          }
        }
      );

    case 'SIGN_IN_SUCCESS':
      return Object.assign(
        {}, state, {
          session: !!localStorage.jwt,
          user: {
            id: action.payload.id,
            email: action.payload.email,
            name: action.payload.name,
          }
        }
      );

    case 'SIGN_OUT':
      return Object.assign(
        {}, state, {session: !!localStorage.jwt, user: {}}
      );

    default:
      return state;
  }
}
