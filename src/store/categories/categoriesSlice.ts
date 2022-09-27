import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '..';

// interface Category {
//   id: string;
//   name: string;
//   description: string;
//   is_active: boolean;
//   deleted_at: string | null;
//   created_at: string;
//   updated_at: string;
// }

export const initialState = [];

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    createCategories(state, action) {},
    updateCategories(state, action) {},
    deleteCategories(state, action) {},
  },
});

export const selectCategories = (state: RootState) => state.categories;

export default categoriesSlice.actions;
