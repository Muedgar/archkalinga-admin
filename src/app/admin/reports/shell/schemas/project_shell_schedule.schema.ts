import { z } from 'zod'

// Validation schema using Zod
export const projectShellScheduleSchema = z.object({
  projectId: z.string().min(1, { message: 'Project is required' }),
})

// TypeScript type from schema
export type ProjectShellScheduleFormValues = z.infer<
  typeof projectShellScheduleSchema
>
