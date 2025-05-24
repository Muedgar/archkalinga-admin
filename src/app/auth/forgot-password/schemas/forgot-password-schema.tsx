import { z } from 'zod'

// Validation schema using Zod
export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})

// TypeScript type from schema
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>
