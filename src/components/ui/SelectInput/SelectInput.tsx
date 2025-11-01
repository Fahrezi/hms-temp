import { Control, Controller } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../Select/Select";

type Option = {
  label: string;
  value: string;
}

type SelectInputProps = {
  name: string;
  control: Control;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  options: Option[];
  onChangeCallback?: (value: string) => void
}

const SelectInput = (props: SelectInputProps) => {
  const { name, control, disabled, placeholder, label, options, onChangeCallback } = props;
  return (
    <div>
      {label && <label className="font-medium mb-2 text-sm inline-block" htmlFor={name}>{label}</label>}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <Select
              disabled={disabled}
              value={(field.value as string) ?? ""}
              onValueChange={(v) => {
                field.onChange(v);
                onChangeCallback?.(v);
              }}
            >
              <SelectTrigger className="overflow-hidden w-full border border-[#dadada] bg-white" id={name} aria-invalid={!!fieldState.error}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className="bg-white border border-[#DADADA] rounded-xl mt-0.5">
                {options.map((opt, index) => (
                  <SelectItem className="hover:bg-[#f5f5f5]" key={index} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.error && (
              <p className="text-sm text-red-500">{fieldState.error.message}</p>
            )}
          </>
        )}
      />
    </div>
  )
}

export default SelectInput;