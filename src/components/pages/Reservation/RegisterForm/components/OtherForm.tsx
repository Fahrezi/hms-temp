import CardForm from "@/components/ui/CardForm/CardForm";
import { RHFBridgeProps } from "../types/index.type";

type StepProps = RHFBridgeProps<any>;

export const OtherForm = ({ form }: StepProps) => {
  const methods = form;
  return (
    <CardForm className="mt-6" title="Other & Statistics">
      <h4 className="mb-6 text-[#5b5b5b] text-xl">Reminder</h4>
      <h4 className="mb-6 text-[#5b5b5b] text-xl">Inventory Request</h4>
      <h4 className="mb-6 text-[#5b5b5b] text-xl">Leisure Booking</h4>
    </CardForm>
  );
};