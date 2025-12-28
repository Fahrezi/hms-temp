import CardForm from "@/components/ui/CardForm/CardForm";
import { InputLabel } from "@/components/ui/InputLabel";
import TableInput from "@/components/ui/TableInput";
import { Textarea } from "@/components/ui/TextArea";

import { RHFBridgeProps } from "../types/index.type";

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

export const GroupForm = ({ form, errors, setValue }: StepProps) => {
  const { watch, register } = form;
  const valuesListGroup = watch('roomingListGroup');

  return (
    <CardForm className="mt-6" title="Traces">
      <section className="mb-6">
        <h4 className="mb-6 text-[#5b5b5b] text-xl">Tour / Group Information</h4>
        <div className="grid grid-cols-2 gap-6">
          <InputLabel
            label="ID Leader"
            type="text"
            placeholder="Enter ID Leader"
            errors={errors}
            {...register('idLeaderGroup')}
          />
          <InputLabel
            label="Leader Name"
            type="text"
            placeholder="Enter Leader Name"
            errors={errors}
            {...register('leaderNameGroup')}
          />
          <Textarea
            label="Group Notes"
            placeholder="Enter Group Notes"
            errors={errors}
            {...register('groupNotes')}
          /> 
        </div>
      </section>
      <section className="mb-6">
        <h4 className="mb-6 text-[#5b5b5b] text-xl">Arrangement</h4>
        <div className="grid grid-cols-2 gap-4">
          <Textarea
            label="Room Notes"
            placeholder="Enter Room Notes"
            errors={errors}
            {...register('roomNotesGroup')}
          /> 
          <Textarea
            label="F & B"
            placeholder="Enter F & B Notes"
            errors={errors}
            {...register('fnbNotesGroup')}
          /> 
          <Textarea
            label="Other"
            placeholder="Enter Other Notes"
            errors={errors}
            {...register('otherNotesGroup')}
          /> 
        </div>
      </section>
      <section>
        <TableInput
          headerTable={HEADER_RATE}
          data={seedGuestList}
          onCheck={(data) => {
            console.log(data);
            setValue("guestList", data)
        }}
          title="Guest List"
          values={valuesListGroup}
        />
      </section>
    </CardForm>
  );
};