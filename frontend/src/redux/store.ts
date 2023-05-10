import {configureStore} from '@reduxjs/toolkit'
import themeSlice from './feature_slice/ThemeSlice';

export const store = configureStore({
    reducer: {
        theme: themeSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;