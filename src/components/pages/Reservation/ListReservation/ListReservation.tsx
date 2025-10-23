import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { useEffect, useState } from 'react';
import { cn } from '@/libs/utils';
import Card from '@/components/ui/Card/Card';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { Blocks, ChevronDown, Ellipsis, Repeat, Search, User, Users } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { useHeaderNav } from '@/hooks/useHeaderNav';

type FilterTab = 'current-reservation' | 'no-show-reservation' | 'no-show-room';
const FILTER_TABS: { label: FilterTab; body: string }[] = [
  { label: 'current-reservation', body: 'Current Reservation' },
  { label: 'no-show-reservation', body: 'No Show Reservation' },
  { label: 'no-show-room', body: 'No Show Room' },
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

const ACTION_TABLE = [
  {
    name: 'Check In',
    action: () => window.location.href = '/reservation/register',
  },
  {
    name: 'Cancel Reservation',
    action: () => {},
  },
  {
    name: 'No Show Room',
    action: () => {},
  },
  {
    name: 'No Show Guest',
    action: () => {},
  },
  {
    name: 'Print Confirmation',
    action: () => {},
  },
]

const ListReservation = () => {
  const [filterTab, setFilterTab] = useState<FilterTab>('current-reservation');
  const { changeTitle } = useHeaderNav();

  useEffect(() => {
    changeTitle('List Reservation');
  }, []);

  return (
    <div>
      <section className="flex justify-between items-center mb-4">
        <div className="flex gap-4 p-2 rounded-xl border border-[#DADADA] bg-[#FCFBFB]">
          {
            FILTER_TABS.map(({ label, body }, index) => (
              <span
                aria-label={label}
                key={index}
                className={
                  cn("font-medium text-sm cursor-pointer p-2 rounded-lg",
                    filterTab === label && 'bg-hotel-mint-mist text-hotel-green')
                }
                onClick={() => setFilterTab(label)}
                >
                  {body}
              </span> 
            ))
          }
        </div>
        <div className="flex gap-4">
          <Popover>
            <PopoverTrigger>
              <Button className="font-semibold bg-hotel-green hover:bg-hotel-green-hover text-hotel-mint-mist rounded-lg py-2 px-12 cursor-pointer shadow hover:scale-[1.009] active:scale-98">
                New Reservation
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 bg-white border-gray-100 rounded-xl shadow py-4 px-2">
              <div className="space-y-2 flex flex-col">
                <Button asChild variant="ghost">
                  <Link className="p-2 rounded-xl hover:shadow hover:ring hover:ring-hotel-soft-fern bg-white h-auto justify-start items-start gap-4" to="/reservation/list-reservation/new-reservation?type=individual">
                    <User className="mt-1" size={24} />
                    <div className="flex flex-col gap-0 items-start">
                      <span>Individual</span>
                      <span className="text-xs text-gray-500 text-wrap">Single guest booking</span>
                    </div>
                  </Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link className="p-2 rounded-xl hover:shadow hover:ring hover:ring-hotel-soft-fern bg-white h-auto justify-start items-start gap-4" to="/reservation/list-reservation/new-reservation?type=individual">
                    <Users className="mt-1" size={24} />
                    <div className="flex flex-col gap-0 items-start">
                      <span>Group</span>
                      <span className="text-xs text-gray-500 text-wrap">Multiple guests under one booking</span>
                    </div>
                  </Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link className="p-2 rounded-xl hover:shadow hover:ring hover:ring-hotel-soft-fern bg-white h-auto justify-start items-start gap-4" to="/reservation/list-reservation/new-reservation?type=individual">
                    <Repeat className="mt-1" size={24} />
                    <div className="flex flex-col gap-0 items-start">
                      <span>Series</span>
                      <span className="text-xs text-gray-500 text-wrap">Repeated group bookings over time</span>
                    </div>
                  </Link>
                </Button>
                <Button asChild variant="ghost">
                  <Link className="p-2 rounded-xl hover:shadow hover:ring hover:ring-hotel-soft-fern bg-white h-auto justify-start items-start gap-4" to="/reservation/list-reservation/new-reservation?type=individual">
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
          <Button className="font-semibold bg-white rounded-lg py-2 px-12 cursor-pointer shadow hover:scale-[1.009]">Walk In Register</Button>
        </div>
      </section>
      <section className="flex justify-between mb-4">
        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger>
              <Button 
                className="flex items-center gap-2 bg-[#FCFBFB] rounded-lg py-2 cursor-pointer border border-[#DADADA] w-[150px]"
              >
                <span>Room Type</span>
                <ChevronDown size={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[150px] bg-white border-none shadow">
              <span>Room Type...</span>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>
              <Button 
                className="flex items-center gap-2 bg-[#FCFBFB] rounded-lg py-2 cursor-pointer border border-[#DADADA] w-[150px]"
              >
                <span>Rate Source</span>
                <ChevronDown size={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[150px] bg-white border-none shadow">
              <span>Rate Source...</span>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger>
              <Button 
                className="flex items-center gap-2 bg-[#FCFBFB] rounded-lg py-2 cursor-pointer border border-[#DADADA] w-[150px]"
              >
                <span>Status</span>
                <ChevronDown size={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[150px] bg-white border-none shadow">
              <span>Status...</span>
            </PopoverContent>
          </Popover>
        </div>
        <div className="relative">
          <span className="absolute top-1/2 left-2 transform -translate-y-1/2">
            <Search size={16} />
          </span>
          <Input
            className="pl-8 min-w-[250px] !text-xs"
            placeholder="Search RSVP Id/First Name/Last Name"
          />
        </div>
      </section>
      <section>
        <Card>
          <header className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-2xl capitalize">{filterTab.split('-').join(' ')}</h2>
            <p className="p-2 border border-black rounded-xl">Confirmed</p>
          </header>
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICE.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">{invoice.invoice}</TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">
                    <Popover>
                      <PopoverTrigger>
                        <Button className="border border-hotel-green rounded-xl p-4 cursor-pointer">
                          <Ellipsis size={16} />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="flex flex-col gap-2 p-2 rounded-lg w-[150px] shadow bg-white border-none">
                        {ACTION_TABLE.map((item, index) => (
                          <span className="p-2 rounded hover:shadow-xs cursor-pointer text-xs" key={index} onClick={item.action}>
                            {item.name}
                          </span>
                        ))}
                      </PopoverContent>
                    </Popover>
                  </TableCell>
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
      </section>
    </div>
  );
};

export default ListReservation;
