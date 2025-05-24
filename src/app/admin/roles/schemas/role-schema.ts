import { z } from 'zod'

// Validation schema using Zod
export const roleSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  permissions: z
    .array(z.string())
    .min(1, { message: 'At least one permission is required' }),
})

// TypeScript type from schema
export type RoleFormValues = z.infer<typeof roleSchema>
