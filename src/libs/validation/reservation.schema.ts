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
  rsvpDate: z.string().optional().or(z.literal("")),
  arrival: ymd,
  departure: ymd,
  nights: z.number().int().min(0),
  rateSource: z.number().int(),
  rateGroup: z.string().optional().or(z.literal("")),
  reservationMode: z.string().optional().or(z.literal("")),
  type: z.string().optional().or(z.literal("")),
  firstName: z.string().optional().or(z.literal("")),
  lastName: z.string().optional().or(z.literal("")),
  // room rate default values
  accommodation: z.array(z.unknown()),
  inventorySource: z.string().optional().or(z.literal("")),
  reservationType: z.string().optional().or(z.literal("")),
  confirmationDate: z.string().optional().or(z.literal("")),
  confirmationByName: z.string().optional().or(z.literal("")),
  sellingType: z.string().optional().or(z.literal("")),
  noteDetail: z.string().optional().or(z.literal("")),
  rate: z.number().nonnegative().nullable(),
  // rsvp info
  purposeOfVisit: z.string().optional().or(z.literal("")),
  sourceOfBusiness: z.string().optional().or(z.literal("")),
  segmentMarket: z.string().optional().or(z.literal("")),
  reservedBy: z.string().optional().or(z.literal("")),
  booker: z.string().optional().or(z.literal("")),
  bookingSource: z.string().optional().or(z.literal("")),
  company: z.string().optional().or(z.literal("")),
  phoneNumberRsvp: z.string().optional().or(z.literal("")),
  promo: z.string().optional().or(z.literal("")),
  email: z.string().email().optional().or(z.literal("")),
  ETA: dateOrIso,
  ETD: dateOrIso,
  ETDby: z.string().optional().or(z.literal("")),
  ETAby: z.string().optional().or(z.literal("")),
  courtesyOrderArr: z.string().optional().or(z.literal("")),
  courtesyOrderDep: z.string().optional().or(z.literal("")),
  billInstruction: z.string().optional().or(z.literal("")),
  paymentInstruction: z.string().optional().or(z.literal("")),
  guestNote: z.string().optional().or(z.literal("")),
  // detail
  titleName: z.string().optional().or(z.literal("")),
  salutation: z.string().optional().or(z.literal("")),
  addressSource: z.string().optional().or(z.literal("")),
  country: z.string().optional().or(z.literal("")),
  nationality: z.string().optional().or(z.literal("")),
  phoneNumberDetail: z.string().optional().or(z.literal("")),
  altPhoneNumberDetail: z.string().optional().or(z.literal("")),
  emailDetail: z.string().email().optional().or(z.literal("")),
  guestIdType: z.string().optional().or(z.literal("")),
  guestId: z.string().optional().or(z.literal("")),
  guestType: z.string().optional().or(z.literal("")),
  specialDate: ymd,
  specialDateNote: z.string().optional().or(z.literal("")),
  companyProfile: z.string().optional().or(z.literal("")),
  position: z.string().optional().or(z.literal("")),
  companyAddress: z.string().optional().or(z.literal("")),
  companyPhone: z.string().optional().or(z.literal("")),
  companySite: z.string().optional().or(z.literal("")),
  // account
  paymentPaidBy: z.string().optional().or(z.literal("")),
  paymentCardType: z.string().optional().or(z.literal("")),
  paymentCardNumber: z.string().optional().or(z.literal("")),
  paymentCardValidMonth: z.string().optional().or(z.literal("")),
  paymentCardValidYear: z.string().optional().or(z.literal("")),
  paymentPreAuthAmount: z.string().optional().or(z.literal("")),
  paymentApprovalCode: z.string().optional().or(z.literal("")),
  paymentApprovalCodeValid: z.string().optional().or(z.literal("")),
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
});

export type ReservationFormValues = z.infer<typeof ReservationSchema>;
