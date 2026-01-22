import { z } from "zod";

const ymd = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use format yyyy-MM-dd");

const ymdhm = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/, "Use format yyyy-MM-dd HH:mm");

// Accept either a Date or an ISO-ish datetime string
const dateOrIso = z.union([z.date(), z.string().datetime()]);

export const ReservationSchema = z.object({
  rsvpDate: z.string().or(z.literal("")),
  rsvpNo: z.string().optional().or(z.literal("")),
  arrival: ymd,
  departure: ymd,
  nights: z.number().int().min(0),
  rateSource: z.string().optional().or(z.literal("")),
  rateGroup: z.string().optional().or(z.literal("")),
  reservationMode: z.string().optional().or(z.literal("")),
  type: z.string().optional().or(z.literal("")),
  firstName: z.string().optional().or(z.literal("")),
  lastName: z.string().optional().or(z.literal("")),
  // guest selection fields
  selectedGuestId: z.string().optional().or(z.literal("")),
  isNewGuest: z.boolean().optional().default(false),
  // room rate default values
  accommodation: z.array(z.unknown()),
  inventorySource: z.string().min(1),
  reservationType: z.string().min(1),
  confirmation: z.string().min(1),
  confirmationBy: z.string().min(1),
  sellingType: z.string().min(1),
  noteDetail: z.string().optional(),
  rate: z.array(z.unknown()),
  // rsvp info
  purposeOfVisit: z.string().optional().or(z.literal("")),
  sourceOfBusiness: z.string().optional().or(z.literal("")),
  segmentMarket: z.string().optional().or(z.literal("")),
  reservedBy: z.string().optional().or(z.literal("")),
  booker: z.string().optional().or(z.literal("")),
  bookingSource: z.string().optional().or(z.literal("")),
  companyRsvp: z.string().optional().or(z.literal("")),
  phoneNumberRsvp: z.string().optional().or(z.literal("")),
  promo: z.string().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  ETA: dateOrIso,
  ETD: dateOrIso,
  ETDby: z.string().optional().or(z.literal("")),
  ETAby: z.string().optional().or(z.literal("")),
  courtesyArrival: z.string().optional().or(z.literal("")),
  courtesyDeparture: z.string().optional().or(z.literal("")),
  billingInstruction: z.string().optional().or(z.literal("")),
  paymentInstruction: z.string().optional().or(z.literal("")),
  guestNote: z.string().optional().or(z.literal("")),
  // detail
  titleName: z.string().optional().or(z.literal("")),
  salutation: z.string().optional().or(z.literal("")),
  homeAddress: z.string().optional().or(z.literal("")),
  country: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
  nationality: z.string().optional().or(z.literal("")),
  language: z.string().optional().or(z.literal("")),
  phoneNumberDetail: z.string().optional().or(z.literal("")),
  altPhoneNumberDetail: z.string().optional().or(z.literal("")),
  emailDetail: z.string().email().optional().or(z.literal("")),
  mobileDetail: z.string().email().optional().or(z.literal("")),
  faxDetail: z.string().email().optional().or(z.literal("")),
  guestIdType: z.string().optional().or(z.literal("")),
  guestId: z.string().optional().or(z.literal("")),
  guestType: z.string().optional().or(z.literal("")),
  specialDate: ymd,
  specialDateNote: z.string().optional().or(z.literal("")),
  companyDetail: z.string().optional().or(z.literal("")),
  position: z.string().optional().or(z.literal("")),
  companyAddress: z.string().optional().or(z.literal("")),
  companyPhoneDetail: z.string().optional().or(z.literal("")),
  companyFax: z.string().optional().or(z.literal("")),
  companySite: z.string().optional().or(z.literal("")),
  // account
  paidMethod: z.string().optional().or(z.literal("")),
  cardType: z.string().optional().or(z.literal("")),
  cardId: z.string().optional().or(z.literal("")),
  validMonth: z.string().optional().or(z.literal("")),
  validYear: z.string().optional().or(z.literal("")),
  preAmount: z.string().optional().or(z.literal("")),
  approvalCode: z.string().optional().or(z.literal("")),
  arAccountInformation: z.string().optional().or(z.literal("")),
  // deposit fields
  selectedDepositId: z.string().optional().or(z.literal("")),
  depositAmount: z.number().optional().default(0),
  depositPaymentMethod: z.string().optional().or(z.literal("")),
  depositReceiptNumber: z.string().optional().or(z.literal("")),
  depositIsNonRefundable: z.boolean().optional().default(false),
  // card details
  cardholderName: z.string().optional().or(z.literal("")),
  cardNumber: z.string().optional().or(z.literal("")),
  expiryMonth: z.string().optional().or(z.literal("")),
  expiryYear: z.string().optional().or(z.literal("")),
  cvv: z.string().optional().or(z.literal("")),
  // company information
  selectedCompanyId: z.string().optional().or(z.literal("")),
  companyName: z.string().optional().or(z.literal("")),
  corporateAccountId: z.string().optional().or(z.literal("")),
  companyEmail: z.string().optional().or(z.literal("")),
  companyPhone: z.string().optional().or(z.literal("")),
  taxId: z.string().optional().or(z.literal("")),
  billingContact: z.string().optional().or(z.literal("")),
  // membership
  membershipProgramName: z.string().optional().or(z.literal("")),
  membershipNumber: z.string().optional().or(z.literal("")),
  membershipTier: z.string().optional().or(z.literal("")),
  membershipPointsBalance: z.number().optional().default(0),
  // account notes
  accountNotes: z.string().optional().or(z.literal("")),
  deposit: z.object({
    id: z.string().optional().or(z.literal("")),
    date: z.string().optional().or(z.literal("")),
    description: z.string().optional().or(z.literal("")),
    amount: z.number(),
  }),
  member: z.object({
    id: z.string().optional().or(z.literal("")),
    memberId: z.string().optional().or(z.literal("")),
    name: z.string().optional().or(z.literal("")),
    validUntil: z.string().optional().or(z.literal("")),
    sts: z.string().optional().or(z.literal("")),
  }),
  // traces
  leisureBooking: z.array(
    z.object({
      takenDate: ymdhm,
      leisureGroup: z.string().optional().or(z.literal("")),
      lastName: z.string().optional().or(z.literal("")),
      firstName: z.string().optional().or(z.literal("")),
      bookingForDatetime: z.string().optional().or(z.literal("")),
      time: ymd,
      qty: z.number().int().min(0),
      ref: z.string().optional().or(z.literal("")),
      notes: z.string().optional().or(z.literal("")),
      followUpDatetime: ymdhm,
      followUpBy: z.string().optional().or(z.literal("")),
      followUpId: z.string().optional().or(z.literal("")),
      followUpNotes: z.string().optional().or(z.literal("")),
    })
  ),
  reminder: z.array(
    z.object({
      takenDatetime: ymdhm,
      subject: z.string().optional().or(z.literal("")),
      remindOnDatetime: ymdhm,
      message: z.string().optional().or(z.literal("")),
      followUpDatetime: ymdhm,
      followUpBy: z.string().optional().or(z.literal("")),
      followUpId: z.string().optional().or(z.literal("")),
      followUpNotes: z.string().optional().or(z.literal("")),
    })
  ),
  inventoryReq: z.array(
    z.object({
      takenDatetime: ymdhm,
      inventoryGroup: z.string().optional().or(z.literal("")),
      inventoryItem: z.string().optional().or(z.literal("")),
      onHand: z.string().optional().or(z.literal("")),
      borrowed: z.string().optional().or(z.literal("")),
      borrowedBalance: z.string().optional().or(z.literal("")),
      ref: z.string().optional().or(z.literal("")),
      notes: z.string().optional().or(z.literal("")),
      followUpDatetime: ymdhm,
      followUpBy: z.string().optional().or(z.literal("")),
      followUpId: z.string().optional().or(z.literal("")),
      followUpNotes: z.string().optional().or(z.literal("")),
    })
  ),
  idLeaderGroup: z.string().optional().nullable().default(''),
  leaderNameGroup: z.string().optional().nullable().default(''),
  groupNotes: z.string().optional().nullable().default(''),
  roomNotesGroup: z.string().optional().nullable().default(''),
  fnbNotesGroup: z.string().optional().nullable().default(''),
  roomingListGroup: z.any().nullable().default(null),
  notesDetail: z.string().optional().nullable().default(''),
});

export type ReservationFormValues = z.infer<typeof ReservationSchema>;
