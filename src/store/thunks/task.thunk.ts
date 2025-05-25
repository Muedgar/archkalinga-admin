import { axiosClient } from "@/hooks";
import { createAsyncThunk } from "@reduxjs/toolkit";


interface CreateTaskParams {
  name: string;
  projectId: string;
}

interface AssignUsersTaskParams {
  usersId: string[];
}


export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async (
    { page, limit }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.get('/tasks', {
        params: {
          page,
          limit,
        },
      })
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get all tasks.'
      )
    }
  }
)

export const getTask = createAsyncThunk(
  'tasks/getTask',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/tasks/${id}`)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get task.'
      )
    }
  }
)

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(`/tasks/${id}`)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete task.'
      )
    }
  }
)

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (params: CreateTaskParams, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/tasks/', params)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create task.'
      )
    }
  }
)


export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({id, params}:{id: string; params: CreateTaskParams}, { rejectWithValue }) => {
    try {
      const response = await axiosClient.patch(`/tasks/${id}`, params)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update task.'
      )
    }
  }
)

export const assignUsersTask = createAsyncThunk(
  'tasks/assignUsersTask',
  async ({id, params}:{id: string; params: AssignUsersTaskParams}, { rejectWithValue }) => {
    try {
      const response = await axiosClient.patch(`/tasks/${id}/assign-users`, params)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to assign users to task.'
      )
    }
  }
)

export const unAssignUsersTask = createAsyncThunk(
  'tasks/unAssignUsersTask',
  async ({id, params}:{id: string; params: AssignUsersTaskParams}, { rejectWithValue }) => {
    try {
      const response = await axiosClient.patch(`/tasks/${id}/unassign-users`, params)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to unassign users to task.'
      )
    }
  }
)