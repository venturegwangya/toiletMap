import { combineReducers } from 'redux';
import mapReducer from './mapReducer';
import modalReducer from './modalReducer';

export const rootReducer = combineReducers({
  mapReducer,
  modalReducer,
});
