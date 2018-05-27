module.exports = {
  intToBoolean,
  booleanToint,
  projectToBody,
  actionToBody,
};

function intToBoolean(int) { // ternary that checks for int === 1, if true converts value to boolean `true` else `int == false`
  return int === 1 ? true : false;
}

function booleanToint(bool) { // ternary that checks for bool === `true`, if true assigns `bool  === 1` else `bool === 0`
  return bool === true ? 1 : 0;
}

function projectToBody(project) {
  const result = {
    ...project,
    completed: intToBoolean(project.completed),
  };

  if (project.actions) {
    result.actions = project.actions.map(action => ({
      ...action,
      completed: intToBoolean(action.completed),
    }));
  }

  return result;
}

function actionToBody(action) {
  return {
    ...action,
    completed: intToBoolean(action.completed),
  };
}
