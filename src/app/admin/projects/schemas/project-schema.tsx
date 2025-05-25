import { z } from 'zod'

// Validation schema using Zod
export const projectSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Project name is too short' })
    .max(50, { message: 'Project name is too long' }),
})

export const projectUpdateSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Project name is too short' })
    .max(50, { message: 'Project name is too long' }),
})

// TypeScript type from schema
export type ProjectFormValues = z.infer<typeof projectSchema>
export type UpdateProjectFormValues = z.infer<typeof projectUpdateSchema>
