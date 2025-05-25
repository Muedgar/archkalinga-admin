import { createSlice } from '@reduxjs/toolkit'
import { IProject } from '@/interfaces'
import { createProject, getProject, getProjects, updateProject } from '../thunks'

export interface ProjectState {
  token: string | null
  loading: boolean
  count: number
  pages: number
  page: number
  limit: number
  projects: IProject[] | null
  currentProject: IProject | null
}

const initialState: ProjectState = {
  token: null,
  loading: false,
  count: 0,
  pages: 0,
  page: 1,
  limit: 10,
  projects: null,
  currentProject: null,
}

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjects.pending, (state) => {
        state.loading = true
      })
      .addCase(getProjects.fulfilled, (state, payload) => {
        state.loading = false
        state.projects = payload.payload.items
        state.count = payload.payload.count
        state.pages = payload.payload.pages
        state.page = payload.payload.page
        state.limit = payload.payload.limit
      })
      .addCase(getProjects.rejected, (state) => {
        state.loading = false
      })
      .addCase(getProject.pending, (state) => {
        state.loading = true
      })
      .addCase(getProject.fulfilled, (state, payload) => {
        state.loading = false
        state.currentProject = payload.payload
      })
      .addCase(getProject.rejected, (state) => {
        state.loading = false
      })
       .addCase(createProject.pending, (state) => {
        state.loading = true
      })
      .addCase(createProject.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(createProject.rejected, (state) => {
        state.loading = false
      })
       .addCase(updateProject.pending, (state) => {
        state.loading = true
      })
      .addCase(updateProject.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(updateProject.rejected, (state) => {
        state.loading = false
      })
  },
})

export const projectReducer = projectSlice.reducer
