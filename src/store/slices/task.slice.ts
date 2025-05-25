import { createSlice } from '@reduxjs/toolkit'
import { ITask } from '@/interfaces'
import { assignUsersTask, createTask, deleteTask, getTask, getTasks, unAssignUsersTask, updateTask } from '../thunks'

export interface TaskState {
  token: string | null
  loading: boolean
  count: number
  pages: number
  page: number
  limit: number
  tasks: ITask[] | null
  currentTask: ITask | null
}

const initialState: TaskState = {
  token: null,
  loading: false,
  count: 0,
  pages: 0,
  page: 1,
  limit: 10,
  tasks: null,
  currentTask: null,
}

export const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.loading = true
      })
      .addCase(getTasks.fulfilled, (state, payload) => {
        state.loading = false
        state.tasks = payload.payload.items
        state.count = payload.payload.count
        state.pages = payload.payload.pages
        state.page = payload.payload.page
        state.limit = payload.payload.limit
      })
      .addCase(getTasks.rejected, (state) => {
        state.loading = false
      })
      .addCase(getTask.pending, (state) => {
        state.loading = true
      })
      .addCase(getTask.fulfilled, (state, payload) => {
        state.loading = false
        state.currentTask = payload.payload
      })
      .addCase(getTask.rejected, (state) => {
        state.loading = false
      })
       .addCase(createTask.pending, (state) => {
        state.loading = true
      })
      .addCase(createTask.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(createTask.rejected, (state) => {
        state.loading = false
      })
       .addCase(updateTask.pending, (state) => {
        state.loading = true
      })
      .addCase(updateTask.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(updateTask.rejected, (state) => {
        state.loading = false
      })
      .addCase(assignUsersTask.pending, (state) => {
        state.loading = true
      })
      .addCase(assignUsersTask.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(assignUsersTask.rejected, (state) => {
        state.loading = false
      })
      .addCase(unAssignUsersTask.pending, (state) => {
        state.loading = true
      })
      .addCase(unAssignUsersTask.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(unAssignUsersTask.rejected, (state) => {
        state.loading = false
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteTask.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(deleteTask.rejected, (state) => {
        state.loading = false
      })
  },
})

export const taskReducer = taskSlice.reducer
