import CardForm from "@/components/ui/CardForm/CardForm";
import { RHFBridgeProps } from "../types/index.type";
import { InputLabel } from "@/components/ui/InputLabel";
import SelectInput from "@/components/ui/SelectInput";
import { Control } from "react-hook-form";

type StepProps = RHFBridgeProps<any>;

export const BasicVisitorForm = ({ form, errors }: StepProps) => {
  const { register, control } = form;
  return (
    <CardForm className="mt-6 grid grid-cols-2 gap-4 items-end" title="Basic Visitor Information">
      <InputLabel
        label="RSVP Date"
        type="date"
        placeholder="Enter RSVP Date"
        errors={errors}
        {...register('rsvpDate')}
      />
      <p className="flex items-center py-2 px-4 border border-[#DADADA] rounded-lg text-[#5b5b5b] bg-[#f5f5f5] text-sm h-12">RSAP099999</p>
      <div className="grid grid-cols-2 gap-2 items-end">
        <InputLabel
          label="Arrival/Depart/Night"
          type="date"
          defaultValue={new Date().toISOString().split('T')[0]}
          errors={errors}
          {...register('arrival')}
        />
        <InputLabel
          label=""
          type="date"
          defaultValue={new Date().toISOString().split('T')[0]}
          errors={errors}
          {...register('departure')}
        />
      </div>
      <div className="flex items-center gap-2">
        <p className="flex items-center h-12 px-4 border border-[#DADADA] rounded-lg text-[#5b5b5b] bg-[#f5f5f5] text-sm">1</p>
        <p>Night</p>
      </div>
      <SelectInput
          name="rateSource"
          label="Rate Source"
          control={control as Control<any>}
          placeholder="Select Rate Source"
          options={[
            { label: 'Rate Group 1', value: 'Rate Group 1' },
            { label: 'Rate Group 2', value: 'Rate Group 2' },
            { label: 'Rate Group 3', value: 'Rate Group 3' },
          ]}
        />
      <div className="grid grid-cols-3 gap-2">
        <SelectInput
          name="rateGroup"
          label="Rate Group"
          control={control as Control<any>}
          placeholder="Select Rate Group"
          options={[
            { label: 'Rate Group 1', value: 'Rate Group 1' },
            { label: 'Rate Group 2', value: 'Rate Group 2' },
            { label: 'Rate Group 3', value: 'Rate Group 3' },
          ]}
        />
        <SelectInput
          name="reservationMode"
          label="Reservation Mode"
          control={control as Control<any>}
          placeholder="Select Reservation Mode"
          options={[
            { label: 'Rate Group 1', value: 'Rate Group 1' },
            { label: 'Rate Group 2', value: 'Rate Group 2' },
            { label: 'Rate Group 3', value: 'Rate Group 3' },
          ]}
        />
        <SelectInput
          name="type"
          label="Type"
          control={control as Control<any>}
          placeholder="Select Type"
          options={[
            { label: 'Rate Group 1', value: 'Rate Group 1' },
            { label: 'Rate Group 2', value: 'Rate Group 2' },
            { label: 'Rate Group 3', value: 'Rate Group 3' },
          ]}
        />
      </div>
    </CardForm>
  )
}