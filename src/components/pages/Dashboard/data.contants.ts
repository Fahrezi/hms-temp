// === Raw data from your old dashboard ===
export const TOTAL_ROOMS = 344;

// Room status
export const VD = 148;
export const VC = 45;
export const VCI = 23;
export const OD = 118;
export const OC = 1;
export const OOO_TEMP = 0;
export const OOO_PERM = 0;
export const HU_TEMP = 5;
export const HU_PERM = 0;
export const HU_PRMO = 0;
export const COMP_GCOMP = 0;
export const COMP_FOC = 2;


// Top-line
export const FOC_OCHU = 90; // OC-HU & FOC
export const EST_OCC_PERCENT = 26.16; // %


// Room movement (Rooms)
export const Rooms = {
  lastNight: 159,
  departed: 41,
  arrived: 1,
  expectedArrivals: 16,
  expectedDepartures: 38,
  estWalkIn: 0,
  estOccRooms: 97,
};


// Guest movement (Pax)
export const Pax = {
  lastNight: 293,
  departed: 80,
  arrived: 2,
  expectedArrivals: 34,
  expectedDepartures: 75,
  estWalkIn: 0,
  estOccPax: 174,
};


// Derived
export const OCCUPIED_NOW = OC + OD; // current occupied by HK status snapshot
export const VACANT_CLEAN_READY = VC + VCI; // ready inventory
export const INTERNAL_OR_BLOCKED = HU_TEMP + HU_PERM + HU_PRMO + COMP_FOC + OOO_TEMP + OOO_PERM; // internal use / maintenance
export const classifiedSum = OCCUPIED_NOW + VACANT_CLEAN_READY + VD + INTERNAL_OR_BLOCKED;
export const OTHER = Math.max(TOTAL_ROOMS - classifiedSum, 0); // any residual to keep sums consistent


export const occupancyBreakdown = [
  { name: "Occupied (OC+OD)", value: OCCUPIED_NOW },
  { name: "Vacant Clean/Inspected (VC+VCI)", value: VACANT_CLEAN_READY },
  { name: "Vacant Dirty (VD)", value: VD },
  { name: "Internal / OOS (HU/COMP/OOO)", value: INTERNAL_OR_BLOCKED },
  { name: "Other/Unclassified", value: OTHER },
];


export const COLORS = ["#2563eb", "#22c55e", "#ef4444", "#f59e0b", "#64748b"]; // blue, green, red, amber, slate


export const flowData = [
  { label: "Arrivals", value: Rooms.arrived },
  { label: "Expected Arrivals", value: Rooms.expectedArrivals },
  { label: "Departures", value: Rooms.departed },
  { label: "Expected Departures", value: Rooms.expectedDepartures },
  { label: "Est. Walk-In", value: Rooms.estWalkIn },
];


export const roomsPaxTable = [
  {
    row: "Last Night",
    rooms: Rooms.lastNight,
    pax: Pax.lastNight,
  },
  {
    row: "Departed",
    rooms: Rooms.departed,
    pax: Pax.departed,
  },
  {
    row: "Arrived",
    rooms: Rooms.arrived,
    pax: Pax.arrived,
  },
  {
    row: "Expected Arrival",
    rooms: Rooms.expectedArrivals,
    pax: Pax.expectedArrivals,
  },
  {
    row: "Expected Departure",
    rooms: Rooms.expectedDepartures,
    pax: Pax.expectedDepartures,
  },
  {
    row: "Estimated Occupied (EoD)",
    rooms: Rooms.estOccRooms,
    pax: Pax.estOccPax,
  },
];

export const roomAvailability = [
  {
    "type_of_room": "Standard Room",
    "availability": [12, 10, 8, 7, 9, 11, 13]
  },
  {
    "type_of_room": "Deluxe Room",
    "availability": [8, 7, 6, 5, 6, 7, 8]
  },
  {
    "type_of_room": "Suite Room",
    "availability": [3, 3, 2, 2, 2, 3, 3]
  },
  {
    "type_of_room": "Family Room",
    "availability": [5, 5, 4, 4, 5, 5, 6]
  },
  {
    "type_of_room": "Executive Room",
    "availability": [4, 4, 3, 3, 4, 4, 5]
  },
  {
    "type_of_room": "Presidential Suite",
    "availability": [1, 1, 1, 0, 1, 1, 1]
  }
];

export const optionsAvailability = [
  { label: 'GTD/Confirmed', value: 'confirmed' },
  { label: 'Include Tentative', value: 'tentative' },
  { label: 'Include Waiting List', value: 'waiting_list' },
];

export const statusOptionList = {
  traces: {
    label: "Traces",
    data: [
      { "label": "Message", "value": "message" },
      { "label": "Complaint", "value": "complaint" },
      { "label": "Location", "value": "location" },
      { "label": "Wake Up Call", "value": "wake_up_call" },
      { "label": "Reminder", "value": "reminder" },
      { "label": "Inventory Request", "value": "inventory_request" },
      { "label": "Leisure Booking", "value": "leisure_booking" }
    ]
  },
  lostAndFound: {
    label: 'Lost & Found',
    data: [
      { "label": "Lost & Fund", "value": "lost_and_found" },
    ]
  },
  room: {
    label: 'Room',
    data:[
      { "label": "Queue", "value": "room_queue" },
    ]
  },
  specialDate: {
    label: 'Special Date',
    data: [
      { "label": "New Year’s Day", "value": "2025-01-01" },
      { "label": "Valentine’s Day", "value": "2025-02-14" },
      { "label": "Easter Sunday", "value": "2025-04-20" },
      { "label": "Labor Day", "value": "2025-05-01" },
      { "label": "Independence Day", "value": "2025-07-04" },
      { "label": "Halloween", "value": "2025-10-31" },
      { "label": "Christmas Eve", "value": "2025-12-24" },
      { "label": "Christmas Day", "value": "2025-12-25" },
      { "label": "New Year’s Eve", "value": "2025-12-31" }
    ]
  },
  guestType: {
    label: 'Guest Type',
    data: [
      { "label": "Reguler", "value": "guest_reguler" },
      { "label": "VIP", "value": "guest_vip" },
    ]
  },
  guestEntitlement: {
    label: 'Guest Entitlement',
    data: [
      { "label": "VIP Status Accorded", "value": "vip_status_accorded" },
      { "label": "Standard Cake", "value": "standard_cake" },
      { "label": "Free 1 Time Kayak 30 Min", "value": "free_1_time_kayak_30_min" },
      { "label": "Suite / IMV Benefit", "value": "suite_imv_benefit" },
      { "label": "Standard Fruit Basket", "value": "standard_fruit_basket" },
      { "label": "Private Transfer Upon", "value": "private_transfer_upon" },
      { "label": "Free 2Soft Drink vcr the", "value": "free_2soft_drink_vcr_the" }
    ]
  },
  guestHighlight: {
    label: 'Guest Highlight',
    data: []
  },
  group: {
    label: 'Group',
    data: []
  },
  promotion: {
    label: 'Promotion',
    data: []
  },
  miceVenue: {
    label: 'M.I.C.E Venue',
    data: [
      { "label": "Ballroom", "value": "ballroom" },
      { "label": "Grand Ballroom", "value": "grand_ballroom" },
    ]
  },
  miceFunction: {
    label: 'M.I.C.E Function',
    data: []
  },
  forex: {
    label: 'Forex',
    data: [
      { "label": "IDR", "value": "10000" },
      { "label": "SGD", "value": "100" },
    ]
  }
}
