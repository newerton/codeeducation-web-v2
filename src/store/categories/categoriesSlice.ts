import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '..';

export type Category = {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
};

const category: Category = {
  id: '442706d7-cd81-42a4-9559-c605ab227648',
  name: 'Name',
  description: 'Description',
  is_active: false,
  deleted_at: null,
  created_at: '',
  updated_at: '',
};
export const initialState = [category];

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

export default categoriesSlice.reducer;
