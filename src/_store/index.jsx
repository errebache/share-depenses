import { configureStore } from '@reduxjs/toolkit';

import { alertReducer } from './alert.slice';

export * from './alert.slice';

export const store = configureStore({
    reducer: {
        alert: alertReducer
    },
});