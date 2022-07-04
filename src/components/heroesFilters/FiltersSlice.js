import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const filtersState = {
  filters: [],
  activeFilter: 'all',
  filtersLoadingStatus: 'idle',
};

export const fetchFilters = createAsyncThunk(
  'filters/fetchFilters',
  async () => {
    const { request } = useHttp();
    return await request('http://localhost:3001/filters');
  }
);

const filtersSlice = createSlice({
  name: 'filters',
  initialState: filtersState,
  reducers: {
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilters.pending, (state) => {
        state.filtersLoadingStatus = 'loading';
      })
      .addCase(fetchFilters.fulfilled, (state, action) => {
        state.filters = action.payload;
        state.filtersLoadingStatus = 'idle';
      })
      .addCase(fetchFilters.rejected, (state) => {
        state.filtersLoadingStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const { changeActiveFilter } = actions;
