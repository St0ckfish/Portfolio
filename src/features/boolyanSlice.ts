import { createSlice } from '@reduxjs/toolkit';


interface BooleanState {
  value: boolean;
}


const initialState: BooleanState = {
  value: false,
};


const booleanSlice = createSlice({
  name: 'boolean',
  initialState,
  reducers: {
    toggle: (state) => {
      state.value = !state.value;
      console.log(state.value);
      
    },
    setTrue: (state) => {
      state.value = true;
    },
    setFalse: (state) => {
      state.value = false;
    },
  },
});

export const { toggle, setTrue, setFalse } = booleanSlice.actions;

export default booleanSlice.reducer;
