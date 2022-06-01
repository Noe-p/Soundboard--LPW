import { createSlice } from '@reduxjs/toolkit';

const soundBoardSlice = createSlice({
  name: 'soundBoard',
  initialState: [],
  reducers: {
    addSound_SoundBoard: (state, action) => {
      return [...state, { ...action.payload.soundBoard }];
    },
    removeSound_SoundBoard: (state, action) => {
      return state.filter((el) => el.id != action.payload.id);
    },
    updateSound_SounBoard: (state, action) => {
      return state.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      );
    },
  },
});

export const {
  addSound_SoundBoard,
  removeSound_SoundBoard,
  updateSound_SounBoard,
} = soundBoardSlice.actions;
export const soundBoardSelector = (state) => state;

export default soundBoardSlice.reducer;
