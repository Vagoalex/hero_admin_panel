import { createSlice } from '@reduxjs/toolkit';

const heroesState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
};

const heroesSlice = createSlice({
  name: 'heroes',
  initialState: heroesState,
  reducers: {
    heroesFetching: (state) => {
      state.heroesLoadingStatus = 'loading';
    },
    heroesFetched: (state, action) => {
      state.heroes = action.payload;
      state.heroesLoadingStatus = 'idle';
    },

    heroesFetchingError: (state) => {
      state.heroesLoadingStatus = 'error';
    },
    deleteHero: (state, action) => {
      state.heroes = state.heroes.filter((hero) => hero.id !== action.payload);
    },
    addHero: (state, action) => {
      state.heroes.push(action.payload);
    },
  },
});

const { actions, reducer } = heroesSlice;

export default reducer;
export const {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  deleteHero,
  addHero,
} = actions;
