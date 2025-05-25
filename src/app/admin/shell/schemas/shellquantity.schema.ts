import { z } from 'zod'

// Validation schema using Zod
export const shellQuantitySchema = z.object({
  unit: z
    .string({message: 'Unit is required'}),
  amount: z
    .string({message: 'Amount is required'}),
  itemId: z.string().min(1, { message: 'Item is required' }),
  taskId: z.string().min(1, { message: 'Task is required' }),
})

export const shellQuantityUpdateSchema = z.object({
  unit: z
    .string({message: 'Unit is required'}),
  amount: z
    .number({message: 'Amount is required'}),
  itemId: z.string().min(1, { message: 'Item is required' }),
  taskId: z.string().min(1, { message: 'Task is required' }),
})

// TypeScript type from schema
export type ShellQuantityFormValues = z.infer<typeof shellQuantitySchema>
export type UpdateShellQuantityFormValues = z.infer<typeof shellQuantityUpdateSchema>
