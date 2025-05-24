import { axiosClient } from '@/hooks'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface CreateRoleParams {
  name: string
  permissions: string[]
}

export const getRoles = createAsyncThunk(
  'roles/getRoles',
  async (
    { page, limit }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.get('/roles', {
        params: {
          page,
          limit,
        },
      })
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get all roles.'
      )
    }
  }
)

export const createRole = createAsyncThunk(
  'roles/createRole',
  async (params: CreateRoleParams, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/roles/create', params)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create role.'
      )
    }
  }
)

export const updateRole = createAsyncThunk(
  'roles/updateRole',
  async (
    { id, params }: { id: string; params: CreateRoleParams },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.patch(`/roles/${id}`, params)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update role.'
      )
    }
  }
)

export const getRole = createAsyncThunk(
  'roles/getRole',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/roles/${id}`)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get role.'
      )
    }
  }
)

export const activateRole = createAsyncThunk(
  'roles/activateRole',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.patch(`/roles/${id}/activate`)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to activate role.'
      )
    }
  }
)

export const deActivateRole = createAsyncThunk(
  'roles/deActivateRole',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.patch(`/roles/${id}/deactivate`)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to deactivate role.'
      )
    }
  }
)

export const deleteRole = createAsyncThunk(
  'roles/deleteRole',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(`/roles/${id}`)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete role.'
      )
    }
  }
)
