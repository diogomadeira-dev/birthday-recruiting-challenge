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

const createCustomer = createAsyncThunk('customers/post', async (data) => {
  try { 
    const response = await customersApi.createCustomer(data);

    return response;
  } catch (error) {
    console.log('error', error)
    throw new Error();
  }
});

const deleteCustomer = createAsyncThunk('customers/delete', async (id) => {
  try { 
    const response = await customersApi.deleteCustomer(id);

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
    builder.addCase(getCustomers.pending, (state) => {
      state.loading = true
    });
    builder.addCase(getCustomers.fulfilled, (state, action) => {
      state.loading = false
      state.customers = action.payload.data
    });
    builder.addCase(getCustomers.rejected, (state) => {
      state.loading = false
    });
    // create customer
    builder.addCase(createCustomer.pending, (state) => {
      state.loading = true
      state.error = false
    });
    builder.addCase(createCustomer.fulfilled, (state) => {
      state.loading = false
      state.error = false
    });
    builder.addCase(createCustomer.rejected, (state) => {
      state.loading = false
      state.error = true
    });
    // delete customer
    builder.addCase(deleteCustomer.pending, (state) => {
      state.loading = true
      state.error = false
    });
    builder.addCase(deleteCustomer.fulfilled, (state) => {
      state.loading = false
      state.error = false
    });
    builder.addCase(deleteCustomer.rejected, (state) => {
      state.loading = false
      state.error = true
    });
  },
})

export { createCustomer, deleteCustomer, getCustomers };
// eslint-disable-next-line no-empty-pattern
export const { disableErrorState } = customersSlice.actions;
export default customersSlice.reducer;