import { z } from 'zod'

// Validation schema using Zod
export const getTotalItemUsageAccrossTasksSchema = z.object({
  itemId: z.string().min(1, { message: 'Item is required' }),
  projectId: z.string().min(1, { message: 'Project is required' }),
})

// TypeScript type from schema
export type GetTotalItemUsageAccrossTasksFormValues = z.infer<
  typeof getTotalItemUsageAccrossTasksSchema
>
