import CardForm from "@/components/ui/CardForm/CardForm";
import { RHFBridgeProps } from "../types/index.type";
import { InputLabel } from "@/components/ui/InputLabel";
import SelectInput from "@/components/ui/SelectInput";
import { Control } from "react-hook-form";
import TableInput from "@/components/ui/TableInput";

type StepProps = RHFBridgeProps<any>;
const HEADER_RATE = [
  { label: 'Type', value: 'typeGuestList' },
  { label: 'Rm#', value: 'roomNumberGuestList' },
  { label: 'Last Name', value: 'lastNameGuestList' },
  { label: 'First Name', value: 'firstNameGuestList' },
  { label: 'Reg.#', value: 'regGuestList' },
  { label: 'Profile #', value: 'profileGuestList' },
  { label: 'Arrival', value: 'arrivalGuestList' },
  { label: 'Departure', value: 'departureGuestList' },
  { label: 'Status', value: 'statusGuestList' },
];

const seedGuestList = [
  {
    typeGuestList: 'VIP',
    roomNumberGuestList: '101',
    lastNameGuestList: 'Doe',
    firstNameGuestList: 'John',
    regGuestList: 'REG12345',
    profileGuestList: 'P123456',
    arrivalGuestList: '2025-10-10',
    departureGuestList: '2025-10-15',
    statusGuestList: 'Checked In',
  },
  {
    typeGuestList: 'Regular',
    roomNumberGuestList: '102',
    lastNameGuestList: 'Smith',
    firstNameGuestList: 'Jane',
    regGuestList: 'REG67890',
    profileGuestList: 'P654321',
    arrivalGuestList: '2025-10-12',
    departureGuestList: '2025-10-16',
    statusGuestList: 'Reserved',
  },
  {
    typeGuestList: 'Group',
    roomNumberGuestList: '103',
    lastNameGuestList: 'Brown',
    firstNameGuestList: 'Charlie',
    regGuestList: 'REG11223',
    profileGuestList: 'P998877',
    arrivalGuestList: '2025-10-11',
    departureGuestList: '2025-10-14',
    statusGuestList: 'Checked Out',
  }
];


export const BasicVisitorForm = ({ form, errors, setValue }: StepProps) => {
  const { register, control, watch } = form;
  const valuesGuestList = watch('guestList');

  console.log(valuesGuestList);

  return (
    <CardForm className="mt-6 grid grid-cols-2 gap-4 items-end" title="Basic Visitor Information">
      <InputLabel
        label="RSVP Date"
        type="date"
        placeholder="Enter RSVP Date"
        errors={errors}
        {...register('rsvpDate')}
      />
      <p className="py-2 px-4 border border-[#DADADA] rounded-lg text-[#5b5b5b] bg-[#f5f5f5] text-sm">RSAP099999</p>
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
        <p className="py-2 px-4 border border-[#DADADA] rounded-lg text-[#5b5b5b] bg-[#f5f5f5] text-sm">1</p>
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
      <section className="col-span-2">
        <TableInput
          headerTable={HEADER_RATE}
          data={seedGuestList}
          onCheck={(data) => {
            console.log(data);
            setValue("guestList", data)
        }}
          title="Guest List"
          values={valuesGuestList}
        />
      </section>
    </CardForm>
  )
}