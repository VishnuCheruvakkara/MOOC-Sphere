import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/Slices/authSlice';

import { persistStore, persistReducer } from 'redux-persist';
import storageImport from 'redux-persist/lib/storage';
const storage = storageImport.default;

const persistConfig = {
    key: 'auth',
    storage,
};
const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'persist/REGISTER',
                ],
            },
        }),
});

export const persistor = persistStore(store);
