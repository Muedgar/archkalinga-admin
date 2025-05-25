import { axiosClient } from "@/hooks";
import { createAsyncThunk } from "@reduxjs/toolkit";


interface CreateShellQuantityParams {
  unit: string;
  amount: number;
  itemId: string;
  taskId: string;
}

interface UpdateShellQuantityParams {
  amount: number;
}

export const createShellQuantity = createAsyncThunk(
  'shellQuantities/createShellQuantity',
  async (params: CreateShellQuantityParams, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/shell/quantities', params)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to create shell quantity.'
      )
    }
  }
)

export const updateShellQuantity = createAsyncThunk(
  'shellQuantities/updateShellQuantity',
  async ({id, params}:{id: string; params: UpdateShellQuantityParams}, { rejectWithValue }) => {
    try {
      const response = await axiosClient.patch(`/shell/quantities/${id}/item-task-to-quantity`, params)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to update shell quantity.'
      )
    }
  }
)

export const deleteShellQuantity = createAsyncThunk(
  'shellQuantities/deleteShellQuantity',
  async ({id}:{id: string}, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(`/shell/quantities/${id}/item-task-to-quantity`)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to delete shell quantity.'
      )
    }
  }
)

export const getShellQuantities = createAsyncThunk(
  'shellQuantities/getShellQuantities',
  async (
    { page, limit }: { page: number; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.get('/shell/quantities', {
        params: {
          page,
          limit,
        },
      })
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get all shell quantities.'
      )
    }
  }
)

export const getShellQuantity = createAsyncThunk(
  'shellQuantities/getShellQuantity',
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`/shell/quantities/${id}`)
      return response.data.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to get shell quantity.'
      )
    }
  }
)