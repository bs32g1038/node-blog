import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { appApi } from '@blog/client/web/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
    theme: 'light' | 'dark';
}

const initialState: State = {
    theme: 'light',
};
interface ThemeDataLoaded {
    theme: State['theme'];
}

const app = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<ThemeDataLoaded>) {
            const { theme } = action.payload;
            localStorage.setItem('theme', theme);
            state.theme = theme;
        },
    },
});

export const { setTheme } = app.actions;

export const makeStore = () =>
    configureStore({
        reducer: {
            app: app.reducer,
            [appApi.reducerPath]: appApi.reducer,
        },
        middleware: (gDM) => gDM().concat(appApi.middleware),
    });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
