import { combineReducers } from 'redux';
import mapReducer from './mapReducer';
import pathReducer from './pathReducer';

export const rootReducer = combineReducers({
  mapReducer,
  pathReducer,
});
