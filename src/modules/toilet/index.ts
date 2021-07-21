import toiletReducer from './reducer';
import * as toiletHooks from './hooks';
import * as toiletActions from './actions';
import { sagas as toiletSagas } from '../toilet/sagas';

export { toiletHooks, toiletActions, toiletSagas };

export default toiletReducer;
