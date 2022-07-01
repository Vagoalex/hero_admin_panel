const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
  filters: [],
  activeFilter: 'all',
  filtersLoadingStatus: 'idle',
  filteredHeroes: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HEROES_FETCHING':
      return {
        ...state,
        heroesLoadingStatus: 'loading',
      };
    case 'HEROES_FETCHED':
      return {
        ...state,
        heroes: action.payload,
        filteredHeroes:
          state.activeFilter === 'all'
            ? action.payload
            : action.payload.filter(
                (hero) => hero.element === state.activeFilter
              ),
        heroesLoadingStatus: 'idle',
      };
    case 'HEROES_FETCHING_ERROR':
      return {
        ...state,
        heroesLoadingStatus: 'error',
      };
    case 'ADD_HERO':
      const newHeroesList = [...state.heroes, action.payload];

      return {
        ...state,
        heroes: newHeroesList,
        filteredHeroes:
          state.activeFilter === 'all'
            ? newHeroesList
            : newHeroesList.filter(
                (hero) => hero.element === state.activeFilter
              ),
      };

    case 'DELETE_HERO':
      const newHeroes = state.heroes.filter(
        (hero) => hero.id !== action.payload
      );
      return {
        ...state,
        heroes: newHeroes,
        filteredHeroes:
          state.activeFilter === 'all'
            ? newHeroes
            : newHeroes.filter((hero) => hero.element === state.activeFilter),
      };

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
        filteredHeroes:
          action.payload === 'all'
            ? state.heroes
            : state.heroes.filter((hero) => hero.element === action.payload),
      };

    default:
      return state;
  }
};

export default reducer;
