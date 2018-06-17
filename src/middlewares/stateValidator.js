import tv4 from 'tv4';
import stateSchema from 'middlewares/stateSchema';

export default ({ dispatch, getState }) => next => action => {
  next(action);

  const valid = tv4.validate(getState(), stateSchema);
  if (!valid) {
    console.warn('Invalid state schema detected! ' + tv4.error.message);
  }
};
