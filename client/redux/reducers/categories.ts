import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';
import * as api from '@blog/client/web/api/category';

interface State {
    items: any[];
}

const initialState: State = {
    items: [],
};

interface CategoriesDataLoaded {
    items: any[];
}

const categories = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategories(state, action: PayloadAction<CategoriesDataLoaded>) {
            const { items } = action.payload;
            state.items = items;
        },
    },
});

export const { setCategories } = categories.actions;

export default categories.reducer;

export const fetchCategories = () => async (dispatch: Dispatch<PayloadAction<CategoriesDataLoaded>>) => {
    const data = await api.fetchCategories();
    return dispatch(setCategories({ items: data }));
};
