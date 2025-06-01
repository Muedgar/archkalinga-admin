/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosClient } from '@/hooks'
import { UserType } from '@/types'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface CreateUserParams {
  userName: string
  firstName: string
  lastName: string
  title: string
  email: string
  userType: UserType
  role: string
}

interface UpdateUserParams {
  userName: string
  firstName: string
  lastName: string
  title: string
  userType: UserType
  role: string
}

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (
    { page, limit }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.get('/users', {
        params: {
          page,
          limit,
        },
      })
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get all users.'
      )
    }
  }
)

export const getUser = createAsyncThunk(
  'users/getUser',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/users/${id}`)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get user.'
      )
    }
  }
)

export const activateUser = createAsyncThunk(
  'users/activateUser',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.patch(`/users/${id}/activate`)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to activate user.'
      )
    }
  }
)

export const deActivateUser = createAsyncThunk(
  'users/deActivateUser',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.patch(`/users/${id}/deactivate`)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to deactivate user.'
      )
    }
  }
)

export const activateUser2FA = createAsyncThunk(
  'users/activateUser2FA',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.patch(`/users/${id}/activate-2fa`)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          'Failed to activate user 2 step verification.'
      )
    }
  }
)

export const deActivateUser2FA = createAsyncThunk(
  'users/deActivateUser2FA',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.patch(`/users/${id}/deactivate-2fa`)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          'Failed to deactivate user 2 step verification.'
      )
    }
  }
)

export const changePassword = createAsyncThunk(
  'users/changePassword',
  async (
    { id, password }: { id: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.patch(`/users/${id}/change-password`, {
        password,
      })
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to change password.'
      )
    }
  }
)

export const createUser = createAsyncThunk(
  'users/createUser',
  async (params: CreateUserParams, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/users/create', params)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create user.'
      )
    }
  }
)

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (
    { params, id }: { id: string; params: UpdateUserParams },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.patch(`/users/${id}`, params)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update user.'
      )
    }
  }
)
