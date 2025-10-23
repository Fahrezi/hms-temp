import { Button } from "@/components/ui/Button";
import { addDays, format, set } from "date-fns";
import { FormProvider, useForm } from "react-hook-form";
import { AccountForm, BasicVisitorForm, DetailForm, OtherForm, RoomRateForm, RsvpForm, TracesForm } from "./components";
import { useMemo } from "react";
import { ReservationFormValues, ReservationSchema } from "@/libs/validation/reservation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import TabsGroup, { TabsListType } from "@/components/ui/TabsGroup/TabsGroup";

const baseDate = new Date();

const RegistrationForm = () => {
  const methods = useForm<ReservationFormValues>({
    resolver: zodResolver(ReservationSchema),
    defaultValues: {
      //basic form default values
      rsvpDate: '',
      arrival: format(baseDate, 'yyyy-MM-dd'),
      departure: format(addDays(baseDate, 1), 'yyyy-MM-dd'),
      nights: 1,
      rateSource: 0,
      rateGroup: '',
      reservationMode: '',
      type: '',
      firstName: '',
      lastName: '',
      // room rate default values
      accommodation: [],
      inventorySource: '',
      reservationType: '',
      confirmationDate: '',
      confirmationByName: '',
      sellingType: '',
      noteDetail: '',
      rate: null,
      // rsvp info
      purposeOfVisit: '',
      sourceOfBusiness: '',
      segmentMarket: '',
      reservedBy: '',
      booker: '',
      bookingSource: '',
      company: '',
      phoneNumberRsvp: '',
      promo: '',
      email: '',
      ETA: set(baseDate, { hours: 9, minutes: 0, seconds: 0, milliseconds: 0 }),
      ETD: set(addDays(baseDate, 1), { hours: 17, minutes: 0, seconds: 0, milliseconds: 0 }),
      ETDby: '',
      ETAby: '',
      courtesyOrderArr: '',
      courtesyOrderDep: '',
      billInstruction: '',
      paymentInstruction: '',
      guestNote: '',
      //detail 
      titleName: '',
      salutation: '',
      addressSource: '',
      country: '',
      nationality: '',
      phoneNumberDetail: '',
      altPhoneNumberDetail: '',
      emailDetail: '',
      guestIdType: '',
      guestId: '',
      guestType: '',
      specialDate: format(baseDate, 'yyyy-MM-dd'),
      specialDateNote: '',
      companyProfile: '',
      position: '',
      companyAddress: '',
      companyPhone: '',
      companySite: '',
      //account
      paymentPaidBy: '',
      paymentCardType: '',
      paymentCardNumber: '',
      paymentCardValidMonth: '',
      paymentCardValidYear: '',
      paymentPreAuthAmount: '',
      paymentApprovalCode: '',
      paymentApprovalCodeValid: '',
      deposit: {
        id: '',
        date: '',
        description: '',
        amount: 0
      },
      member: {
        id: '',
        memberId: '',
        name: '',
        validUntil: '',
        sts: ''
      },
      //traces
      leisureBooking: [
        {
          takenDate: format(baseDate, 'yyyy-MM-dd HH:mm'),
          leisureGroup: '',
          lastName: '',
          firstName: '',
          bookingForDatetime: '',          
          time: format(baseDate, 'yyyy-MM-dd'),
          qty: 0,
          ref: '',
          notes: '',
          followUpDatetime: format(baseDate, 'yyyy-MM-dd HH:mm'),
          followUpBy: '',
          followUpId: '',
          followUpNotes: '',
        }
      ],
      reminder: [
        {
          takenDatetime: format(baseDate, 'yyyy-MM-dd HH:mm'),
          subject: '',
          remindOnDatetime: format(baseDate, 'yyyy-MM-dd HH:mm'),
          message: '',
          followUpDatetime: format(baseDate, 'yyyy-MM-dd HH:mm'),
          followUpBy: '',
          followUpId: '',
          followUpNotes: '',
        }
      ],
      inventoryReq: [
        {
          takenDatetime: format(baseDate, 'yyyy-MM-dd HH:mm'),
          inventoryGroup: '',
          inventoryItem: '',
          onHand: '',
          borrowed: '',
          borrowedBalance: '',
          ref: '',
          notes: '',
          followUpDatetime: format(baseDate, 'yyyy-MM-dd HH:mm'),
          followUpBy: '',
          followUpId: '',
          followUpNotes: '',
        }
      ],  
    },
    shouldUnregister: false
  });

  const { handleSubmit, setValue, formState } = methods;

  const onSubmit = (data: any) => {
    console.log(data);
  }

  const tabsList: TabsListType<ReservationFormValues>[] = useMemo(() => [
    { label: 'Room Rate', value: 'room_rate', Comp: RoomRateForm, errorGroup: ['rate'] },
    { label: 'RSVP Info', value: 'rsvp_info', Comp: RsvpForm, errorGroup: ['rate'] },
    { label: 'Detail', value: 'detail', Comp: DetailForm, errorGroup: ['rate'] },
    { label: 'Account', value: 'account', Comp: AccountForm, errorGroup: ['rate'] },
    { label: 'Traces', value: 'traces', Comp: TracesForm, errorGroup: ['rate']},
    { label: 'Other & Statistics', value: 'other_statistics', Comp: OtherForm, errorGroup: ['rate'] },
  ], []);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <BasicVisitorForm form={methods} errors={formState.errors} setValue={setValue} />
          <TabsGroup tabsList={tabsList} methods={methods} errors={formState.errors} setValue={setValue} />
        </div>
        <div className="flex justify-end mt-6">
          <Button type="submit" className="py-6 rounded-lg !font-bold bg-hotel-green text-white cursor-pointer hover:scale-98 disabled:bg-black/50 w-[150px] text-center">
            Submit
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default RegistrationForm;