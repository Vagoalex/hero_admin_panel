const initialState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
  filters: [],
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
        heroesLoadingStatus: 'idle',
      };
    case 'HEROES_FETCHING_ERROR':
      return {
        ...state,
        heroesLoadingStatus: 'error',
      };
    case 'DELETE_HERO':
      const newHeroes = state.heroes.filter(
        (hero) => hero.id !== action.payload
      );
      return {
        ...state,
        heroes: newHeroes,
      };
    default:
      return state;
  }
};

export default reducer;
