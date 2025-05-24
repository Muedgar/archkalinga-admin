import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ErrorState {
  message: string | null
  code?: string | number
  severity: 'error' | 'warning' | 'info'
  timestamp: number
  isVisible: boolean
}

export interface ErrorPayload {
  message: string
  code?: string | number
  severity?: 'error' | 'warning' | 'info'
}

const initialState: ErrorState = {
  message: null,
  code: undefined,
  severity: 'error',
  timestamp: 0,
  isVisible: false,
}

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<ErrorPayload>) => {
      state.message = action.payload.message
      state.code = action.payload.code
      state.severity = action.payload.severity || 'error'
      state.timestamp = Date.now()
      state.isVisible = true
    },
    clearError: (state) => {
      state.message = null
      state.code = undefined
      state.isVisible = false
    },
  },
})

export const { setError, clearError } = errorSlice.actions
export const errorReducer = errorSlice.reducer
