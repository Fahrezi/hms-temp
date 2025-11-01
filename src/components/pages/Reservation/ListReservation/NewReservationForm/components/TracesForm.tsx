import CardForm from "@/components/ui/CardForm/CardForm";
import { InputLabel } from "@/components/ui/InputLabel";
import SelectInput from "@/components/ui/SelectInput";
import { Control, Controller } from "react-hook-form";
import { RHFBridgeProps } from "../types/index.type";
import { Textarea } from "@/components/ui/TextArea";
import MultiFieldInput from "@/components/ui/MultiFieldInput";
import DynamicSelectInput from "@/components/ui/DynamicSelectInput";
import { Checkbox } from "@/components/ui/Checkbox";

type StepProps = RHFBridgeProps<any>;
const HEADER_REMINDER: { label: string; value: string }[] = [
  { label: 'Taken Date', value: 'takenDateReminder' },
  { label: 'Subject', value: 'subjectReminder' },
  { label: 'Remind On Time', value: 'remindOnReminder' },
  { label: 'Taken Time', value: 'takenDateReminder' },
  { label: 'Taken By', value: 'followUpByReminder' },
];

const REMINDER_INDEX_BODY = [
  'takenDateReminder',
  'subjectReminder',
  'remindOnReminder',
  'takenDateReminder',
  'followUpByReminder',
];

const HEADER_INVENTORY: { label: string; value: string }[] = [
  { label: 'Taken Date', value: 'takenDateInventoryRequest' },
  { label: 'Inventory', value: 'inventoryItemInventoryRequest' },
  { label: 'qty', value: 'qtyInventoryRequest' },
  { label: 'Ref#', value: 'refInventoryRequest' },
  { label: 'Taken Time', value: 'takenDateInventoryRequest' },
  { label: 'Taken By', value: 'followUpByInventoryRequest' },
];

const INVENTORY_INDEX_BODY = [
  'takenDateInventoryRequest',
  'inventoryItemInventoryRequest',
  'qtyInventoryRequest',
  'refInventoryRequest',
  'takenDateInventoryRequest',
  'followUpByInventoryRequest',
];

const HEADER_LEISURE: { label: string; value: string }[] = [
  { label: 'Taken Date', value: 'takenDateLeisureBooking' },
  { label: 'Group ID', value: 'leisureGroupLeisureBooking' },
  { label: 'Last Name', value: 'lastNameLeisureBooking' },
  { label: 'First Name', value: 'firstNameLeisureBooking' },
  { label: 'For', value: 'bookingForLeisureBooking' },
  { label: 'qty', value: 'qtyLeisureBooking' },
  { label: 'Ref#', value: 'refLeisureBooking' },
];

const LEISURE_INDEX_BODY = [
  'takenDateLeisureBooking',
  'leisureGroupLeisureBooking',
  'lastNameLeisureBooking',
  'firstNameLeisureBooking',
  'bookingForLeisureBooking',
  'qtyLeisureBooking',
  'refLeisureBooking',
];

