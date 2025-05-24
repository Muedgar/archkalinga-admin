import { createSlice } from '@reduxjs/toolkit'
import { forgotPassword, login, register, resetPassword, validateOtp } from '../thunks'
import { IUser } from '@/interfaces'

export interface AuthState {
  token: string | null
  loading: boolean
  user: IUser | null
}

const initialState: AuthState = {
  token: null,
  loading: false,
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state: AuthState) => {
      state.token = null
      state.user = null
      localStorage.removeItem('token')
    },
    resetAuth: () => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(register.rejected, (state) => {
        state.loading = false
      })
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        if (!action.payload?.requiresOtp) {
          state.token = action.payload.token
        state.user = action.payload.user
       

        localStorage.setItem('token', action.payload.token)
        }
         state.loading = false
      })
      .addCase(login.rejected, (state) => {
        state.loading = false
      })
      //validateOtp
      .addCase(validateOtp.pending, (state) => {
        state.loading = true
      })
      .addCase(validateOtp.fulfilled, (state, action) => {
        state.token = action.payload.token
        state.user = action.payload.user
        localStorage.setItem('token', action.payload.token)
         state.loading = false
      })
      .addCase(validateOtp.rejected, (state) => {
        state.loading = false
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.loading = false
      })
      // reset password
            .addCase(resetPassword.pending, (state) => {
              state.loading = true
            })
            .addCase(resetPassword.fulfilled, (state) => {
              state.loading = false
            })
            .addCase(resetPassword.rejected, (state) => {
              state.loading = false
            })
  },
})

export const { logout, resetAuth } = authSlice.actions
export const authReducer = authSlice.reducer
