const heroesState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
};

const heroesReducer = (state = heroesState, action) => {
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
    case 'ADD_HERO':
      return {
        ...state,
        heroes: [...state.heroes, action.payload],
      };

    case 'DELETE_HERO':
      return {
        ...state,
        heroes: state.heroes.filter((hero) => hero.id !== action.payload),
      };

    default:
      return state;
  }
};

export default heroesReducer;
