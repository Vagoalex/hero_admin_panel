import { createReducer } from '@reduxjs/toolkit';

import {
  filtersFetching,
  filtersFetched,
  filtersFetchingError,
  changeActiveFilter,
} from '../actions/index';

const filtersState = {
  filters: [],
  activeFilter: 'all',
  filtersLoadingStatus: 'idle',
};

const filtersReducerToolkit = createReducer(filtersState, (builder) => {
  builder
    .addCase(filtersFetching, (state) => {
      state.filtersLoadingStatus = 'loading';
    })
    .addCase(filtersFetched, (state, action) => {
      state.filters = action.payload;
      state.filtersLoadingStatus = 'idle';
    })
    .addCase(filtersFetchingError, (state) => {
      state.filtersLoadingStatus = 'error';
    })
    .addCase(changeActiveFilter, (state, action) => {
      state.activeFilter = action.payload;
    })
    .addDefaultCase(() => {});
});

// const filtersReducer = (state = filtersState, action) => {
//   switch (action.type) {
//     case 'FILTERS_FETCHING':
//       return {
//         ...state,
//         filtersLoadingStatus: 'loading',
//       };
//     case 'FILTERS_FETCHED':
//       return {
//         ...state,
//         filters: action.payload,
//         filtersLoadingStatus: 'idle',
//       };
//     case 'FILTERS_FETCHING_ERROR':
//       return {
//         ...state,
//         filtersLoadingStatus: 'error',
//       };
//     case 'CHANGE_ACTIVE_FILTER':
//       return {
//         ...state,
//         activeFilter: action.payload,
//       };

//     default:
//       return state;
//   }
// };

export default filtersReducerToolkit;
