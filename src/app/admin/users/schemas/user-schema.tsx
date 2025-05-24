import { z } from 'zod'

// Validation schema using Zod
export const userSchema = z.object({
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

  userType: z.string().min(1, { message: 'User type is required' }),
  role: z.string().min(1, { message: 'Role is required' }),
})

export const userUpdateSchema = z.object({
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

  userType: z.string().min(1, { message: 'User type is required' }),
  role: z.string().min(1, { message: 'Role is required' }),
})

// TypeScript type from schema
export type UserFormValues = z.infer<typeof userSchema>
export type UpdateUserFormValues = z.infer<typeof userUpdateSchema>
