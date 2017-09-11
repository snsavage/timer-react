import fetch from 'isomorphic-fetch'
import { requestOptions } from '../utils/session';
import { handleErrors } from '../utils/api';
import Tone from 'tone';

import { remainingDuration } from './../utils/timer';

const synth = new Tone.Synth().toMaster();
const beep = (note, duration) => {
  synth.triggerAttackRelease(note, duration);
}

export function fetchRoutines() {
  return(dispatch) => {
    dispatch({ type: 'LOADING_ROUTINES' });

    return fetch('/api/v1/routines', requestOptions())
      .then(response => response.json())
      .then(routines => dispatch({
        type: 'FETCH_ROUTINES',
        payload: routines.routines,
      }));

  };
}

export function loadCurrentRoutine(id) {
  return(dispatch) => {
    dispatch({type: 'CLEAR_CURRENT_ROUTINE'})
    dispatch({type: 'LOADING_CURRENT_ROUTINE'});

    return fetch(`/api/v1/routines/${id}`, requestOptions())
      .then(response => response.json())
      .then(routine => {
        dispatch({type: 'FETCH_CURRENT_ROUTINE', payload: routine.routine})
      });
  }
}

export function clearCurrentRoutine() {
  return { type: 'CLEAR_CURRENT_ROUTINE' }
}

export function advanceCurrentRoutine(playlist) {
  return(dispatch, getState) => {
    const { currentRoutine } = getState();
    const playlist = currentRoutine.playlist;
    const time = remainingDuration(playlist);
    const groupTime = playlist[0].remainingDuration - 1;

    if (groupTime < 4 && groupTime > 0) {
      beep("C4", "8n");
    } else if (groupTime === 0 && time > 0) {
      beep("C5", "8n");
    }

    dispatch({ type: 'ADVANCE_TIMER' });
  }
}

export function rewindCurrentRoutine() {
  return { type: 'REWIND_TIMER' }
}

export function clearCurrentInterval(id) {
  clearInterval(id);
  beep("C5", "4n");

  return { type: 'STOP_INTERVAL' };
}

export function startCurrentRoutine(id) {
  return(dispatch) => {
    const timerId = setInterval(() => {
      return dispatch(advanceCurrentRoutine())
    }, 1000);

    dispatch({ type: 'START_TIMER', payload: timerId });
    dispatch({ type: 'ADVANCE_TIMER' });
  }
}

export function fetchRoutine(id) {
  return(dispatch) => {
    dispatch({ type: 'LOADING_ROUTINE' });

    return fetch(`/api/v1/routines/${id}`, requestOptions())
      .then(response => response.json())
      .then(routine => dispatch({
        type: 'FETCH_ROUTINE',
        payload: routine.routine,
      }));
  }
}

export function deleteRoutine(id, history) {
  return(dispatch) => {
    const options = requestOptions({
      method: 'DELETE'
    });

    dispatch({ type: 'DELETING_ROUTINE' });

    return fetch(`/api/v1/routines/${id}`, options)
      .then(handleErrors)
      .then(dispatch({ type: 'DELETE_ROUTINES' }))
      .then(history.push(`/routines`))
      .catch((error) => { dispatch({ type: 'UNSUCCESSFULLY_DELETED_ROUTINE' })})
  };
}
