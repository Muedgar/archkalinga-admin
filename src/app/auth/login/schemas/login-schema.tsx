import { z } from 'zod'

// Validation schema using Zod
export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),

  password: z.string().min(1, { message: 'Password is required' }),
})

// TypeScript type from schema
export type LoginFormValues = z.infer<typeof loginSchema>
