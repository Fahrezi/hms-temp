import CardForm from "@/components/ui/CardForm/CardForm";
import { InputLabel } from "@/components/ui/InputLabel";
import SelectInput from "@/components/ui/SelectInput";
import { Control } from "react-hook-form";
import { RHFBridgeProps } from "../types/index.type";
import { Textarea } from "@/components/ui/TextArea";

type StepProps = RHFBridgeProps<any>;

export const DetailForm = ({ form, errors }: StepProps) => {
  const { register, control } = form;
  return (
    <CardForm className="mt-6" title="Detail">
      <section className="mb-8">
        <h4 className="mb-4 text-[#5b5b5b] text-lg">Guest Profile</h4>
        <div className="grid grid-cols-2 gap-4">
          <InputLabel
            label="First Name"
            type="text"
            placeholder="First Name"
            errors={errors}
            {...register('firstName')}
          />
          <InputLabel
            label="Last Name"
            type="text"
            placeholder="Last Name"
            errors={errors}
            {...register('lastName')}
          />
          <InputLabel
            label="Salutation"
            type="text"
            placeholder="Salutation"
            errors={errors}
            {...register('salutation')}
          />
          <InputLabel
            label="Home Address"
            type="text"
            placeholder="Home Address"
            errors={errors}
            {...register('homeAddress')}
          />
          <InputLabel
            label="Phone"
            type="text"
            placeholder="Phone"
            errors={errors}
            {...register('phone')}
          />
          <InputLabel
            label="Alternative Phone"
            type="text"
            placeholder="Alternative Phone"
            errors={errors}
            {...register('alternativePhone')}
          />
          <InputLabel
            label="Mobile"
            type="text"
            placeholder="Mobile"
            errors={errors}
            {...register('mobile')}
          />
          <InputLabel
            label="Fax"
            type="text"
            placeholder="Fax"
            errors={errors}
            {...register('fax')}
          />
          <InputLabel
            label="E-mail"
            type="text"
            placeholder="E-mail"
            errors={errors}
            {...register('email')}
          />
        </div>
      </section>
      <section className="mb-8">
        <h4 className="mb-4 text-[#5b5b5b] text-lg">Guest Profile Continued</h4>
        <div className="grid grid-cols-2 gap-4">
          <SelectInput
            name="guestIdType"
            label="Guest ID Type"
            control={control as Control<any>}
            placeholder="Select Guest ID Type"
            options={[
              { label: 'Chargeable', value: 'Chargeable' },
              { label: 'Rate Group 2', value: 'Rate Group 2' },
              { label: 'Rate Group 3', value: 'Rate Group 3' },
            ]}
          />
          <InputLabel
            label="guestId"
            type="text"
            placeholder="Guest ID"
            errors={errors}
            {...register('guestId')}
          />
          <SelectInput
            name="guestType"
            label="Guest Type"
            control={control as Control<any>}
            placeholder="Select Guest Type"
            options={[
              { label: 'Chargeable', value: 'Chargeable' },
              { label: 'Rate Group 2', value: 'Rate Group 2' },
              { label: 'Rate Group 3', value: 'Rate Group 3' },
            ]}
          />
          <div className="grid grid-cols-2 gap-4 items-end">
            <InputLabel
              label="Special Date"
              type="date"
              placeholder="Special Date"
              errors={errors}
              {...register('specialDate')}
            />
            <InputLabel
              label=""
              type="text"
              placeholder="Notes"
              errors={errors}
              {...register('notesSpecialDate')}
            /> 
          </div>
        </div>
      </section>
      <section>
        <h4 className="mb-4 text-[#5b5b5b] text-lg">Company Profile</h4>
        <div className="grid grid-cols-2 gap-4">
          <InputLabel
            label="Company"
            type="text"
            placeholder="Company"
            errors={errors}
            {...register('company')}
          />
          <InputLabel
            label="Position"
            type="text"
            placeholder="Position"
            errors={errors}
            {...register('position')}
          />
          <InputLabel
            label="Phone"
            type="text"
            placeholder="Phone"
            errors={errors}
            {...register('phone')}
          />
          <InputLabel
            label="Fax"
            type="text"
            placeholder="Fax"
            errors={errors}
            {...register('fax')}
          />
          <InputLabel
            label="Website"
            type="text"
            placeholder="Website"
            errors={errors}
            {...register('website')}
          />
          <Textarea
            label="Address"
            placeholder="Company Address"
            errors={errors}
            {...register('companyAddress')}
          />
        </div>
      </section>
    </CardForm>
  );
};