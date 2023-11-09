import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { customersApi } from '../../services/customers';


const initialState = {
  loading: false,
  customers: [],
  error: false
}

const getCustomers = createAsyncThunk('customers/get', async () => {
  try {
    const response = await customersApi.getCustomers();

    return response;
  } catch (error) {
    throw new Error();
  }
});

const createCustomer = createAsyncThunk('customers/post', async (data, { getState }) => {
  try { 
    const state: any = getState()
    const accessToken = state.auth.accessToken
    const response = await customersApi.crateCustomer({data, accessToken});

    return response;
  } catch (error) {
    throw new Error();
  }
});

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    disableErrorState: (state) => {
      state.error = false
    },
  },
  extraReducers: (builder) => {
    // Get customers
    builder.addCase(getCustomers.pending, (state, _) => {
      state.loading = true
    });
    builder.addCase(getCustomers.fulfilled, (state, action) => {
      state.loading = false
      state.customers = action.payload.data
    });
    builder.addCase(getCustomers.rejected, (state, _) => {
      state.loading = false
    });
    // create customer
    builder.addCase(createCustomer.pending, (state, _) => {
      state.loading = true
      state.error = false
    });
    builder.addCase(createCustomer.fulfilled, (state, _) => {
      state.loading = false
      state.error = false
    });
    builder.addCase(createCustomer.rejected, (state, _) => {
      state.loading = false
      state.error = true
    });
  },
})

export { createCustomer, getCustomers };
// eslint-disable-next-line no-empty-pattern
export const { disableErrorState } = customersSlice.actions;
export default customersSlice.reducer;