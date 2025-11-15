import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import React from 'react';

interface SelectComponentProps {
  label: string;
  options: { value: string; label: string }[];
  onValueChange: (value: string) => void;
  defaultValue?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  errorMessage?: string;
  isLoading?: boolean;
  required?: boolean;
}

export const SelectComponent: React.FC<SelectComponentProps> = ({
  label,
  options,
  onValueChange,
  defaultValue,
  value,
  placeholder = 'Select an option',
  disabled,
  errorMessage,
  isLoading = false,
  required = false,
}) => {
  return (
    <FormItem>
      <div className="flex items-center justify-between">
        <FormLabel className="text-gray-800">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </FormLabel>
        {isLoading && (
          <div className="flex items-center text-xs text-gray-500">
            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            Loading...
          </div>
        )}
      </div>
      <Select
        disabled={disabled || isLoading}
        onValueChange={onValueChange}
        defaultValue={defaultValue}
        value={value}
      >
        <FormControl>
          <SelectTrigger
            className={cn(
              '!mt-1',
              errorMessage && 'border-red-400 focus-visible:ring-0',
              isLoading && 'opacity-80 cursor-progress'
            )}
          >
            {isLoading ? (
              <div className="flex items-center text-gray-400">
                <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                <span>Loading options...</span>
              </div>
            ) : (
              <SelectValue placeholder={placeholder} />
            )}
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-2 text-sm text-gray-500">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Loading options...
            </div>
          ) : options.length === 0 ? (
            <div className="px-2 py-2 text-sm text-gray-500">
              No options available
            </div>
          ) : (
            options.map((option, i) => (
              <SelectItem key={i} value={option.value}>
                {option.label}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
      {errorMessage && (
        <FormMessage className="text-xs">{errorMessage}</FormMessage>
      )}
    </FormItem>
  );
};
