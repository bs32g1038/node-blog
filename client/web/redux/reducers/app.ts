import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface State {
    error: {
        status: number;
    };
}

const initialState: State = {
    error: null,
};

interface StatusCodeDataLoaded {
    error: {
        status: number;
    };
}

const app = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setError(state, action: PayloadAction<StatusCodeDataLoaded>) {
            const { error } = action.payload;
            state.error = error;
        },
    },
});

export const { setError } = app.actions;

export default app.reducer;
