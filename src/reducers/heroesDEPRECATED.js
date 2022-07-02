import { createReducer } from '@reduxjs/toolkit';

import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  deleteHero,
  addHero,
} from '../actions/index';

const heroesState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
};

const heroesReducerToolkit = createReducer(heroesState, (builder) => {
  builder
    .addCase(heroesFetching, (state) => {
      state.heroesLoadingStatus = 'loading';
    })
    .addCase(heroesFetched, (state, action) => {
      state.heroes = action.payload;
      state.heroesLoadingStatus = 'idle';
    })
    .addCase(heroesFetchingError, (state) => {
      state.heroesLoadingStatus = 'error';
    })
    .addCase(deleteHero, (state, action) => {
      state.heroes = state.heroes.filter((hero) => hero.id !== action.payload);
    })
    .addCase(addHero, (state, action) => {
      state.heroes.push(action.payload);
    })
    .addDefaultCase(() => {});
});

// const heroesReducer = (state = heroesState, action) => {
//   switch (action.type) {
//     case 'HEROES_FETCHING':
//       return {
//         ...state,
//         heroesLoadingStatus: 'loading',
//       };
//     case 'HEROES_FETCHED':
//       return {
//         ...state,
//         heroes: action.payload,
//         heroesLoadingStatus: 'idle',
//       };
//     case 'HEROES_FETCHING_ERROR':
//       return {
//         ...state,
//         heroesLoadingStatus: 'error',
//       };
//     case 'ADD_HERO':
//       return {
//         ...state,
//         heroes: [...state.heroes, action.payload],
//       };

//     case 'DELETE_HERO':
//       return {
//         ...state,
//         heroes: state.heroes.filter((hero) => hero.id !== action.payload),
//       };

//     default:
//       return state;
//   }
// };

export default heroesReducerToolkit;
