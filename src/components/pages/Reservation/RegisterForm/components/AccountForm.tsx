import CardForm from "@/components/ui/CardForm/CardForm";
import { InputLabel } from "@/components/ui/InputLabel";
import SelectInput from "@/components/ui/SelectInput";
import { Control } from "react-hook-form";
import { RHFBridgeProps } from "../types/index.type";
import TableInput from "@/components/ui/TableInput";

type StepProps = RHFBridgeProps<any>;

const HEADER_DEPOSIT = [
  { label: 'DPST #', value: 'depositId' },
  { label: 'Date', value: 'date' },
  { label: 'Description', value: 'description' },
  { label: 'Amount', value: 'amount' },
  { label: 'Ref #', value: 'ref' },
  { label: 'Paid By', value: 'paidBy' },
]

const HEADER_MEMBERSHIP = [
  { label: 'ID', value: 'membershipId' },
  { label: 'MBR', value: 'member' },
  { label: 'Name', value: 'name' },
  { label: 'Valid Until', value: 'validUntil' },
  { label: 'STS', value: 'status' },
]

export const AccountForm = ({ form, errors }: StepProps) => {
  const { register, control } = form;
  return (
    <CardForm className="mt-6" title="Account">
      <section className="mb-8">
        <h4 className="mb-4 text-[#5b5b5b] text-lg">Payment</h4>
        <div className="grid grid-cols-2 gap-4">
          <SelectInput
            name="paidMethod"
            label="Paid By"
            control={control as Control<any>}
            placeholder="Select Paid Method"
            options={[
              { label: 'Chargeable', value: 'Chargeable' },
              { label: 'Rate Group 2', value: 'Rate Group 2' },
              { label: 'Rate Group 3', value: 'Rate Group 3' },
            ]}
          />
          <SelectInput
            name="cardType"
            label="Card Type"
            control={control as Control<any>}
            placeholder="Select Card Type"
            options={[
              { label: 'Chargeable', value: 'Chargeable' },
              { label: 'Rate Group 2', value: 'Rate Group 2' },
              { label: 'Rate Group 3', value: 'Rate Group 3' },
            ]}
          />
          <InputLabel
            label="Card"
            type="text"
            placeholder="000xxx"
            errors={errors}
            {...register('cardId')}
          />
          <div className="grid grid-cols-2 gap-4 items-end">
            <InputLabel
              label="Valid Until"
              type="text"
              placeholder="Month"
              errors={errors}
              {...register('validMonth')}
            />
            <InputLabel
              label=""
              type="text"
              placeholder="Year"
              errors={errors}
              {...register('validYear')}
            /> 
          </div>
          <InputLabel
            label="Pre-Auth. Amount"
            type="text"
            placeholder="999999"
            errors={errors}
            {...register('perAmount')}
          /> 
        </div>
      </section>
      <section>
        <TableInput
          headerTable={HEADER_DEPOSIT}
          data={[]}
          onCheck={() => {}}
          title="Deposit"
          values={[]}
        />
      </section>
      <section>
        <TableInput
          headerTable={HEADER_MEMBERSHIP}
          data={[]}
          onCheck={() => {}}
          title="Membership Holder"
          values={[]}
        />
      </section>
    </CardForm>
  );
};