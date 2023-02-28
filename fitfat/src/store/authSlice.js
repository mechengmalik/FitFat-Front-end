import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null },
  reducers: {
    setToken(state, action) {
      console.log(action.payload, "in set token action creator");
      state.token = action.payload;
      
      console.log('token set:', state.token); // add this line

    },
  },
});

export default authSlice;
