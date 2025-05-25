import { axiosClient } from '@/hooks'
import { createAsyncThunk } from '@reduxjs/toolkit'

interface CreateProjectParams {
  name: string
}

export const getProjects = createAsyncThunk(
  'projects/getProjects',
  async (
    { page, limit }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.get('/projects', {
        params: {
          page,
          limit,
        },
      })
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get all projects.'
      )
    }
  }
)

export const getProject = createAsyncThunk(
  'projects/getProject',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/projects/${id}`)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get project.'
      )
    }
  }
)

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (params: CreateProjectParams, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/projects/', params)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create project.'
      )
    }
  }
)

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async (
    { id, params }: { id: string; params: CreateProjectParams },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.patch(`/projects/${id}`, params)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update project.'
      )
    }
  }
)
