import { combineReducers } from 'redux';
import mapReducer from './map/mapReducer';
import modalReducer from './modal/modalReducer';

export const rootReducer = combineReducers({
  mapReducer,
  modalReducer,
});
