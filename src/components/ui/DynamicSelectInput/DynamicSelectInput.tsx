import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { Control, Controller, FieldValues, useForm, UseFormProps } from "react-hook-form";
import { ZodTypeAny } from "zod";

import { Button } from "../Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../Select";

import { cn } from "@/lib/utils";

type Option = {
  label: string;
  value: string;
}

type SelectInputProps<TValues extends FieldValues> = {
  name: string;
  schema?: ZodTypeAny;
  options?: UseFormProps<TValues>;
  control: Control;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  optionsSelect: Option[];
  children: (methods: ReturnType<typeof useForm<TValues>>) => React.ReactNode;
  onSubmit: (values: TValues) => void;
  className?: string;
}

const DynamicSelectInput = <TValues extends FieldValues>(props: SelectInputProps<TValues>) => {
  const {
    name,
    control,
    disabled,
    placeholder,
    label,
    options,
    optionsSelect,
    schema,
    children,
    onSubmit,
    className
  } = props;

  const [open, setOpen] = useState<boolean>(false);

  const methods = useForm<TValues>({
    ...(options || {}),
    resolver: schema ? zodResolver(schema) : options?.resolver,
    shouldUnregister: false,
  });

  const handleSubmit = useCallback(methods.handleSubmit((values) => {
    onSubmit(values);
    setOpen(false);
  }), []);
  
  return (
    <div className={cn("w-full", className)}>
      {label && <label className="font-medium mb-2 text-sm" htmlFor={name}>{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
          <div className="flex items-center gap-2">
            <Select 
              disabled={disabled}
              value={(field.value as string) ?? ""}
              onValueChange={(v) => {
                field.onChange(v);
              }}
            >
              <SelectTrigger className="overflow-hidden w-full border border-[#dadada] bg-white" id={name} aria-invalid={!!fieldState.error}>
                <SelectValue  placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className="bg-white border border-[#DADADA] rounded-xl mt-0.5">
                {optionsSelect.map((opt, index) => (
                  <SelectItem className="hover:bg-[#f5f5f5]" key={index} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button type="button" className="bg-black text-white" variant="ghost" onClick={() => setOpen(!open)}>
              {open ? <Minus size={16} /> : <Plus size={16} />}
            </Button>
          </div>
            {fieldState.error && (
              <p className="text-sm text-red-500">{fieldState.error.message}</p>
            )}
          </>
        )}
      />  
      {open && (<div className="flex flex-col gap-4 p-4 rounded-b-xl bg-[#f5f5f5]">
        {children(methods)}
        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" className="hover:bg-[#f5f5f5]" onClick={() => setOpen(false)}>Cancel</Button>
          <Button type="button" className="bg-black text-white" variant="default" onClick={handleSubmit}>Submit</Button>
        </div>
      </div>)}
    </div>
  )
}

export default DynamicSelectInput;