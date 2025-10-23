import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/Dialog/Dialog";
import { InputLabel } from "@/components/ui/InputLabel";
import SelectInput from "@/components/ui/SelectInput";
import { Textarea } from "@/components/ui/TextArea";
import { useHeaderNav } from "@/hooks/useHeaderNav";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { Control, useForm } from "react-hook-form";

type FormModalProps = {
  type: 'add' | 'edit';
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormModal = (props: FormModalProps) => {
  const { type='add', openModal, setOpenModal } = props;
  const { changeTitle } = useHeaderNav(); 
  const { handleSubmit, register, formState, control } = useForm({
    defaultValues: {
      entryDate: format(new Date(), 'yyyy-MM-dd'),
      ref: '',
      description: '',
      for: '',
      amount: '',
      foreignAmount: '',
      currency: '',
      exchangeRate: '',
      paidBy: '',
      cardType: '',
      notes: ''
    }
  });

  const { errors } = formState;
  const title = useMemo(() => type === 'add' ? 'Add New Deposit' : 'Edit Deposit', []);
  const onSubmit = (data: any) => {
    console.log(data);
  }
  
  useEffect(() => {
    changeTitle(title);
  }, [changeTitle, title]);

  return (
    <form action="" onSubmit={handleSubmit(onSubmit)}>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="font-semibold bg-hotel-green hover:bg-hotel-green-hover text-hotel-mint-mist rounded-lg py-2 px-12 cursor-pointer shadow hover:scale-[1.009] active:scale-98"
            onClick={() => setOpenModal(true)}
          >
            Add New Deposit
          </Button>
        </DialogTrigger>
        <DialogContent showCloseButton className="bg-white border border-gray-100 min-w-[60vw]">
          <h1 className="text-xl font-semibold">{title}</h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 flex justify-end">
              <p className="flex items-center py-2 px-4 border border-[#DADADA] rounded-lg text-[#5b5b5b] bg-[#f5f5f5] text-sm h-12">#RSAP099999</p>
            </div>
            <InputLabel
              label="Entry Date"
              type="date"
              placeholder="Enter Entry Date"
              errors={errors}
              {...register('entryDate')}
            />
            <InputLabel
              label="Ref"
              placeholder="Enter Ref"
              errors={errors}
              {...register('ref')}
            />
            <Textarea
              label="Description"
              placeholder="Enter Description"
              errors={errors}
              {...register('description')}
            />
            <InputLabel
              label="Deposit For"
              placeholder="Enter Deposit For"
              errors={errors}
              {...register('for')}
            />
            <SelectInput
              name="currency"
              label="Currency"
              control={control as Control<any>}
              placeholder="Select Rate Source"
              options={[
                { label: 'Rate Group 1', value: 'Rate Group 1' },
                { label: 'Rate Group 2', value: 'Rate Group 2' },
                { label: 'Rate Group 3', value: 'Rate Group 3' },
              ]}
            />
            <InputLabel
              label="Exchange Rate"
              placeholder="0"
              name="exchangeRate"
              disabled
            />
            <InputLabel
              label="Amount"
              placeholder="0"
              errors={errors}
              {...register('amount')}
            />
            <InputLabel
              label="Foreign Currency"
              placeholder="0"
              errors={errors}
              {...register('foreignAmount')}
            />
            <SelectInput
              name="paidBy"
              label="Paid By"
              control={control as Control<any>}
              placeholder="Select Paid By"
              options={[
                { label: 'Cash', value: 'cash' },
                { label: 'Card', value: 'card' },
              ]}
            />
            <SelectInput
              name="cardType"
              label="Card Type"
              control={control as Control<any>}
              placeholder="Select Paid By"
              options={[
                { label: 'Cash', value: 'cash' },
                { label: 'Card', value: 'card' },
              ]}
            />
            <Textarea
              label="Notes"
              placeholder="Enter Notes"
              errors={errors}
              {...register('notes')}
            />
          </div>
          <DialogFooter className="mt-2">
            <Button type="button" variant="secondary" className="border-hotel-green text-hotel-green" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="default" className="bg-hotel-green font-bold text-white">Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  )
}

export default FormModal