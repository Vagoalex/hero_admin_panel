import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const heroesState = {
  heroes: [],
  heroesLoadingStatus: 'idle',
};

export const fetchHeroes = createAsyncThunk('heroes/fetchHeroes', async () => {
  const { request } = useHttp();
  return await request('http://localhost:3001/heroes');
});

const heroesSlice = createSlice({
  name: 'heroes',
  initialState: heroesState,
  reducers: {
    deleteHero: (state, action) => {
      state.heroes = state.heroes.filter((hero) => hero.id !== action.payload);
    },
    addHero: (state, action) => {
      state.heroes.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroes.pending, (state) => {
        state.heroesLoadingStatus = 'loading';
      })
      .addCase(fetchHeroes.fulfilled, (state, action) => {
        state.heroes = action.payload;
        state.heroesLoadingStatus = 'idle';
      })
      .addCase(fetchHeroes.rejected, (state) => {
        state.heroesLoadingStatus = 'error';
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = heroesSlice;

export default reducer;
export const { deleteHero, addHero } = actions;
