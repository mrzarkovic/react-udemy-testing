export default ({ dispatch }) => next => action => {
  // Check to see if the action
  // has a promise on its payload property
  if (!action.payload || !action.payload.then) {
    // If not, send the action to the next middleware
    return next(action);
  }

  // Otherwise, wait for it to resolve
  action.payload.then(function(response) {
    const newAction = { ...action, payload: response };
    dispatch(newAction);
  });
};
