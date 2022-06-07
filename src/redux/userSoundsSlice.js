import { createSlice } from '@reduxjs/toolkit';

const userSoundSlice = createSlice({
  name: 'sound',
  initialState: [],
  reducers: {
    addSound: (state, action) => {
      return [...state, { ...action.payload.sound }];
    },
    removeSound: (state, action) => {
      return state.filter((el) => el.id != action.payload.id);
    },
    updateSound: (state, action) => {
      return state.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      );
    },
  },
});

export const { addSound, removeSound, updateSound } = userSoundSlice.actions;
export const soundSelector = (state) => state;

export default userSoundSlice.reducer;
