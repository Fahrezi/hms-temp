import CardForm from "@/components/ui/CardForm/CardForm";
import { RHFBridgeProps } from "../types/index.type";
import { InputLabel } from "@/components/ui/InputLabel";
import SelectInput from "@/components/ui/SelectInput";
import { Control } from "react-hook-form";
import { rateGroup, rateSourceList, reservationMode, reservationType } from "@/constants/data";
import { differenceInDays } from "date-fns";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

type StepProps = RHFBridgeProps<any>;

export const BasicVisitorForm = ({ form, errors }: StepProps) => {
  const { register, control, watch } = form;
  const arrivalValue = watch('arrival');
  const departureValue = watch('departure'); 
  const nights = differenceInDays(new Date(departureValue), new Date(arrivalValue));
  const reservationModeValue = watch('reservationMode');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    if (type) {
      form.setValue('reservationMode', type);
    }
  }, []);

  useEffect(() => {
    if (!reservationModeValue) return;
    
    const params = new URLSearchParams(window.location.search);
    params.set('type', reservationModeValue);
    window.history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
  }, [reservationModeValue]);

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
        <p className="flex items-center h-12 px-4 border border-[#DADADA] rounded-lg text-[#5b5b5b] bg-[#f5f5f5] text-sm">{nights}</p>
        <p>Night</p>
      </div>
      <SelectInput
          name="rateSource"
          label="Rate Source"
          control={control as Control<any>}
          placeholder="Select Rate Source"
          options={rateSourceList}
        />
      <div className="grid grid-cols-3 gap-2">
        <SelectInput
          name="rateGroup"
          label="Rate Group"
          control={control as Control<any>}
          placeholder="Select Rate Group"
          options={rateGroup}
        />
        <SelectInput
          name="reservationMode"
          label="Reservation Mode"
          control={control as Control<any>}
          placeholder="Select Reservation Mode"
          options={reservationMode}
        />
        <SelectInput
          name="type"
          label="Type"
          control={control as Control<any>}
          placeholder="Select Type"
          options={reservationType}
        />
      </div>
    </CardForm>
  )
}