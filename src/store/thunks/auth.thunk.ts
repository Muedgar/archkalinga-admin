import { axiosClient } from '@/hooks'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface RegisterParams {
  userName: string
  firstName: string
  lastName: string
  title: string
  email: string
  password: string
  organizationName: string
  organizationAddress: string
  organizationCity: string
  organizationCountry: string
}

interface LoginParams {
  email: string
  password: string
}

interface ForgotPasswordParams {
  email: string
}

interface ResetPasswordParams {
  password: string
  confirmPassword: string
}

interface ValidateOtpParams {
  email: string
  otp: string
}

export const register = createAsyncThunk(
  'auth/register',
  async (params: RegisterParams, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/users/register', params)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to register user account.'
      )
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (params: LoginParams, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/auth/login', params)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to login.'
      )
    }
  }
)

export const validateOtp = createAsyncThunk(
  'auth/validateOtp',
  async (params: ValidateOtpParams, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/auth/validate-otp', params)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to login.'
      )
    }
  }
)

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (params: ForgotPasswordParams, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/auth/forgot-password', params)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Something went wrong.'
      )
    }
  }
)

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (
    { token, params }: { token: string; params: ResetPasswordParams },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.post(
        `/auth/${token}/reset-password`,
        params
      )
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Something went wrong.'
      )
    }
  }
)
