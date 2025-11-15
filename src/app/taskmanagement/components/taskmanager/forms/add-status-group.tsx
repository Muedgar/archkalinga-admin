'use client'
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { tasksGroupSchema } from "../schemas/add-group.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { GROUP_COLORS } from "@/constants";
import { useState } from "react";

export default function NewStatusGroup() {
    const groupColors = GROUP_COLORS;
    const [groupColor, setGroupColor] = useState(groupColors[0])
    const form = useForm({
        resolver: zodResolver(tasksGroupSchema),
        defaultValues: {
            statusColor: '',
            statusName: '',
            statusStage: ''
        }
    })

    const onSubmit = () => {

    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="w-[200px] h-[30px] rounded-lg border border-yellow-300 shadow shadow-yellow-100 p-2 flex justify-start">
                  {/* status color */}
                </div>
            </form>
        </Form>
    )
}


/*
<div className="w-2 h-2 bg-black">
                    <FormField
                    control={form.control}
                    name="statusName"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="STATUS NAME" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                </div>
                <FormField
                    control={form.control}
                    name="statusColor"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="STATUS COLOR" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="statusStage"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder="STATUS STAGE" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                >
                    <Check />
                </Button>
*/