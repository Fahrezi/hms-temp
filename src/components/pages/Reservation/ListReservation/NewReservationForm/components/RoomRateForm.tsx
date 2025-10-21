import CardForm from "@/components/ui/CardForm/CardForm";
import { InputLabel } from "@/components/ui/InputLabel";
import SelectInput from "@/components/ui/SelectInput";
import { Control } from "react-hook-form";
import { RHFBridgeProps } from "../types/index.type";
import { Textarea } from "@/components/ui/TextArea";
import MultiFieldInput from "@/components/ui/MultiFieldInput";
import TableInput from "@/components/ui/TableInput";

type StepProps = RHFBridgeProps<any>;

const HEADER_ACCOMMODATION: { label: string; value: string }[] = [
  { label: 'Type', value: 'typeAccommodation' },
  { label: 'RSVP Type', value: 'rsvpTypeAccommodation' },
  { label: 'RSC', value: 'rscAccommodation' },
  { label: 'Room', value: 'roomAccommodation' },
  { label: 'Cut Off', value: 'cutOffAccommodation' },
  { label: 'Child Amount', value: 'childAmountAccommodation' },
  { label: 'Adult Amount', value: 'adultAmountAccommodation' },
];

const INDEX_BODY = [
  'adultAmountAccommodation',
  'childAmountAccommodation',
  'cutOffAccommodation',
  'roomAccommodation',
  'rscAccommodation',
  'rsvpTypeAccommodation',
  'typeAccommodation'
];

const HEADER_RATE = [
  { label: 'From', value: 'fromRate' },
  { label: 'Until', value: 'untilRate' },
  { label: 'Item', value: 'itemRate' },
  { label: 'Description', value: 'descriptionRate' },
  { label: '#Room', value: 'roomIdRate' },
  { label: 'Qty', value: 'quantityRate' },
  { label: 'Nights', value: 'nightAmountRate' },
  { label: 'Rate', value: 'rate' },
  { label: 'Amount', value: 'amountRate' },
  { label: 'RPL', value: 'rplRate' },
];

const rateSeed = [
  {
    fromRate: '2025-10-01',
    untilRate: '2025-10-05',
    itemRate: 'Deluxe Room',
    descriptionRate: 'Sea view deluxe room with breakfast',
    roomIdRate: 'R-101',
    quantityRate: 2,
    nightAmountRate: 4,
    rate: 750000,
    amountRate: 6000000,
    rplRate: 'Yes',
  },
  {
    fromRate: '2025-10-03',
    untilRate: '2025-10-07',
    itemRate: 'Suite Room',
    descriptionRate: 'Spacious suite with balcony and living room',
    roomIdRate: 'R-203',
    quantityRate: 1,
    nightAmountRate: 4,
    rate: 1250000,
    amountRate: 5000000,
    rplRate: 'No',
  },
  {
    fromRate: '2025-10-10',
    untilRate: '2025-10-12',
    itemRate: 'Standard Room',
    descriptionRate: 'Basic room for short stay',
    roomIdRate: 'R-305',
    quantityRate: 3,
    nightAmountRate: 2,
    rate: 500000,
    amountRate: 3000000,
    rplRate: 'Yes',
  },
  {
    fromRate: '2025-11-01',
    untilRate: '2025-11-05',
    itemRate: 'Family Room',
    descriptionRate: 'Large family suite with two queen beds',
    roomIdRate: 'R-402',
    quantityRate: 1,
    nightAmountRate: 4,
    rate: 950000,
    amountRate: 3800000,
    rplRate: 'No',
  },
  {
    fromRate: '2025-12-20',
    untilRate: '2025-12-25',
    itemRate: 'Executive Room',
    descriptionRate: 'Premium executive room with lounge access',
    roomIdRate: 'R-509',
    quantityRate: 2,
    nightAmountRate: 5,
    rate: 1350000,
    amountRate: 13500000,
    rplRate: 'Yes',
  },
];

