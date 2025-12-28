import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format, set } from "date-fns";
import { ArrowLeft, Building, Calendar, DoorOpen, NotebookIcon, Save, User, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import TabsGroup, { TabsListType } from "@/components/ui/TabsGroup/TabsGroup";

import { useOverlay } from "@/hooks/useOverlay.hooks";

import { rateGroup } from "@/constants/data";
import { ReservationMode } from "@/types/hotel";

import { AccountForm, BasicVisitorForm, DetailForm, RoomRateForm, RsvpForm, TracesForm } from "./components";
import { GroupForm } from "./components/GroupInformation";

import { ReservationFormValues, ReservationSchema } from "@/libs/validation/reservation.schema";

const baseDate = new Date();
type TypeReservation = 'individual' | 'series' | 'group' | 'block';

const RATE_ROOM_GROUP_ERROR: (keyof ReservationFormValues)[] = [
  'inventorySource',
];

const RegistrationForm = () => {
  const [mode, setMode] = useState<ReservationMode>('individual');
  const [isWalkIn, setIsWalkIn] = useState(false);
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

    // void navigate('/reservation/list-reservation');
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
    { label: 'Room Rate', value: 'room_rate', Comp: RoomRateForm, errorGroup: RATE_ROOM_GROUP_ERROR },
    { label: 'RSVP Info', value: 'rsvp_info', Comp: RsvpForm, errorGroup: ['rate'] },
    { label: 'Detail', value: 'detail', Comp: DetailForm, errorGroup: ['rate'] },
    { label: 'Account', value: 'account', Comp: AccountForm, errorGroup: ['rate'] },
    { label: 'Traces', value: 'traces', Comp: TracesForm, errorGroup: ['rate']},
    // { label: 'Other & Statistics', value: 'other_statistics', Comp: OtherForm, errorGroup: ['rate'] },
  ], [type]);

  const tabsListSeries: TabsListType<ReservationFormValues>[] = useMemo(() => [
    { label: 'Room Rate', value: 'room_rate', Comp: RoomRateForm, errorGroup: RATE_ROOM_GROUP_ERROR },
    { label: 'RSVP Info', value: 'rsvp_info', Comp: RsvpForm, errorGroup: ['rate'] },
    { label: 'Account', value: 'account', Comp: AccountForm, errorGroup: ['rate'] },
  ], [type]);

  const tabsListGroup: TabsListType<ReservationFormValues>[] = useMemo(() => [
    { label: 'Room Rate', value: 'room_rate', Comp: RoomRateForm, errorGroup: RATE_ROOM_GROUP_ERROR },
    { label: 'RSVP Info', value: 'rsvp_info', Comp: RsvpForm, errorGroup: ['rate'] },
    { label: 'Account', value: 'account', Comp: AccountForm, errorGroup: ['rate'] },
    { label: 'Group Information', value: 'detail', Comp: GroupForm, errorGroup: ['rate'] },
    { label: 'Traces', value: 'traces', Comp: TracesForm, errorGroup: ['rate']},
    // { label: 'Other & Statistics', value: 'other_statistics', Comp: OtherForm, errorGroup: ['rate'] },
  ], [type]);

  const tabs = useMemo(() => ({
    'individual': tabsList,
    'tour-series': tabsListSeries,
    'group': tabsListGroup,
    'block': tabsListSeries
  }), [mode]);

  const modeConfig: Record<ReservationMode, { label: string; icon: React.ReactNode; description: string }> = {
    'individual': { label: 'Individual', icon: <User className="h-4 w-4" />, description: 'Single guest booking' },
    'block': { label: 'Block', icon: <Building className="h-4 w-4" />, description: 'Block of rooms' },
    'tour-series': { label: 'Tour Series', icon: <Calendar className="h-4 w-4" />, description: 'Series of tour bookings' },
    'group': { label: 'Group', icon: <Users className="h-4 w-4" />, description: 'Group reservation' },
  };

  return (
    <FormProvider {...methods}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/reservation')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">
              {isWalkIn ? "Walk-in Check-in" : "New Reservation"}
            </h1>
            <p className="text-muted-foreground">
              {isWalkIn ? "Quick check-in for walk-in guests" : "Create a new reservation"}
            </p>
          </div>
          <Badge variant={isWalkIn ? "default" : "secondary"}>
            {isWalkIn ? "Walk-in" : "Reservation"}
          </Badge>
        </div>
      </div>
      <section className="flex items-center gap-4 mb-4">
        <Card className="min-w-[300px]">
          <header className="flex items-center gap-2 mb-2">
            <NotebookIcon size={18} />
            <h2 className="font-semibold">Occupancy Status</h2>
          </header>
          <p className="font-bold text-2xl text-orange-400">29.2%</p>
        </Card>
        <Card className="min-w-[300px]">
          <header className="flex items-center gap-2 mb-2">
            <DoorOpen size={18} />
            <h2 className="font-semibold">Selling Status</h2>
          </header>
          <p className="font-bold text-2xl text-green-500">OPEN</p>
        </Card>
      </section>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-sm font-medium">Reservation Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-3">
                {(Object.keys(modeConfig) as ReservationMode[]).map((m) => (
                  <Button
                    type="button"
                    key={m}
                    variant={mode === m ? "default" : "outline"}
                    className="flex flex-col h-auto py-4 gap-2"
                    onClick={() => setMode(m)}
                  >
                    {modeConfig[m].icon}
                    <span className="font-medium">{modeConfig[m].label}</span>
                    <span className="text-xs opacity-70">{modeConfig[m].description}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <BasicVisitorForm form={methods} errors={formState.errors} setValue={setValue} />
          <TabsGroup tabsList={tabs[mode]} methods={methods} errors={formState.errors} setValue={setValue} />
        </div>
        <div className="flex justify-end mt-6">
          <Button type="submit" className="inline-flex items-center gap-2 p-6 rounded-lg !font-bold bg-primary text-white cursor-pointer active:scale-98 hover:scale-[1.005] disabled:bg-black/50 min-w-[150px] text-center">
            <Save  size={18}/> <span>{isWalkIn ? "Check-in" : "Save Reservation"}</span>
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default RegistrationForm;