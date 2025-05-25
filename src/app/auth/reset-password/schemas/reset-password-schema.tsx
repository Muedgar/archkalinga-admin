import { z } from 'zod'

// Validation schema using Zod
export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^A-Za-z0-9]/, {
      message: 'Password must contain at least one special character',
    }),
  confirmPassword: z
    .string()
    .min(8, { message: 'Confirm password must be at least 8 characters' })
    .regex(/[A-Z]/, {
      message: 'Confirm password must contain at least one uppercase letter',
    })
    .regex(/[a-z]/, {
      message: 'Confirm password must contain at least one lowercase letter',
    })
    .regex(/[0-9]/, {
      message: 'Confirm password must contain at least one number',
    })
    .regex(/[^A-Za-z0-9]/, {
      message: 'Confirm password must contain at least one special character',
    }),
})

// TypeScript type from schema
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>
