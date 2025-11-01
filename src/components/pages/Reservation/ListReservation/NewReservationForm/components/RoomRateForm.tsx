import CardForm from "@/components/ui/CardForm/CardForm";
import { InputLabel } from "@/components/ui/InputLabel";
import SelectInput from "@/components/ui/SelectInput";
import { Control } from "react-hook-form";
import { RHFBridgeProps } from "../types/index.type";
import { Textarea } from "@/components/ui/TextArea";
import MultiFieldInput from "@/components/ui/MultiFieldInput";
import { roomNumberList, roomTypeList, sellingTypeList } from "@/constants/data";

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

const RATE_INDEX_BODY = [
  'from_date',
  'until_date',
  'item',
  'description',
  'item',
  'room_count',
  'nights',
  'amount',
  'rpl'
];

const HEADER_RATE = [
  { label: 'From', value: 'from_rate' },
  { label: 'Until', value: 'until_rate' },
  { label: 'Item', value: 'item' },
  { label: 'Description', value: 'description' },
  { label: '#Room', value: 'item' },
  { label: 'Qty', value: 'room_count' },
  { label: 'Nights', value: 'nights' },
  { label: 'Amount', value: 'amount' },
  { label: 'RPL', value: 'rpl' },
];

export const RoomRateForm = ({ form, errors, setValue }: StepProps) => {
  const { register, control, watch } = form;
  const valuesAccommodation = watch('accommodation');
  const valuesRate = watch('rate');

  return (
    <CardForm className="mt-6" title="Room & Rate">
      <section className="mb-6">
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
      </section>
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
            options={sellingTypeList}
          />
          <Textarea
            label="Notes Detail"
            placeholder="Notes Detail"
            errors={errors}
            {...register('notesDetail')}
          /> 
        </div>
      </section>
      <section className="mb-6">
        <MultiFieldInput
          buttonText="Add Rate List"
          headerTable={HEADER_RATE}
          values={valuesRate}
          onSubmit={(data) => setValue('rate', data)}
          title="Rate"
          indexBody={RATE_INDEX_BODY}
        >
          {({ register: registerMulti, control: controlMulti, watch: watchMulti, setValue: setValueMulti }) => (
            <div className="grid grid-cols-2 gap-4">
              <InputLabel
                label="From"
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                errors={errors}
                {...registerMulti('from_date')}
              />
              <InputLabel
                label="Until"
                type="date"
                defaultValue={new Date().toISOString().split('T')[0]}
                errors={errors}
                {...registerMulti('until_date')}
              />
              <SelectInput 
                name="item"
                label="Type Room"
                control={controlMulti as Control<any>}
                placeholder="Select Type Room"
                options={roomTypeList.map((item) => ({ label: item.label, value: item.id }))}
                onChangeCallback={(v) => setValueMulti('description', roomTypeList.find((item) => item.id === v)?.description)}
              />
              <InputLabel
                label="description"
                type="text"
                disabled
                readOnly
                errors={errors}
                {...registerMulti('description')}
              />
              <SelectInput
                name="room_number"
                label="Room Number"
                control={controlMulti as Control<any>}
                placeholder="Select Room Number"
                options={roomNumberList}
              />
              <InputLabel
                label="Qty"
                type="number"
                errors={errors}
                {...registerMulti('room_count')}
                onChange={(e) => {
                  setValueMulti('room_count', Number(e.target.value));
                  setValueMulti('amount', Number(e.target.value) * Number(watchMulti('nights') ?? 0) * Number(roomTypeList.find((item) => item.id === watchMulti('item'))?.rate));
                }}
              />
              <InputLabel
                label="Nights"
                type="number"
                errors={errors}
                {...registerMulti('nights')}
                onChange={(e) => {
                  setValueMulti('nights', Number(e.target.value));
                  setValueMulti('amount', Number(e.target.value) * Number(watchMulti('nights') ?? 0) * Number(roomTypeList.find((item) => item.id === watchMulti('item'))?.rate));
                }}
              />
              <InputLabel
                label="Amount"
                type="number"
                disabled
                errors={errors}
                readOnly
                {...registerMulti('amount')}
              />
              <InputLabel
                label="RPL"
                type="text"
                errors={errors}
                {...registerMulti('rpl')}
              />
            </div>
          )}
        </MultiFieldInput>
      </section>
    </CardForm>
  );
};