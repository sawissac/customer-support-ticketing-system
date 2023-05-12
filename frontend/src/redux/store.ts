import {configureStore} from '@reduxjs/toolkit'
import themeSlice from './feature_slice/ThemeSlice';
import authSlice from './feature_slice/AuthSlice';

export const store = configureStore({
    reducer: {
        theme: themeSlice,
        auth: authSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;