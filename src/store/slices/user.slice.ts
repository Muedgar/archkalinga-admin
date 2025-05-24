import { createSlice } from '@reduxjs/toolkit'
import {
  activateUser,
  activateUser2FA,
  changePassword,
  createUser,
  deActivateUser,
  deActivateUser2FA,
  getUser,
  getUsers,
  updateUser,
} from '../thunks'
import { IUser } from '@/interfaces'

export interface UserState {
  token: string | null
  loading: boolean
  count: number
  pages: number
  page: number
  limit: number
  users: IUser[] | null
  currentUser: IUser | null
}

const initialState: UserState = {
  token: null,
  loading: false,
  count: 0,
  pages: 0,
  page: 1,
  limit: 10,
  users: null,
  currentUser: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true
      })
      .addCase(getUsers.fulfilled, (state, payload) => {
        state.loading = false
        state.users = payload.payload.items
        state.count = payload.payload.count
        state.pages = payload.payload.pages
        state.page = payload.payload.page
        state.limit = payload.payload.limit
      })
      .addCase(getUsers.rejected, (state) => {
        state.loading = false
      })
      // Create user cases
      .addCase(createUser.pending, (state) => {
        state.loading = true
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false
        if (state.users) {
          state.users.push(action.payload)
        } else {
          state.users = [action.payload]
        }
        state.count += 1
      })
      .addCase(createUser.rejected, (state) => {
        state.loading = false
      })
      // Update user cases
      .addCase(updateUser.pending, (state) => {
        state.loading = true
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(updateUser.rejected, (state) => {
        state.loading = false
      })
      // Get user cases
      .addCase(getUser.pending, (state) => {
        state.loading = true
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload
      })
      .addCase(getUser.rejected, (state) => {
        state.loading = false
      })

      // activate user cases
      .addCase(activateUser.pending, (state) => {
        state.loading = true
      })
      .addCase(activateUser.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(activateUser.rejected, (state) => {
        state.loading = false
      })

      // deactivate user cases
      .addCase(deActivateUser.pending, (state) => {
        state.loading = true
      })
      .addCase(deActivateUser.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(deActivateUser.rejected, (state) => {
        state.loading = false
      })

      // activate 2fa user cases
      .addCase(activateUser2FA.pending, (state) => {
        state.loading = true
      })
      .addCase(activateUser2FA.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(activateUser2FA.rejected, (state) => {
        state.loading = false
      })

      // deactivate 2fa user cases
      .addCase(deActivateUser2FA.pending, (state) => {
        state.loading = true
      })
      .addCase(deActivateUser2FA.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(deActivateUser2FA.rejected, (state) => {
        state.loading = false
      })
      // change password
      .addCase(changePassword.pending, (state) => {
        state.loading = true
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(changePassword.rejected, (state) => {
        state.loading = false
      })
  },
})

export const userReducer = userSlice.reducer
