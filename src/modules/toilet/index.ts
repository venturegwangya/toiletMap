import toiletReducer from './reducer';
import * as toiletHooks from './hooks';
import * as toiletActions from './actions';
import { sagas as toiletSagas } from '../toilet/sagas';
import * as toiletAPI from '../../modules/toilet/api';
import * as toiletModels from '../../modules/toilet/models';
import * as toiletTypes from '../../modules/toilet/types';

export { toiletAPI, toiletModels, toiletTypes };
export { toiletHooks, toiletActions, toiletSagas };

export default toiletReducer;
