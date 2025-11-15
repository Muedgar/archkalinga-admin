import { z } from "zod";
import { EProjectType } from "../enums";


export const createProjectSchema = z.object({
    title: z
            .string()
            .min(2, { message: 'Project name is too short' })
            .max(100, { message: 'Project name is too long' }),
    description: z
                .string()
                .min(10, { message: 'Project description is too short' })
                .max(500, { message: 'Project description is too long' }),
    type: z.nativeEnum(EProjectType),
    owner: z.string(),
    startDate: z.date({ message: 'Project start date is required' }),
    endDate: z.date({ message: 'Project end date is required' })
})

export type CreateProjectFormValues = z.infer<typeof createProjectSchema>