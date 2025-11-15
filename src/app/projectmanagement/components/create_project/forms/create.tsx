'use client'

import { useForm } from "react-hook-form";
import { CreateProjectFormValues, createProjectSchema } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SelectComponent } from "@/components/select";
import { ProjectTypes } from "../types";

const CreateProject = () => {
    const form = useForm<CreateProjectFormValues>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            title: '',
            description: '',
            type: undefined,
            owner: '',
            startDate: undefined,
            endDate: undefined,
        }
    })

    const onSubmit = (data: CreateProjectFormValues) => {
        console.log('data:  ', data)
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                {/* title */}
                <FormField 
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter project title" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                {/* description */}
                <FormField 
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Enter project description" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                {/* type */}
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <SelectComponent
                            label="Project type"
                            options={ProjectTypes}
                            onValueChange={field.onChange}
                        />
                    )}
                />
                {/* owner */}
                {/* start date */}
                {/* end date */}
            </form>
        </Form>
    )
}

export default CreateProject;