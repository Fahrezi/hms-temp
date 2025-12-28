import { Control } from "react-hook-form";

import CardForm from "@/components/ui/CardForm/CardForm";
import { InputLabel } from "@/components/ui/InputLabel";
import SelectInput from "@/components/ui/SelectInput";
import { Textarea } from "@/components/ui/TextArea";

import { RHFBridgeProps } from "../types/index.type";

type StepProps = RHFBridgeProps<any>;

export const RsvpForm = ({ form, errors }: StepProps) => {
  const { register, control } = form;
  return (
    <CardForm className="mt-6" title="RSVP Info">
      <section className="mb-8">
        <h4 className="mb-4 text-[#5b5b5b] text-lg">RSVP Info</h4>
        <div className="grid grid-cols-2 gap-4">
          <SelectInput
            name="purposeOfVisit"
            label="Purpose of Visit"
            control={control as Control<any>}
            placeholder="Select Type"
            options={[
              { label: 'Chargeable', value: 'Chargeable' },
              { label: 'Rate Group 2', value: 'Rate Group 2' },
              { label: 'Rate Group 3', value: 'Rate Group 3' },
            ]}
          />
          <SelectInput
            name="sourceOfBusiness"
            label="Source of Business"
            control={control as Control<any>}
            placeholder="Select Type"
            options={[
              { label: 'Chargeable', value: 'Chargeable' },
              { label: 'Rate Group 2', value: 'Rate Group 2' },
              { label: 'Rate Group 3', value: 'Rate Group 3' },
            ]}
          />
          <SelectInput
            name="segmentMarket"
            label="Segment Market"
            control={control as Control<any>}
            placeholder="Select Type"
            options={[
              { label: 'Chargeable', value: 'Chargeable' },
              { label: 'Rate Group 2', value: 'Rate Group 2' },
              { label: 'Rate Group 3', value: 'Rate Group 3' },
            ]}
          />
        </div>
      </section>
      <section className="mb-8">
        <h4 className="mb-4 text-[#5b5b5b] text-lg">Reserved By</h4>
        <div className="grid grid-cols-2 gap-4">
          <InputLabel
            label="Booker"
            type="text"
            placeholder="by"
            errors={errors}
            {...register('booker')}
          />
          <InputLabel
            label="Booking Source"
            type="text"
            placeholder="Booking Source"
            errors={errors}
            {...register('bookingSource')}
          />
          <InputLabel
            label="Company"
            type="text"
            placeholder="Company"
            errors={errors}
            {...register('company')}
          />
          <InputLabel
            label="Phone Mobile"
            type="text"
            placeholder="Phone Mobile"
            errors={errors}
            {...register('phoneMobile')}
          />
          <InputLabel
            label="Promo"
            type="text"
            placeholder="Promo"
            errors={errors}
            {...register('promo')}
          />
          <InputLabel
            label="E-mail"
            type="text"
            placeholder="E-mail"
            errors={errors}
            {...register('email')}
          />
          <div className="grid grid-cols-2 gap-4 items-end">
            <SelectInput
              name="eta"
              label="E.T.A / By"
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
              placeholder="ETA by"
              errors={errors}
              {...register('etaBy')}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 items-end">
            <SelectInput
              name="eta"
              label="E.T.D / By"
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
              placeholder="ETD by"
              errors={errors}
              {...register('etdBy')}
            />
          </div>
        </div>
      </section>
      <section>
        <h4 className="mb-4 text-[#5b5b5b] text-lg">Notes</h4>
        <div className="grid grid-cols-2 gap-4">
          <InputLabel
            label="Courtesy Order (Arrival)"
            type="text"
            placeholder="courtesyOrder"
            errors={errors}
            {...register('courtesyOrder')}
          />
          <InputLabel
            label="Courtesy Order (Departure)"
            type="text"
            placeholder="Courtesy Order (Departure)"
            errors={errors}
            {...register('courtesyDeparture')}
          />
          <InputLabel
            label="Billing Instruction"
            type="text"
            placeholder="Billing Instruction"
            errors={errors}
            {...register('billingInstruction')}
          />
          <InputLabel
            label="Payment Instruction"
            type="text"
            placeholder="Payment Instruction"
            errors={errors}
            {...register('paymentInstruction')}
          />
          <Textarea
            label="Guest Note"
            placeholder="Guest Note"
            errors={errors}
            {...register('guestNote')}
          />
        </div>
      </section>
    </CardForm>
  );
};