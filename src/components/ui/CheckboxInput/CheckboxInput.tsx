import { Control, Controller } from "react-hook-form";
import { Checkbox } from "../Checkbox/Checkbox";

type CheckboxInputProps = {
  name: string;
  control: Control;
  disabled?: boolean;
  label?: string;
}

const CheckboxInput = (props: CheckboxInputProps) => {
  const { name, control, disabled, label } = props;
  
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
            <div>
              <Checkbox
                disabled={disabled}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
              {label && <label className="ml-2" htmlFor={name}>{label}</label>}
            </div>
        )}
      />
    </div>
  )
}

export default CheckboxInput;