export function routineReducer(state = {} , action) {
  switch(action.type) {
    default:
      return state;
  }
}

export function routinesReducer(state = {
  loading: false,
  routines: [],
}, action) {
  switch(action.type) {
    case 'LOADING_ROUTINES':
      return Object.assign({}, state, { loading: true });
    case 'FETCH_ROUTINES':
      return Object.assign(
        {}, state, { loading: false, routines: action.payload }
      );
    default:
      return state;
  }
}
