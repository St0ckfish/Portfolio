import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BooleanState {
  value: boolean;
  isHydrated: boolean;
}

const initialState: BooleanState = {
  value: false, // Always start with false to match server-side rendering
  isHydrated: false,
};


const booleanSlice = createSlice({
  name: 'boolean',
  initialState,
  reducers: {
    hydrate: (state) => {
      // Load theme from localStorage after hydration
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme');
        state.value = savedTheme === 'light';
        state.isHydrated = true;
      }
    },
    toggle: (state) => {
      state.value = !state.value;
      // Save to localStorage whenever state changes
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.value ? 'light' : 'dark');
      }
      console.log(state.value);
    },
    setTrue: (state) => {
      state.value = true;
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', 'light');
      }
    },
    setFalse: (state) => {
      state.value = false;
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', 'dark');
      }
    },
  },
});

export const { hydrate, toggle, setTrue, setFalse } = booleanSlice.actions;

export default booleanSlice.reducer;
