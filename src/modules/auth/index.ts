import authReducer from './reducer';
import * as authAPI from './api';
import * as authActions from './actions';
import * as authHooks from './hooks';
import { sagas as authSagas } from './sagas';

export { authAPI, authActions, authHooks, authSagas };
export default authReducer;
