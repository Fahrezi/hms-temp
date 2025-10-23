import { Link } from 'react-router-dom';

import Card from '@/components/ui/Card/Card';
import { Blocks, Moon, PlaneLanding, PlaneTakeoff, Repeat, Search, User, Users } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Popover, PopoverTrigger } from '@/components/ui/Popover';
import { PopoverContent } from '@radix-ui/react-popover';
import { LineChart } from '@/components/ui/Chart';
import { Button } from '@/components/ui/Button';

const CARD_DATA = [
  {
    type: 'room',
    body: 'Room',
    status: [
      { status_type: 'last_night', value: 120, body: 'Last Night' },
      { status_type: 'departure', value: 120, body: 'Departure' },
      { status_type: 'arrived', value: 120, body: 'Arrived' },
    ]
  },
  {
    type: 'pax',
    body: 'Pax',
    status: [
      { status_type: 'last_night', value: 120, body: 'Last Night' },
      { status_type: 'departure', value: 120, body: 'Departure' },
      { status_type: 'arrived', value: 120, body: 'Arrived' },
    ]
  },
  {
    type: 'room_status',
    body: 'Room Status',
    status: [
      { status_type: 'last_night', value: 120, body: 'Last Night' },
      { status_type: 'departure', value: 120, body: 'Departure' },
      { status_type: 'arrived', value: 120, body: 'Arrived' },
    ]
  },
];

const ICON_FOOTER = [
  { type: 'last_night', icon: <Moon size={16} /> },
  { type: 'departure', icon: <PlaneTakeoff size={16} /> },
  { type: 'arrived', icon: <PlaneLanding size={16} /> },
];

const INVOICE = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

const Dashboard = () => {
  return (
    <div className='flex gap-8'>
      <div className="grow">
        <div className="flex justify-end gap-4 mb-8">
          <Popover>
            <PopoverTrigger>
              <Button className="font-semibold bg-hotel-green hover:bg-hotel-green-hover text-hotel-mint-mist rounded-lg py-2 px-12 cursor-pointer shadow hover:scale-[1.009] active:scale-98">
                New Reservation
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 bg-white border-gray-100 rounded-xl shadow py-4 px-2">
              <div className="space-y-2 flex flex-col">
                <Button asChild variant="ghost">
                  <Link className="p-2 rounded-xl hover:shadow hover:ring hover:ring-green-700 bg-white h-auto justify-start items-start gap-2" to="/reservation/list-reservation/new-reservation?type=individual">
                    <User className="mt-1" size={24} />
                    <div className="flex flex-col gap-0 items-start">
                      <span>Individual</span>
                      <span className="text-xs text-gray-500 text-wrap">Single guest booking</span>
                    </div>
                  </Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link className="p-2 rounded-xl hover:shadow hover:ring hover:ring-green-700 bg-white h-auto justify-start items-start gap-2" to="/reservation/list-reservation/new-reservation?type=individual">
                    <Users className="mt-1" size={24} />
                    <div className="flex flex-col gap-0 items-start">
                      <span>Group</span>
                      <span className="text-xs text-gray-500 text-wrap">Multiple guests under one booking</span>
                    </div>
                  </Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link className="p-2 rounded-xl hover:shadow hover:ring hover:ring-green-700 bg-white h-auto justify-start items-start gap-2" to="/reservation/list-reservation/new-reservation?type=individual">
                    <Repeat className="mt-1" size={24} />
                    <div className="flex flex-col gap-0 items-start">
                      <span>Series</span>
                      <span className="text-xs text-gray-500 text-wrap">Repeated group bookings over time</span>
                    </div>
                  </Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link className="p-2 rounded-xl hover:shadow hover:ring hover:ring-green-700 bg-white h-auto justify-start items-start gap-2" to="/reservation/list-reservation/new-reservation?type=individual">
                    <Blocks className="mt-1" size={24} />
                    <div className="flex flex-col gap-0 items-start">
                      <span>Block</span>
                      <span className="text-xs text-gray-500 text-wrap">Reserved rooms held without names yet</span>
                    </div>
                  </Link>
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Button variant="ghost" className="font-semibold bg-white rounded-lg py-2 px-12 text-black cursor-pointer shadow hover:scale-[1.009]">
            Walk In Register
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-4 mb-4">
          <Card>
            <h2 className="font-semibold text-2xl">Occupied</h2>
            <LineChart
              title="Monthly Revenue"
              labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
              series={[
              { label: "2025", data: [12, 19, 17, 23, 28, 30, 36], color: "#2563eb", fill: true },
              { label: "2024", data: [10, 15, 14, 18, 20, 22, 26], color: "#16a34a" },
              ]}
              tension={0.35}
              yMin={0}
              yStepSize={5}
              formatTooltip={(v) => `Rp ${v.toLocaleString("id-ID")}`}
              />
          </Card>
          <Card>
            <h2 className="font-semibold text-2xl">Booking</h2>

          </Card>
          <Card>
            <h2 className="font-semibold text-2xl">Pax</h2>

          </Card>
          <Card>
            <h2 className="font-semibold text-2xl">Revenue</h2>

          </Card>
        </div>  
        <div className="flex items-center gap-4 mb-4">
          {
            CARD_DATA.map((card: typeof CARD_DATA[0], index: number) => (
              <Card className="flex flex-col justify-between min-h-[150px] grow p-4" key={index}>
                <header className="flex items-center justify-between -mt-4">
                  <span className="bg-[#B8A76C] font-semibold text-black text-sm py-1 px-2 rounded-bl-lg rounded-br-lg">
                    {card.body}
                  </span>
                  <a href="#" className="!underline text-xs pt-2">See Detail</a>
                </header>
                <main>
                  <h3>34 {card.body}</h3>
                </main>
                <footer className="flex gap-6">
                  {
                    card.status.map((status: typeof card.status[0], index: number) => (
                      <Tooltip key={index}>
                        <TooltipTrigger asChild>
                          <span className="flex items-center gap-1">
                            {ICON_FOOTER[index].icon}
                            <h4 className="font-medium text-xs">{status.value}</h4>  
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="bg-[#8FB996]">
                          <p>{status.body}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))
                  }
                </footer>
              </Card>
            ))
          }
        </div>
        <Card>
          <header className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-2xl">7 Days Room Availability</h2>
            <p className="p-2 border border-black rounded-xl">Confirmed</p>
          </header>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICE.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">{invoice.invoice}</TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
