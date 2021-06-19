import mapReducer from './reducer';
import * as mapHooks from './hooks';
import * as mapActions from './actions';
import { sagas as mapSagas } from './sagas';

export { mapHooks, mapActions, mapSagas };

export default mapReducer;
