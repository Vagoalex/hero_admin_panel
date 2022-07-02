import { createSlice } from '@reduxjs/toolkit';

const filtersState = {
  filters: [],
  activeFilter: 'all',
  filtersLoadingStatus: 'idle',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState: filtersState,
  reducers: {
    filtersFetching: (state) => {
      state.filtersLoadingStatus = 'loading';
    },
    filtersFetched: (state, action) => {
      state.filters = action.payload;
      state.filtersLoadingStatus = 'idle';
    },
    filtersFetchingError: (state) => {
      state.filtersLoadingStatus = 'error';
    },
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  changeActiveFilter,
} = actions;
