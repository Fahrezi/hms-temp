import CardForm from "@/components/ui/CardForm/CardForm";
import { InputLabel } from "@/components/ui/InputLabel";
import SelectInput from "@/components/ui/SelectInput";
import { Control } from "react-hook-form";
import { RHFBridgeProps } from "../types/index.type";
import { Textarea } from "@/components/ui/TextArea";

type StepProps = RHFBridgeProps<any>;

export const GuestInfoForm = ({ form, errors, setValue }: StepProps) => {
  const { register, control, watch } = form;

  return (
    <CardForm className="mt-6" title="Guest Info & Contact">
      <section className="grid grid-cols-2 gap-4 mb-6">
        <SelectInput
          name="guestType"
          label="Guest Type"
          control={control as Control<any>}
          placeholder="Select Type"
          options={[
            { label: 'Chargeable', value: 'Chargeable' },
            { label: 'Rate Group 2', value: 'Rate Group 2' },
            { label: 'Rate Group 3', value: 'Rate Group 3' },
          ]}
        />
        <div className="grid grid-cols-2 items-end gap-2">
          <SelectInput
            name="guestId"
            label="Guest ID"
            control={control as Control<any>}
            placeholder="Select Type"
            options={[
              { label: 'Chargeable', value: 'Chargeable' },
              { label: 'Rate Group 2', value: 'Rate Group 2' },
              { label: 'Rate Group 3', value: 'Rate Group 3' },
            ]}
          />
          <InputLabel
            label=""
            type="text"
            placeholder="Enter RSVP Date"
            errors={errors}
            {...register('idNumberGuest')}
          />
        </div>
        <InputLabel
          label="Expiry Date"
          type="date"
          placeholder="Enter Expiry Date"
          errors={errors}
          {...register('expiryDate')}
        />
        <div className="grid grid-cols-2 items-end gap-2">
          <InputLabel
            label="Last Name"
            type="date"
            placeholder="Enter Last Name"
            errors={errors}
            {...register('lastName')}
          />
          <InputLabel
            label="First Name"
            type="date"
            placeholder="Enter First Name"
            errors={errors}
            {...register('firstName')}
          />
        </div>
        <SelectInput
          name="country"
          label="Country"
          control={control as Control<any>}
          placeholder="Select Type"
          options={[
            { label: 'Chargeable', value: 'Chargeable' },
            { label: 'Rate Group 2', value: 'Rate Group 2' },
            { label: 'Rate Group 3', value: 'Rate Group 3' },
          ]}
        />
        <InputLabel
          label="Postal Code"
          type="text"
          placeholder="Enter Postal Code"
          errors={errors}
          {...register('postalCode')}
        />
        <InputLabel
          label="Date of Birth"
          type="date"
          placeholder="Enter Date of Birth"
          errors={errors}
          {...register('dateOfBirth')}
        />
        <InputLabel
          label="Title"
          type="text"
          placeholder="Enter Title"
          errors={errors}
          {...register('titleGuest')}
        />
        <Textarea
          label="Home Address"
          placeholder="Enter Home Address"
          errors={errors}
          {...register('homeAddress')}
        />
        <div></div>
        <InputLabel
          label="Nationality"
          type="text"
          placeholder="Enter Nationality"
          errors={errors}
          {...register('nationality')}
        />
        <SelectInput
          name="city"
          label="City"
          control={control as Control<any>}
          placeholder="Select City"
          options={[
            { label: 'Chargeable', value: 'Chargeable' },
            { label: 'Rate Group 2', value: 'Rate Group 2' },
            { label: 'Rate Group 3', value: 'Rate Group 3' },
          ]}
        />
        <InputLabel
          label="Contact No"
          type="text"
          placeholder="Enter Contact Number"
          errors={errors}
          {...register('contactNumber')}
        />
        <InputLabel
          label="Email Address"
          type="text"
          placeholder="Enter Email Address"
          errors={errors}
          {...register('emailAddress')}
        />
        <SelectInput
          name="occupation"
          label="Occupation"
          control={control as Control<any>}
          placeholder="Select Occupation"
          options={[
            { label: 'Chargeable', value: 'Chargeable' },
            { label: 'Rate Group 2', value: 'Rate Group 2' },
            { label: 'Rate Group 3', value: 'Rate Group 3' },
          ]}
        />
        <SelectInput
          name="placeOfEmployment"
          label="Place of Employment"
          control={control as Control<any>}
          placeholder="Select Place of Employment"
          options={[
            { label: 'Chargeable', value: 'Chargeable' },
            { label: 'Rate Group 2', value: 'Rate Group 2' },
            { label: 'Rate Group 3', value: 'Rate Group 3' },
          ]}
        />
        <div className="grid grid-cols-2 items-start gap-2">
          <InputLabel
            label="Arrived From"
            type="text"
            placeholder="Enter Arrived From"
            errors={errors}
            {...register('arrivedFrom')}
          />
          <InputLabel
            label="Next Destination"
            type="text"
            placeholder="Enter Next Destination"
            errors={errors}
            {...register('nextDestination')}
          />
        </div>
        <Textarea
          label="Billing Instruction"
          placeholder="Enter Billing Instruction"
          errors={errors}
          {...register('billingInstruction')}
        />
      </section>
    </CardForm>
  );
};