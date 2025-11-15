import { FormControl, FormItem, FormLabel } from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";



interface SelectComponentProps {
    label: string;
    options: { value: string; label: string }[];
    onValueChange: (value: string) => void;
    value?: string;
}

export const SelectComponent: React.FC<SelectComponentProps> = ({
    label,
    options,
    onValueChange,
    value
}) => {
    return (
        <FormItem>
            <div className="flex items-center justify-between">
                <FormLabel className="text-gray-800">
                    {label}
                </FormLabel>
            </div>
            <Select
                onValueChange={onValueChange}
                value={value}
            >
                <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select item" />
                    </SelectTrigger>
                </FormControl>
                <SelectContent>
                    {options.map((option, i) => (
                        <SelectItem key={i} value={option.value}>{option.label}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </FormItem>
    )
}