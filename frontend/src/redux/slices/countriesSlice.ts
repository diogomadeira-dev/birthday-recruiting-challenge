import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { countriesApi } from '../../services/countries';


const initialState = {
  loading: false,
  countries: [],
  error: false
}

const getCountries = createAsyncThunk('countries/get', async () => {
  try {
    const response = await countriesApi.getCountries();

    return response;
  } catch (error) {
    throw new Error();
  }
});

const createCountry = createAsyncThunk('countries/post', async (data) => {
  try { 
    const response = await countriesApi.createCountry(data);

    return response;
  } catch (error) {
    throw new Error();
  }
});

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    disableErrorState: (state) => {
      state.error = false
    },
  },
  extraReducers: (builder) => {
    // Get countries
    builder.addCase(getCountries.pending, (state) => {
      state.loading = true
    });
    builder.addCase(getCountries.fulfilled, (state, action) => {
      state.loading = false
      state.countries = action.payload.data
    });
    builder.addCase(getCountries.rejected, (state) => {
      state.loading = false
    });
    // create country
    builder.addCase(createCountry.pending, (state) => {
      state.loading = true
      state.error = false
    });
    builder.addCase(createCountry.fulfilled, (state) => {
      state.loading = false
      state.error = false
    });
    builder.addCase(createCountry.rejected, (state) => {
      state.loading = false
      state.error = true
    });
  },
})

export { createCountry, getCountries };
// eslint-disable-next-line no-empty-pattern
export const { disableErrorState } = countriesSlice.actions;
export default countriesSlice.reducer;