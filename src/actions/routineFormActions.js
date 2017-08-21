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
