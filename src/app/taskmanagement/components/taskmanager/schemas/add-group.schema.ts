import { z } from "zod";


export const tasksGroupSchema = z.object({
    statusName: z.string()
            .min(2, { message: 'Status name is too short' })
            .max(50, { message: 'Status name is too long' }),
    statusStage: z.string()
            .min(2, { message: 'Status type is too short' })
            .max(50, { message: 'Status type is too long' }),
    statusColor: z.string()
                 .default('#333')
})

export type TasksGroupFormValues = z.infer<typeof tasksGroupSchema>