export const TracesForm = ({ form, errors, setValue }: StepProps) => {
  const { watch } = form;

  const reminderValues = watch('reminder');
  const inventoryValues = watch('inventoryRequest');
  const leisureValues = watch('leisureBooking');

  return (
    <CardForm className="mt-6" title="Traces">
      <MultiFieldInput
        buttonText="Add Reminder"
        headerTable={HEADER_REMINDER}
        values={reminderValues}
        onSubmit={(data) => setValue('reminder', data)}
        title="Reminder"
        indexBody={REMINDER_INDEX_BODY}
      >
        {({ register: registerMulti, control: controlMulti }) => (
          <div className="grid grid-cols-2 gap-4">
            <InputLabel
              label="Taken Date - Time"
              type="datetime-local"
              placeholder="Enter Taken Date"
              errors={errors}
              {...registerMulti('takenDateReminder')}
            />
            <InputLabel
              label="Subject"
              type="text"
              placeholder="Enter Subject"
              errors={errors}
              {...registerMulti('subjectReminder')}
            />
            <InputLabel
              label="Remind On - Time"
              type="datetime-local"
              placeholder="Enter Taken Date"
              errors={errors}
              {...registerMulti('remindOnReminder')}
            />
            <Textarea
              label="Text Message"
              placeholder="Enter Message"
              errors={errors}
              {...registerMulti('messageReminder')}
            />
            <h3 className="col-span-2 text-center py-2 bg-gray-700 text-white">Follow Up Status</h3>
            <InputLabel
              label="Date - Time"
              type="datetime-local"
              placeholder="Enter Follow Up Date"
              errors={errors}
              {...registerMulti('followUpDateReminder')}
            />
            <InputLabel
              label="By"
              type="text"
              placeholder=""
              errors={errors}
              {...registerMulti('followUpByReminder')}
            />
            <SelectInput
              name="followUpIdReminder"
              label="ID"
              control={controlMulti as Control<any>}
              placeholder="Select ID"
              options={[
                { label: 'Chargeable', value: 'Chargeable' },
                { label: 'Rate Group 2', value: 'Rate Group 2' },
                { label: 'Rate Group 3', value: 'Rate Group 3' },
              ]}
            />
            <Textarea
              label="Notes"
              placeholder="Enter Notes"
              errors={errors}
              {...registerMulti('followUpNotesReminder')}
            />
          </div>
        )}
      </MultiFieldInput>
      <MultiFieldInput
        buttonText="Add Inventory Request"
        headerTable={HEADER_INVENTORY}
        values={inventoryValues}
        onSubmit={(data) => setValue('inventoryRequest', data)}
        title="Inventory Request"
        indexBody={INVENTORY_INDEX_BODY}
      >
        {({ register: registerMulti, control: controlMulti }) => (
          <div className="grid grid-cols-2 gap-4">
            <InputLabel
              label="Taken Date - Time"
              type="datetime-local"
              placeholder="Enter Taken Date"
              errors={errors}
              {...registerMulti('takenDateInventoryRequest')}
            />
            <SelectInput
              name="inventoryGroupInventoryRequest"
              label="Inventory Group"
              control={controlMulti as Control<any>}
              placeholder="Select Inventory Group"
              options={[
                { label: 'Chargeable', value: 'Chargeable' },
                { label: 'Rate Group 2', value: 'Rate Group 2' },
                { label: 'Rate Group 3', value: 'Rate Group 3' },
              ]}
            />
            <SelectInput
              name="inventoryItemInventoryRequest"
              label="Inventory Item"
              control={controlMulti as Control<any>}
              placeholder="Select Inventory Item"
              options={[
                { label: 'Chargeable', value: 'Chargeable' },
                { label: 'Rate Group 2', value: 'Rate Group 2' },
                { label: 'Rate Group 3', value: 'Rate Group 3' },
              ]}
            />
            <InputLabel
              label="On Hand"
              type="text"
              disabled
              placeholder="0"
              errors={errors}
              {...registerMulti('onHandInventoryRequest')}
            />  
            <div className="grid grid-cols-2 gap-4">
              <InputLabel
                label="Borrowed"
                type="text"
                placeholder="0"
                errors={errors}
                {...registerMulti('borrowedInventoryRequest')}
              />
              <InputLabel
                label="Balance"
                type="text"
                placeholder="0"
                disabled
                errors={errors}
                {...registerMulti('balanceInventoryRequest')}
              />
            </div>
            <InputLabel
              label="Ref#"
              type="text"
              placeholder=""
              errors={errors}
              {...registerMulti('refInventoryRequest')}
            />
            <Textarea
              label="Notes"
              placeholder="Enter Notes"
              errors={errors}
              {...registerMulti('notesInventoryRequest')}
            />
            <h3 className="col-span-2 text-center py-2 bg-gray-700 text-white">Follow Up Status</h3>
            <InputLabel
              label="Date - Time"
              type="datetime-local"
              placeholder="Enter Taken Date"
              errors={errors}
              {...registerMulti('followUpDateInventoryRequest')}
            />
            <InputLabel
              label="By"
              type="text"
              placeholder=""
              errors={errors}
              {...registerMulti('followUpByInventoryRequest')}
            />
            <SelectInput
              name="followUpIdInventoryRequest"
              label="ID"
              control={controlMulti as Control<any>}
              placeholder="Select ID"
              options={[
                { label: 'Chargeable', value: 'Chargeable' },
                { label: 'Rate Group 2', value: 'Rate Group 2' },
                { label: 'Rate Group 3', value: 'Rate Group 3' },
              ]}
            />
            <Textarea
              label="Notes"
              placeholder="Enter Notes"
              errors={errors}
              {...registerMulti('followUpNotesInventoryRequest')}
            />
          </div>
        )}
      </MultiFieldInput>
       <MultiFieldInput
        buttonText="Add Leisure Booking"
        headerTable={HEADER_LEISURE}
        values={leisureValues}
        onSubmit={(data) => setValue('leisureBooking', data)}
        title="Leisure Booking"
        indexBody={LEISURE_INDEX_BODY}
      >
        {({ register: registerMulti, control: controlMulti }) => (
          <div className="grid grid-cols-2 gap-4">
            <InputLabel
              label="Taken Date - Time"
              type="datetime-local"
              className="col-span-2"
              placeholder="Enter Taken Date"
              errors={errors}
              {...registerMulti('takenDateLeisureBooking')}
            />
            <DynamicSelectInput
              name="leisureGroupLeisureBooking"
              label="Leisure Group"
              onSubmit={() => {}}
              className="col-span-2"
              control={controlMulti as Control<any>}
              placeholder="Select Leisure Group"
              optionsSelect={[
                { label: 'Chargeable', value: 'Chargeable' },
                { label: 'Rate Group 2', value: 'Rate Group 2' },
                { label: 'Rate Group 3', value: 'Rate Group 3' },
              ]}
            >
              {({ register: registerMulti, control: controlMulti }) => (
              <>
                <SelectInput
                  name="propertyLeisureBooking"
                  label="Property"
                  control={controlMulti as Control<any>}
                  placeholder="Select Property"
                  options={[
                    { label: 'Chargeable', value: 'Chargeable' },
                    { label: 'Rate Group 2', value: 'Rate Group 2' },
                    { label: 'Rate Group 3', value: 'Rate Group 3' },
                  ]}
                />
                <InputLabel
                  label="Group ID"
                  type="text"
                  placeholder=""
                  errors={errors}
                  {...registerMulti('groupIdLeisureBooking')}
                />
                <InputLabel
                  label="Description"
                  type="text"
                  placeholder=""
                  errors={errors}
                  {...registerMulti('descriptionLeisureBooking')}
                />
                <Controller
                  name="activeLeisureBooking"
                  control={controlMulti}
                  render={({ field }) => (
                    <div>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <label className="ml-2" htmlFor="activeLeisureBooking">In-Active</label>
                    </div>
                  )}
                />
              </>
              )}
            </DynamicSelectInput>
            <div className="grid grid-cols-2 gap-4">
              <InputLabel
                label="Last Name"
                type="text"
                placeholder=""
                errors={errors}
                {...registerMulti('lastNameLeisureBooking')}
              /> 
              <InputLabel
                label="First Name"
                type="text"
                placeholder=""
                errors={errors}
                {...registerMulti('firstNameLeisureBooking')}
              /> 
            </div>
            <InputLabel
              label="Booking For - Time"
              type="datetime-local"
              placeholder="Enter Booking For"
              errors={errors}
              {...registerMulti('bookingForLeisureBooking')}
            />
            <InputLabel
              label="Quantity"
              type="text"
              disabled
              placeholder="0"
              errors={errors}
              {...registerMulti('quantityLeisureBooking')}
            />  
            <InputLabel
              label="Ref#"
              type="text"
              placeholder=""
              errors={errors}
              {...registerMulti('refLeisureBooking')}
            />
            <Textarea
              label="Notes"
              placeholder="Enter Notes"
              errors={errors}
              {...registerMulti('notesLeisureBooking')}
            />
            <h3 className="col-span-2 text-center py-2 bg-gray-700 text-white">Follow Up Status</h3>
            <InputLabel
              label="Date - Time"
              type="datetime-local"
              placeholder="Enter Taken Date"
              errors={errors}
              {...registerMulti('followUpDateInventoryRequest')}
            />
            <InputLabel
              label="By"
              type="text"
              placeholder=""
              errors={errors}
              {...registerMulti('followUpByInventoryRequest')}
            />
            <SelectInput
              name="followUpIdInventoryRequest"
              label="ID"
              control={controlMulti as Control<any>}
              placeholder="Select ID"
              options={[
                { label: 'Chargeable', value: 'Chargeable' },
                { label: 'Rate Group 2', value: 'Rate Group 2' },
                { label: 'Rate Group 3', value: 'Rate Group 3' },
              ]}
            />
            <Textarea
              label="Notes"
              placeholder="Enter Notes"
              errors={errors}
              {...registerMulti('followUpNotesInventoryRequest')}
            />
          </div>
        )}
      </MultiFieldInput>
    </CardForm>
  );
};