import omit from 'lodash.omit';

export function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }

  return response;
}

export function processRoutineForApi(routine) {
  const groups = routine.groups.map((group) => {
    return omit(
      Object.assign({}, group, { intervals_attributes: group.intervals }),
      ['intervals']
    );
  });

  return omit(
    Object.assign({}, routine, { groups_attributes: groups }),
    ['groups']
  );
}
