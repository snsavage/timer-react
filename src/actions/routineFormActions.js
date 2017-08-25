import fetch from 'isomorphic-fetch'
import { requestOptions } from '../utils/session';
import { handleErrors, processRoutineForApi } from '../utils/api';

export function changeRoutine(field, value) {
  return {
    type: 'CHANGE_CURRENT_ROUTINE',
    field: field,
    value: value,
  }
}

export function changeGroup(groupId, field, value) {
  return {
    type: 'CHANGE_CURRENT_ROUTINE_GROUP',
    groupId: groupId,
    field: field,
    value: value,
  }
}

export function changeInterval(groupId, intervalId, field, value) {
  return {
    type: 'CHANGE_CURRENT_ROUTINE_INTERVAL',
    groupId: groupId,
    intervalId: intervalId,
    field: field,
    value: value,
  }
}

export function addGroup(ev) {
  ev.preventDefault();
  return {
    type: 'ADD_CURRENT_ROUTINE_GROUP',
  }
}

export function removeGroup(ev, groupId) {
  ev.preventDefault();
  return {
    type: 'REMOVE_CURRENT_ROUTINE_GROUP',
    groupId: groupId,
  }
}

export function addInterval(ev, groupId) {
  ev.preventDefault();
  return {
    type: 'ADD_CURRENT_ROUTINE_INTERVAL',
    groupId: groupId,
  }
}

export function removeInterval(ev, groupId, intervalId) {
  ev.preventDefault();
  return {
    type: 'REMOVE_CURRENT_ROUTINE_INTERVAL',
    groupId: groupId,
    intervalId: intervalId,
  }
}

export function moveGroupUp(ev, groupId) {
  ev.preventDefault();
  return {
    type: 'MOVE_GROUP_UP',
    groupId: groupId,
  }
}


export function moveGroupDown(ev, groupId) {
  ev.preventDefault();
  return {
    type: 'MOVE_GROUP_DOWN',
    groupId: groupId,
  }
}

export function moveIntervalUp(ev, groupId, intervalId) {
  ev.preventDefault();
  return {
    type: 'MOVE_INTERVAL_UP',
    groupId: groupId,
    intervalId: intervalId,
  }
}

export function moveIntervalDown(ev, groupId, intervalId) {
  ev.preventDefault();
  return {
    type: 'MOVE_INTERVAL_DOWN',
    groupId: groupId,
    intervalId: intervalId,
  }
}

export function createRoutine(routine, history) {
  const routineAttributes = processRoutineForApi(routine);

  return(dispatch) => {
    const options = requestOptions({
      method: 'POST',
      body: JSON.stringify({
        routine: routineAttributes,
      }),
    });

    dispatch({ type: 'CREATING_ROUTINE' });

    return fetch('/api/v1/routines', options)
      .then(handleErrors)
      .then(response => response.json())
      .then(routines => {
        dispatch({
          type: 'SUCCESSFULLY_CREATED_ROUTINE',
          payload: routines.routine,
        })
        return routines;
      })
      .then(routines => history.push(`/routines/${routines.routine.id}`))
      .catch((error) => {
        dispatch({
          type: 'UNSUCCESSFULLY_CREATED_ROUTINE',
          payload: "Your routine could not be saved!",
        })
      });
  }
}

export function markAsNotSaved() {
  return { type: 'MARK_ROUTINE_AS_NOT_SAVED' }
}

export function markAsSaved() {
  return { type: 'MARK_ROUTINE_AS_SAVED' }
}
