import CardForm from "@/components/ui/CardForm/CardForm";
import { InputLabel } from "@/components/ui/InputLabel";
import SelectInput from "@/components/ui/SelectInput";
import { Control } from "react-hook-form";
import { RHFBridgeProps } from "../types/index.type";
import { Textarea } from "@/components/ui/TextArea";
import { guestIdTypeList, guestTypeList } from "@/constants/data";
import { useDetail } from "../hooks/detail.hooks";

type StepProps = RHFBridgeProps<any>;

export const DetailForm = ({ form, errors }: StepProps) => {
  const { register, control } = form;
  const { citiesList, countryList, languageList, nationalityList } = useDetail();

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
            label="Mailing Address"
            type="text"
            placeholder="Mailing Address"
            errors={errors}
            {...register('mailingAddress')}
          />
          <InputLabel
            label="Phone"
            type="text"
            placeholder="Phone"
            errors={errors}
            {...register('phoneNumberDetail')}
          />
          <InputLabel
            label="Alternative Phone"
            type="text"
            placeholder="Alternative Phone"
            errors={errors}
            {...register('alternativePhone')}
          />
          <SelectInput
            name="country"
            label="Country"
            control={control as Control<any>}
            placeholder="Select Country"
            options={countryList}
          />
          <SelectInput
            name="city"
            label="City"
            control={control as Control<any>}
            placeholder="Select City"
            options={citiesList}
          />
          <div className="grid grid-cols-2 gap-4">
            <SelectInput
              name="nationality"
              label="Nationality"
              control={control as Control<any>}
              placeholder="Select Nationality"
              options={nationalityList}
            />
            <SelectInput
              name="language"
              label="Language"
              control={control as Control<any>}
              placeholder="Select Language"
              options={languageList}
            />
          </div>
          <InputLabel
            label="Mobile"
            type="text"
            placeholder="Mobile"
            errors={errors}
            {...register('mobileDetail')}
          />
          <InputLabel
            label="Fax"
            type="text"
            placeholder="Fax"
            errors={errors}
            {...register('faxDetail')}
          />
          <InputLabel
            label="E-mail"
            type="text"
            placeholder="E-mail"
            errors={errors}
            {...register('emailDetail')}
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
            options={guestIdTypeList}
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
            options={guestTypeList}
          />
          <div className="grid grid-cols-2 gap-4 items-end">
            <InputLabel
              label="Special Date"
              type="date"
              placeholder="Special Date"
              errors={errors}
              {...register('specialDate')}
            />
            <Textarea
              label=""
              placeholder="Notes"
              errors={errors}
              {...register('specialDateNote')}
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
            {...register('companyDetail')}
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
            {...register('companyPhoneDetail')}
          />
          <InputLabel
            label="Mobile"
            type="text"
            placeholder="Mobile"
            errors={errors}
            {...register('companyMobile')}
          />
          <InputLabel
            label="Fax"
            type="text"
            placeholder="Fax"
            errors={errors}
            {...register('companyFax')}
          />
          <InputLabel
            label="Website"
            type="text"
            placeholder="Website"
            errors={errors}
            {...register('companySite')}
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