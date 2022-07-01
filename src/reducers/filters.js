const filtersState = {
  filters: [],
  activeFilter: 'all',
  filtersLoadingStatus: 'idle',
};

const filtersReducer = (state = filtersState, action) => {
  switch (action.type) {
    case 'FILTERS_FETCHING':
      return {
        ...state,
        filtersLoadingStatus: 'loading',
      };
    case 'FILTERS_FETCHED':
      return {
        ...state,
        filters: action.payload,
        filtersLoadingStatus: 'idle',
      };
    case 'FILTERS_FETCHING_ERROR':
      return {
        ...state,
        filtersLoadingStatus: 'error',
      };
    case 'CHANGE_ACTIVE_FILTER':
      return {
        ...state,
        activeFilter: action.payload,
      };

    default:
      return state;
  }
};

export default filtersReducer;
