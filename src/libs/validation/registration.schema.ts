import { z } from "zod";

const ymd = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use format yyyy-MM-dd");

const emptyable = z.string().optional().or(z.literal(""));

export const GuestRegistrationSchema = z.object({
  // basic
  rsvpDate: emptyable,
  arrival: ymd,
  departure: ymd,
  nights: z.number().int().min(0),
  rateSource: z.number().int(),
  rateGroup: emptyable,

  guestList: z.array(z.unknown()),

  // Guest Info & Contact
  guestType: emptyable,
  guestId: emptyable,
  idNumberGuest: emptyable,
  expiryDate: emptyable,          // set to ymd if you enforce date: ymd
  lastName: emptyable,
  firstName: emptyable,
  country: emptyable,
  postalCode: emptyable,
  dateOfBirth: emptyable,         // set to ymd if you enforce date: ymd
  titleGuest: emptyable,
  homeAddress: emptyable,
  nationality: emptyable,
  city: emptyable,
  contactNumber: emptyable,
  emailAddress: emptyable,        // make it z.string().email().optional().or(z.literal("")) if needed
  occupation: emptyable,
  placeOfEmployment: emptyable,
  arrivedFrom: emptyable,
  nextDestination: emptyable,
  carrier: emptyable,
  billingInstruction: emptyable,

  // account
  paidBy: emptyable,
  cardType: emptyable,
  cardNumber: emptyable,
  cardYearValid: emptyable,
  cardMonthValid: emptyable,
  preAuthAmount: z.number().nonnegative(),
  approvalCode: emptyable,
  approvalCodeValid: emptyable,
  deposit: z.array(z.unknown()),
  membershipHolder: emptyable,

  // traces (arrays, item shapes unspecified)
  message: z.array(z.unknown()),
  complaint: z.array(z.unknown()),
  locator: z.array(z.unknown()),
  wakeUpCall: z.array(z.unknown()),
  reminder: z.array(z.unknown()),
  inventoryRequest: z.array(z.unknown()),
  leisureBooking: z.array(z.unknown()),
  lostAndFound: z.array(z.unknown()),
  reqToHk: z.array(z.unknown()),
});

export type GuestRegistrationFormValues = z.infer<typeof GuestRegistrationSchema>;
