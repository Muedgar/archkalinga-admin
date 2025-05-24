import { z } from 'zod'

// Validation schema using Zod
export const registerSchema = z.object({
  organizationName: z
    .string()
    .min(2, { message: 'Organization name is too short' })
    .max(100, { message: 'Organization name is too long' }),

  organizationAddress: z
    .string()
    .min(5, { message: 'Address is too short' })
    .max(200, { message: 'Address is too long' }),

  organizationCity: z
    .string()
    .min(2, { message: 'City name is too short' })
    .max(50, { message: 'City name is too long' }),

  organizationCountry: z
    .string()
    .min(2, { message: 'Country name is too short' })
    .max(50, { message: 'Country name is too long' }),

  userName: z
    .string()
    .min(2, { message: 'Username is too short' })
    .max(50, { message: 'Username is too long' }),

  firstName: z
    .string()
    .min(2, { message: 'First name is too short' })
    .max(50, { message: 'First name is too long' }),

  lastName: z
    .string()
    .min(2, { message: 'Last name is too short' })
    .max(50, { message: 'Last name is too long' }),

  title: z
    .string()
    .min(2, { message: 'Title is too short' })
    .max(50, { message: 'Title is too long' }),

  email: z.string().email({ message: 'Invalid email address' }),

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
})

// TypeScript type from schema
export type RegisterFormValues = z.infer<typeof registerSchema>