export const RoomRateForm = ({ form, errors, setValue }: StepProps) => {
  const { register, control, watch } = form;
  const valuesAccommodation = watch('accommodation');
  const valuesRate = watch('rate');

  return (
    <CardForm className="mt-6" title="Room & Rate">
      <MultiFieldInput
        buttonText="Add Accommodation"
        headerTable={HEADER_ACCOMMODATION}
        values={valuesAccommodation}
        onSubmit={(data) => setValue('accommodation', data)}
        title="Accommodation"
        indexBody={INDEX_BODY}
      >
        {({ register: registerMulti, control: controlMulti }) => (
          <div className="grid grid-cols-2 gap-4">
            <SelectInput
              name="typeAccommodation"
              label="Type"
              control={controlMulti as Control<any>}
              placeholder="Select Type"
              options={[
                { label: 'Chargeable', value: 'Chargeable' },
                { label: 'Rate Group 2', value: 'Rate Group 2' },
                { label: 'Rate Group 3', value: 'Rate Group 3' },
              ]}
            />
            <SelectInput
              name="rsvpTypeAccommodation"
              label="RSVP Type"
              control={controlMulti as Control<any>}
              placeholder="Select Type"
              options={[
                { label: 'Chargeable', value: 'Chargeable' },
                { label: 'Rate Group 2', value: 'Rate Group 2' },
                { label: 'Rate Group 3', value: 'Rate Group 3' },
              ]}
            />
            <InputLabel
              label="RSC"
              type="text"
              placeholder="Enter RSC"
              errors={errors}
              {...registerMulti('rscAccommodation')}
            />
            <InputLabel
              label="Room"
              type="text"
              placeholder="Enter Room"
              errors={errors}
              {...registerMulti('roomAccommodation')}
            />
            <InputLabel
              label="Adult"
              type="text"
              placeholder="Enter Adult"
              errors={errors}
              {...registerMulti('adultAmountAccommodation')}
            />
            <InputLabel
              label="Child"
              type="text"
              placeholder="Enter Child"
              errors={errors}
              {...registerMulti('childAmountAccommodation')}
            />
            <InputLabel
              label="Cut Off"
              type="text"
              placeholder="Enter Cut Off"
              errors={errors}
              {...registerMulti('cutOffAccommodation')}
            />
          </div>
        )}
      </MultiFieldInput>
      <section className="mb-6">
        <h4 className="mb-6 text-[#5b5b5b] text-xl">Booking Info</h4>
        <div className="grid grid-cols-2 gap-4">
          <InputLabel
            label="Inventory Source"
            type="text"
            placeholder="Enter RSVP Date"
            errors={errors}
            {...register('inventorySource')}
          />
          <InputLabel
            label="Reservation Type"
            type="text"
            placeholder="Enter Rate Source"
            errors={errors}
            {...register('reservationType')}
          />
          <div>
            <p className="mb-2 font-medium text-sm">Confirmation - By</p>
            <div className="grid grid-cols-2 gap-4">
              <InputLabel
                label=""
                type="text"
                placeholder="by"
                errors={errors}
                {...register('confirmation')}
              />
              <InputLabel
                label=""
                type="text"
                placeholder="confirmation"
                errors={errors}
                {...register('confirmationBy')}
              /> 
            </div>
          </div> 
          <SelectInput
            name="sellingType"
            label="Selling Type"
            control={control as Control<any>}
            placeholder="Select Type"
            options={[
              { label: 'Chargeable', value: 'Chargeable' },
              { label: 'Rate Group 2', value: 'Rate Group 2' },
              { label: 'Rate Group 3', value: 'Rate Group 3' },
            ]}
          />
          <Textarea
            label="Notes Detail"
            placeholder="Notes Detail"
            errors={errors}
            {...register('notesDetail')}
          /> 
        </div>
      </section>
      <section>
        <TableInput
          headerTable={HEADER_RATE}
          data={rateSeed}
          onCheck={(data) => setValue("rate", data)}
          title="Rate"
          values={valuesRate}
        />
      </section>
    </CardForm>
  );
};