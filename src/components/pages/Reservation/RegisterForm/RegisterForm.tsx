import { Button } from "@/components/ui/Button";
import { addDays, format } from "date-fns";
import { FormProvider, useForm } from "react-hook-form";
import { AccountForm, BasicVisitorForm, OtherForm, GuestInfoForm, TracesForm } from "./components";
import { useMemo } from "react";
import TabsGroup, { TabsListType } from "@/components/ui/TabsGroup/TabsGroup";
import { GuestRegistrationFormValues, GuestRegistrationSchema } from "@/libs/validation/registration.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const baseDate = new Date();

const RegistrationForm = () => {
  const methods = useForm<GuestRegistrationFormValues>({
    resolver: zodResolver(GuestRegistrationSchema),
    defaultValues: {
      //basic form default values
      rsvpDate: '',
      arrival: format(baseDate, 'yyyy-MM-dd'),
      departure: format(addDays(baseDate, 1), 'yyyy-MM-dd'),
      nights: 1,
      rateSource: 0,
      rateGroup: '',
      guestList: [],
      // Guest Info & Contact
      guestType: '',
      guestId: '',
      idNumberGuest: '',
      expiryDate: '',
      lastName: '',
      firstName: '',
      country: '',
      postalCode: '',
      dateOfBirth: '',
      titleGuest: '',
      homeAddress: '',
      nationality: '',
      city: '',
      contactNumber: '',
      emailAddress: '',
      occupation: '',
      placeOfEmployment: '',
      arrivedFrom: '',
      nextDestination: '',
      carrier: '',
      billingInstruction: '',
      //account
      paidBy: '',
      cardType: '',
      cardNumber: '',
      cardYearValid: '',
      cardMonthValid: '',
      preAuthAmount: 0,
      approvalCode: '',
      approvalCodeValid: '',
      deposit: [],
      membershipHolder: '',
      //traces
      message: [],
      complaint: [],
      locator: [],
      wakeUpCall: [],
      reminder: [],
      inventoryRequest: [],
      leisureBooking: [],
      lostAndFound: [],
      reqToHk: []
    },
    shouldUnregister: false
  });

  const { handleSubmit, setValue, formState } = methods;

  const onSubmit = (data: any) => {
    console.log(data);
  }

  const tabsList: TabsListType<GuestRegistrationFormValues>[] = useMemo(() => [
    { label: 'Guest Info & Contact', value: 'guest_info_and_contact', Comp: GuestInfoForm, errorGroup: ['rsvpDate'] },
    { label: 'Account', value: 'account', Comp: AccountForm, errorGroup: ['rsvpDate'] },
    { label: 'Traces', value: 'traces', Comp: TracesForm, errorGroup: ['rsvpDate'] },
    { label: 'Other & Statistics', value: 'other_statistics', Comp: OtherForm, errorGroup: ['rsvpDate'] },
    { label: 'Logs', value: 'logs', Comp: OtherForm, errorGroup: ['rsvpDate'] },
  ], [])

  return (
    <FormProvider {...methods}>
      <h1 className="text-2xl font-semibold mb-4">Registration</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <BasicVisitorForm form={methods} errors={formState.errors} setValue={setValue} />
          <TabsGroup tabsList={tabsList} methods={methods} errors={formState.errors} setValue={setValue} />
        </div>
        <div className="flex justify-end mt-6">
          <Button type="submit" className="py-6 rounded-lg font-semibold bg-black text-white cursor-pointer hover:scale-98 disabled:bg-black/50 w-[150px] text-center">
            Submit
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default RegistrationForm;