import { Button } from "@/components/ui/Button";
import { addDays, format, set } from "date-fns";
import { FormProvider, useForm } from "react-hook-form";
import { AccountForm, BasicVisitorForm, DetailForm, OtherForm, RoomRateForm, RsvpForm, TracesForm } from "./components";
import { useMemo } from "react";
import { ReservationFormValues, ReservationSchema } from "@/libs/validation/reservation.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import TabsGroup, { TabsListType } from "@/components/ui/TabsGroup/TabsGroup";
import { GroupForm } from "./components/GroupInformation";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { rateGroup } from "@/constants/data";
import { useOverlay } from "@/hooks/useOverlay";
import { AUTO_RESERVATION } from "../constants";

const baseDate = new Date();
type TypeReservation = 'individual' | 'series' | 'group' | 'block';

const RegistrationForm = () => {
  const methods = useForm<ReservationFormValues>({
    resolver: zodResolver(ReservationSchema),
    defaultValues: {
      //basic form default values
      rsvpDate: '',
      arrival: format(baseDate, 'yyyy-MM-dd'),
      departure: format(addDays(baseDate, 1), 'yyyy-MM-dd'),
      nights: 1,
      rateSource: '',
      rateGroup: '',
      reservationMode: '',
      type: '',
      firstName: '',
      lastName: '',
      // room rate default values
      accommodation: [],
      inventorySource: '',
      reservationType: '',
      confirmation: '',
      confirmationBy: '',
      sellingType: '',
      noteDetail: '',
      rate: [],
      // rsvp info
      purposeOfVisit: '',
      sourceOfBusiness: '',
      segmentMarket: '',
      reservedBy: '',
      booker: '',
      bookingSource: '',
      phoneNumberRsvp: '',
      promo: '',
      email: '',
      ETA: set(baseDate, { hours: 9, minutes: 0, seconds: 0, milliseconds: 0 }),
      ETD: set(addDays(baseDate, 1), { hours: 17, minutes: 0, seconds: 0, milliseconds: 0 }),
      ETDby: '',
      ETAby: '',
      courtesyArrival: '',
      courtesyDeparture: '',
      billingInstruction: '',
      paymentInstruction: '',
      guestNote: '',
      //detail 
      titleName: '',
      salutation: '',
      homeAddress: '',
      country: '',
      city: '',
      nationality: '',
      language: '',
      phoneNumberDetail: '',
      altPhoneNumberDetail: '',
      emailDetail: '',
      guestIdType: '',
      guestId: '',
      guestType: '',
      specialDate: format(baseDate, 'yyyy-MM-dd'),
      specialDateNote: '',
      companyDetail: '',
      position: '',
      companyFax: '',
      companyAddress: '',
      companySite: '',
      //account
      paidMethod: '',
      cardType: '',
      cardId: '',
      validMonth: '',
      validYear: '',
      preAmount: '',
      approvalCode: '',
      arAccountInformation: '',
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
      idLeaderGroup: '',
      leaderNameGroup: '',
      groupNotes: '',
      roomNotesGroup: '',
      fnbNotesGroup: '',
      roomingListGroup: null
    },
    shouldUnregister: false
  });
  const navigate = useNavigate();
  const { activateNotif } = useOverlay();
  const params = new URLSearchParams(window.location.search);
  const type: TypeReservation = params.get('type') as TypeReservation;
  const { handleSubmit, setValue, formState, reset } = methods;

  if (!['individual', 'series', 'group', 'block'].includes(type)) {
    return (<Navigate to="/not-found" />)
  }

  const onSubmit = async (data: ReservationFormValues) => {
    const {
      rsvpDate,
      rsvpNo,
      arrival,
      departure,
      nights,
      rateSource,
      firstName,
      lastName,
      type,
      reservationMode,
      accommodation,
      rate,
      inventorySource,
      reservationType,
      sellingType,
      confirmationBy,
      notesDetail,
      booker,
      bookingSource,
      companyRsvp,
      phoneNumberRsvp,
      promo,
      email,
      ETD,
      ETDby,
      ETA,
      ETAby,
      purposeOfVisit,
      sourceOfBusiness,
      segmentMarket,
      courtesyArrival,
      courtesyDeparture,
      billingInstruction,
      paymentInstruction,
      guestNote,
      salutation,
      homeAddress,
      phoneNumberDetail,
      country,
      city,
      nationality,
      language,
      guestId,
      guestIdType,
      guestType,
      specialDate,
      specialDateNote,
      mobileDetail,
      faxDetail,
      emailDetail,
      companyDetail,
      position,
      companyPhoneDetail,
      companyFax,
      companySite,
      companyAddress,
      paidMethod,
      cardType,
      cardId,
      validMonth,
      validYear,
      preAmount,
      approvalCode,
      arAccountInformation
    } = data;
    
    const payload = {
      reservation: {
        rsvp_date: rsvpDate,
        rsvp_no: rsvpNo,
        arrival_date: arrival,
        departure_date: departure,
        night_count: nights,
        rate_source: rateSource,
        guest_name: `${firstName} ${lastName}`,
        rate_group: {
          type: reservationMode,
          agent_company: rateGroup,
          is_regular: type === 'regular',
          is_non_refundable: type === 'non_refundable'
        },
        reservation_mode: reservationMode,
        routing: "",
        room_and_rate: {
          accommodation,
          rate_details: rate
        },
        booking_info: {
          inventory_source: inventorySource,
          reservation_type: reservationType,
          selling_type: sellingType,
          confirmation_by: confirmationBy,
          room_request_notes: notesDetail
        }
      },
      rsvp_info: {
        booker,
        booking_source_voucher_no: "",
        company: companyRsvp,
        phone: phoneNumberRsvp,
        promo,
        email,
        eta: ETA,
        etd: ETD,
        purpose_of_visit: purposeOfVisit,
        source_of_business: sourceOfBusiness,
        segment_market: segmentMarket,
        notes: {
          courtesy_arrival: courtesyArrival,
          courtesy_departure: courtesyDeparture,
          billing_instruction: billingInstruction,
          payment_instruction: paymentInstruction,
          guest_note: guestNote
        }
      },
      guest_detail: {
        last_name: lastName,
        first_name: firstName,
        title: salutation,
        home_address: homeAddress,
        mailing_address: "address",
        country,
        city,
        nationality_language: language,
        phone: phoneNumberDetail,
        mobile: mobileDetail,
        fax: faxDetail,
        email: emailDetail,
        guest_id_type: guestIdType,
        guest_id_number: guestId,
        special_date: specialDate,
        guest_type: guestType,
        company_profile: {
          company: companyDetail,
          position: position,
          address: companyAddress,
          phone: companyPhoneDetail,
          fax: companyFax,
          website: companySite
        }
      },
      account: {
        paid_by: paidMethod,
        card_type: cardType,
        card_number: cardId,
        card_valid_until: `${validMonth}/${validYear}`,
        pre_auth_amount: preAmount,
        approval_code: approvalCode,
        ar_account_information: arAccountInformation,
        membership: {
          id: "",
          mbr_no: "",
          name: "",
          valid_until: "",
          status: ""
        },
        deposit: {
          total: 0,
          list: []
        }
      },
      traces: {
        reminders: [],
        inventory_requests: [],
        leisure_bookings: [],
        follow_up_status: {
          date: null,
          time: null,
          by: "",
          notes: ""
        }
      }
    };

    activateNotif({
      notifText: 'Reservasi berhasil dibuat!',
      notifType: 'success'
    });
    void navigate('/reservation/list-reservation');

    console.log(payload);

    // try {
    //   const response = await fetch('http://localhost:5175/reservations', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(payload),
    //   }).then(response => response.json());

    //   if (response) {
    //     activateNotif({
    //       notifText: 'Reservasi berhasil ditambahkan !',
    //       notifType: 'success'
    //     });
    //     void navigate('/reservation/list-reservation')
    //   }

    // } catch (error) {
    //   console.error('Add reservation error:', error);
    // }
  }

  const tabsList: TabsListType<ReservationFormValues>[] = useMemo(() => [
    { label: 'Room Rate', value: 'room_rate', Comp: RoomRateForm, errorGroup: ['rate'] },
    { label: 'RSVP Info', value: 'rsvp_info', Comp: RsvpForm, errorGroup: ['rate'] },
    { label: 'Detail', value: 'detail', Comp: DetailForm, errorGroup: ['rate'] },
    { label: 'Account', value: 'account', Comp: AccountForm, errorGroup: ['rate'] },
    { label: 'Traces', value: 'traces', Comp: TracesForm, errorGroup: ['rate']},
    // { label: 'Other & Statistics', value: 'other_statistics', Comp: OtherForm, errorGroup: ['rate'] },
  ], [type]);

  const tabsListSeries: TabsListType<ReservationFormValues>[] = useMemo(() => [
    { label: 'Room Rate', value: 'room_rate', Comp: RoomRateForm, errorGroup: ['rate'] },
    { label: 'RSVP Info', value: 'rsvp_info', Comp: RsvpForm, errorGroup: ['rate'] },
    { label: 'Account', value: 'account', Comp: AccountForm, errorGroup: ['rate'] },
  ], [type]);

    const tabsListGroup: TabsListType<ReservationFormValues>[] = useMemo(() => [
    { label: 'Room Rate', value: 'room_rate', Comp: RoomRateForm, errorGroup: ['rate'] },
    { label: 'RSVP Info', value: 'rsvp_info', Comp: RsvpForm, errorGroup: ['rate'] },
    { label: 'Account', value: 'account', Comp: AccountForm, errorGroup: ['rate'] },
    { label: 'Group Information', value: 'detail', Comp: GroupForm, errorGroup: ['rate'] },
    { label: 'Traces', value: 'traces', Comp: TracesForm, errorGroup: ['rate']},
    // { label: 'Other & Statistics', value: 'other_statistics', Comp: OtherForm, errorGroup: ['rate'] },
  ], [type]);

  const tabs = useMemo(() => ({
    individual: tabsList,
    series: tabsListSeries,
    group: tabsListGroup,
    block: tabsListSeries
  }), [type])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <BasicVisitorForm form={methods} errors={formState.errors} setValue={setValue} />
          <TabsGroup tabsList={tabs[type]} methods={methods} errors={formState.errors} setValue={setValue} />
        </div>
        <div className="flex justify-end mt-6">
          <Button type="submit" className="py-6 rounded-lg !font-bold bg-hotel-green text-white cursor-pointer active:scale-98 hover:scale-[1.005] disabled:bg-black/50 w-[150px] text-center">
            Submit
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default RegistrationForm;