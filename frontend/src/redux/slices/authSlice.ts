import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi } from '../../services/auth';


const initialState = {
  loading: false,
  userInfo: null,
  accessToken: null,
  success: false,
}

const getUser = createAsyncThunk('user/get', async (data) => {
  try {
    const response = await authApi.login(data);

    return response;
  } catch (error) {
    throw new Error();
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('accessToken') // delete token from storage
      state.loading = false
      state.userInfo = null
      state.accessToken = null
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload
    },
  },
  extraReducers: (builder) => {
    // login user
    builder.addCase(getUser.pending, (state, _) => {
      state.loading = true
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false
      state.userInfo = action.payload.data
      state.accessToken = action.payload.data.access_token
    });
    builder.addCase(getUser.rejected, (state, _) => {
      state.loading = false
    });
  },
})

export { getUser };
// eslint-disable-next-line no-empty-pattern
export const {} = authSlice.actions;
export default authSlice.reducer;