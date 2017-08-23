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
