import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

import rootReducer, { RootState } from './reducer/reducer';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

const store = configureStore({
  reducer: rootReducer,
});

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./reducer/reducer', () => {
    const newRootReducer = require('./reducer/reducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
