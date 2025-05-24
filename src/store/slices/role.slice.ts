import { createSlice } from '@reduxjs/toolkit'
import {
  activateRole,
  createRole,
  deActivateRole,
  deleteRole,
  getRole,
  getRoles,
  updateRole,
} from '../thunks'
import { IRole } from '@/interfaces'

export interface RoleState {
  token: string | null
  loading: boolean
  count: number
  pages: number
  page: number
  limit: number
  roles: IRole[] | null
  currentRole: IRole | null
}

const initialState: RoleState = {
  token: null,
  loading: false,
  count: 0,
  pages: 0,
  page: 1,
  limit: 10,
  roles: [],
  currentRole: null,
}

export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRoles.pending, (state) => {
        state.loading = true
      })
      .addCase(getRoles.fulfilled, (state, payload) => {
        state.loading = false
        state.roles = payload.payload.items
        state.count = payload.payload.count
        state.pages = payload.payload.pages
        state.page = payload.payload.page
        state.limit = payload.payload.limit
      })
      .addCase(getRoles.rejected, (state) => {
        state.loading = false
      })

      // Create role cases
      .addCase(createRole.pending, (state) => {
        state.loading = true
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.loading = false
        if (state.roles) {
          state.roles.push(action.payload)
        } else {
          state.roles = [action.payload]
        }
        state.count += 1
      })
      .addCase(createRole.rejected, (state) => {
        state.loading = false
      })
      // Get role cases
      .addCase(getRole.pending, (state) => {
        state.loading = true
      })
      .addCase(getRole.fulfilled, (state, action) => {
        state.loading = false
        state.currentRole = action.payload
      })
      .addCase(getRole.rejected, (state) => {
        state.loading = false
      })
      // Update role cases
      .addCase(updateRole.pending, (state) => {
        state.loading = true
      })
      .addCase(updateRole.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(updateRole.rejected, (state) => {
        state.loading = false
      })
      // Activate role cases
      .addCase(activateRole.pending, (state) => {
        state.loading = true
      })
      .addCase(activateRole.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(activateRole.rejected, (state) => {
        state.loading = false
      })
      // De activate role cases
      .addCase(deActivateRole.pending, (state) => {
        state.loading = true
      })
      .addCase(deActivateRole.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(deActivateRole.rejected, (state) => {
        state.loading = false
      })
      // Delete role cases
      .addCase(deleteRole.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteRole.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(deleteRole.rejected, (state) => {
        state.loading = false
      })
  },
})

export const roleReducer = roleSlice.reducer
