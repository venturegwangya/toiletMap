import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './rootReducer';
import createSagaMiddleware from 'redux-saga';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import rootSaga from './rootSaga';

const sagaMiddleWare = createSagaMiddleware();
export const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(rootSaga);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
