import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://randomuser.me/api/';

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async ({ page, role, gender }) => {
    let url = `${API_URL}?page=${page}&results=10`;
    if (role) url += `&role=${role}`;
    if (gender) url += `&gender=${gender}`;
    const response = await axios.get(url);
    return response.data.results;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default userSlice.reducer;
