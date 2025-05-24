// slices/navigationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NavigationState {
  redirectPath: string | null
}

const initialState: NavigationState = {
  redirectPath: null,
}

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setRedirect: (state, action: PayloadAction<string>) => {
      state.redirectPath = action.payload
    },
    clearRedirect: (state) => {
      state.redirectPath = null
    },
  },
})

export const { setRedirect, clearRedirect } = navigationSlice.actions
export const navigationReducer = navigationSlice.reducer
