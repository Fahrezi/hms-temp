import { cn } from "@/libs/utils"
import * as React from "react"
import { FieldErrors } from "react-hook-form";

type InputLabelProps = React.ComponentPropsWithoutRef<"input"> & {
  name: string;
  label?: string;
  errors?: FieldErrors<any>;
}

const InputLabel = React.forwardRef<HTMLInputElement, InputLabelProps>(
  ({ className, type, name, label, errors, ...props }, ref) => {
    const err = errors?.[name]?.message as string | undefined;
    
    return (
      <div>
        {label && <label htmlFor={name} data-slot="input-label" className="font-medium mb-2 text-sm inline-block">{label}</label>}
        <input
          ref={ref}
          name={name}
          type={type}
          data-slot="input"
          className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-[#dadada] bg-white min-h-9 w-full min-w-0 rounded-md border px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-100/80 md:text-sm truncate overflow-hidden",
          "focus-visible:border-none focus-visible:ring-hotel-green/80 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className
          )}
          {...props}
        />
        {err && (<p data-slot="input-error" className="text-destructive text-xs mt-1">{err}</p>)}
      </div>
    )
  }
);

export { InputLabel }
