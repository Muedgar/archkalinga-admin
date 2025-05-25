import { z } from 'zod'

// Validation schema using Zod
export const taskSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Task name is too short' })
    .max(50, { message: 'Task name is too long' }),
  projectId: z.string().min(1, { message: 'Project is required' }),
})

export const taskUpdateSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Task name is too short' })
    .max(50, { message: 'Task name is too long' }),
  projectId: z.string().min(1, { message: 'Project is required' }),
})

export const assignUsersTaskSchema = z.object({
  usersId: z
    .array(z.string())
    .min(1, { message: 'At least one user is required' }),
})
// TypeScript type from schema
export type TaskFormValues = z.infer<typeof taskSchema>
export type UpdateTaskFormValues = z.infer<typeof taskUpdateSchema>
export type AssignUsersTaskFormValues = z.infer<typeof assignUsersTaskSchema>
