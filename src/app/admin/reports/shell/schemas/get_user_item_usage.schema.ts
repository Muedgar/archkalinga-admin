import { z } from 'zod'

// Validation schema using Zod
export const getUserItemUsageSchema = z.object({
  userId: z.string().min(1, { message: 'User is required' }),
  itemId: z.string().min(1, { message: 'Item is required' }),
  projectId: z.string().min(1, { message: 'Project is required' }),
})

// TypeScript type from schema
export type GetUserItemUsageFormValues = z.infer<typeof getUserItemUsageSchema>
