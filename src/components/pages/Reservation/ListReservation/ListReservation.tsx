import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { act, useEffect, useState } from 'react';
import { cn } from '@/libs/utils';
import Card from '@/components/ui/Card/Card';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';
import { Blocks, ChevronDown, Ellipsis, Repeat, Search, User, Users } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { useHeaderNav } from '@/hooks/useHeaderNav';
import { useOverlay } from '@/hooks/useOverlay';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { optionsAvailability } from '../../Dashboard/data.contants';
import { RESERVATION_LABEL_KEY } from './constants';
import { useListReservation } from './useListReservation.hooks';

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
];

const LIST_RESERVATION = [
  {
    text: 'Individual',
    subtitle: 'Single guest booking',
    icon: <User className="mt-1" size={24} />,
    type: 'individual',
  },
  {
    text: 'Group',
    subtitle: 'Multiple guests under one booking',
    icon: <Users className="mt-1" size={24} />,
    type: 'group',
  },
  {
    text: 'Series',
    subtitle: 'Repeated group bookings over time',
    icon: <Repeat className="mt-1" size={24} />,
    type: 'series',
  },
  {
    text: 'Block',
    subtitle: 'Reserved rooms held without names yet',
    icon: <Blocks className="mt-1" size={24} />,
    type: 'block',
  },
];

const ListReservation = () => {
  const [filterTab, setFilterTab] = useState<FilterTab>('current-reservation');
  const { changeTitle } = useHeaderNav();
  const { activateOverlay, isActive: isActiveOverlay } = useOverlay();
  const { listReservation } = useListReservation();

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
              <Button
                className={`font-semibold bg-hotel-green hover:bg-hotel-green-hover text-hotel-gold-light rounded-lg py-2 px-12 cursor-pointer shadow hover:scale-[1.009] active:scale-98 ${isActiveOverlay && 'z-50'}`}
                onClick={() => activateOverlay(!isActiveOverlay)}
              >
                New Reservation
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 bg-white border-gray-100 rounded-xl shadow py-4 px-2" onCloseAutoFocus={() => activateOverlay(false)}>
              <div className="space-y-2 flex flex-col">
                {
                  LIST_RESERVATION.map((value, index) => (
                    <Button asChild variant="ghost" key={index}>
                      <Link className="p-2 rounded-xl hover:shadow hover:ring hover:ring-hotel-soft-fern bg-white h-auto justify-start items-start gap-4" to={`/reservation/list-reservation/new-reservation?type=${value.type}`}>
                        {value.icon}
                        <div className="flex flex-col gap-0 items-start">
                          <span>{value.text}</span>
                          <span className="text-xs text-gray-500 text-wrap">{value.subtitle}</span>
                        </div>
                      </Link>
                    </Button>
                  ))
                }
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
            {/* <Select>
              <SelectTrigger className="overflow-hidden w-full border border-[#dadada] bg-white max-w-max">
                <SelectValue placeholder="Select a room type" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-[#DADADA] rounded-xl mt-0.5">
                {optionsAvailability.map((opt, index) => (
                  <SelectItem className="hover:bg-[#f5f5f5]" key={index} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select> */}
          </header>
          <div className="w-full overflow-auto">
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[50px ]">Aksi</TableHead>
                  {
                    RESERVATION_LABEL_KEY.map(({ label }) => (
                      <TableHead className="min-w-[150px]">{label}</TableHead>
                    ))
                  }
                </TableRow>
              </TableHeader>
              <TableBody>
                {listReservation?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-right">
                      <Popover>
                        <PopoverTrigger>
                          <Button className="border border-hotel-green/30 rounded-xl p-4 cursor-pointer shadow-md">
                            <Ellipsis size={16} />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col gap-2 p-2 rounded-lg w-[150px] shadow bg-white border-none" align="start">
                          {ACTION_TABLE.map((item, index) => (
                            <span className="p-2 rounded hover:shadow-xs hover:bg-hotel-green-hover/70 cursor-pointer text-xs" key={index} onClick={item.action}>
                              {item.name}
                            </span>
                          ))}
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                    {
                      RESERVATION_LABEL_KEY.map(({ value }, indexChild) => (
                        <TableCell key={indexChild} className="min-w-[100px]">{(item as Record<string, string>)[value]}</TableCell>
                      ))
                    }
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default ListReservation;
