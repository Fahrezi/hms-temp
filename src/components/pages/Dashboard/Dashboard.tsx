import { Link } from 'react-router-dom';

import Card from '@/components/ui/Card/Card';
import { Blocks, ChevronsUp, Moon, PlaneLanding, PlaneTakeoff, Repeat, Search, User, Users } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/Tooltip';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/Popover';
import { Button } from '@/components/ui/Button';
import { COLORS, COMP_FOC, EST_OCC_PERCENT, flowData, FOC_OCHU, HU_PERM, HU_PRMO, HU_TEMP, OC, occupancyBreakdown, OCCUPIED_NOW, OD, OOO_PERM, OOO_TEMP, optionsAvailability, roomAvailability, Rooms, roomsPaxTable, statusOptionList, TOTAL_ROOMS, VC, VCI, VD } from './data.contants';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { ButtonHTMLAttributes, useEffect, useMemo, useState } from 'react';
import { useOverlay } from '@/hooks/useOverlay';

const LIST_RESERVATION = [
  {
    id: 'individual',
    text: 'Individual',
    subtitle: 'Single guest booking',
    icon: <User className="mt-1" size={24} />,
    type: 'individual',
  },
  {
    id: 'group',
    text: 'Group',
    subtitle: 'Multiple guests under one booking',
    icon: <Users className="mt-1" size={24} />,
    type: 'group',
  },
  {
    id: 'series',
    text: 'Series',
    subtitle: 'Repeated group bookings over time',
    icon: <Repeat className="mt-1" size={24} />,
    type: 'series',
  },
  {
    id: 'block',
    text: 'Block',
    subtitle: 'Reserved rooms held without names yet',
    icon: <Blocks className="mt-1" size={24} />,
    type: 'block',
  },
]

const KPI = ({ title, value, subtitle, tone="neutral" }: { title: string; value: number | string; subtitle?: string; tone?: string; }) => {
  const toneMap: Record<string, string> = {
    neutral: "",
    info: "bg-blue-50 border-blue-200",
    success: "bg-hotel-sage-whisper border-green-200",
    warning: "bg-hotel-warning/20 border-hotel-warning",
    danger: "bg-hotel-danger/20 border-hotel-danger",
  };
  const textMap: Record<string, string> = {
    neutral: "text-slate-700",
    info: "text-blue-600",
    success: "text-hotel-success",
    warning: "text-yellow-600",
    danger: "text-red-600",
  };
  
  return (
    <Card className={`space-y-2 !p-4 ${toneMap[tone]}`}>
      <h3 className="text-sm font-medium">{title}</h3>
      <p className={`mt-1 text-3xl font-semibold ${textMap[tone]}`}>{value}</p>
      {subtitle && <p className="mt-1 text-xs">{subtitle}</p>}
    </Card>
  )
}

const Dashboard = () => {
  const { activateOverlay, isActive: isActiveOverlay } = useOverlay();
  const [statusOpen, setStatusOpen] = useState(false);
  const styleStatusContainer = useMemo(() => `
    ${statusOpen ? 'h-[500px]' : 'h-[50px]'}  
  `, [statusOpen]);

  useEffect(() => {
    const buttonIndividual = document.querySelector<HTMLAnchorElement>('#individual');;
    if (statusOpen) {
      return buttonIndividual?.focus();
    }

    return buttonIndividual?.blur();
  }, [statusOpen]);

  return (
    <div className='relative flex gap-8'>
      <div className="grow">
        <section className="flex justify-end gap-4 mb-12">
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
                      <Link
                        className="p-2 rounded-xl hover:shadow hover:ring hover:ring-hotel-soft-fern focus-within:ring focus-within:ring-hotel-soft-fern bg-white h-auto justify-start items-start gap-4"
                        to={`/reservation/list-reservation/new-reservation?type=${value.type}`}
                        id={value.id}
                      >
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
          <Button variant="ghost" asChild className="font-semibold bg-white rounded-lg py-2 px-12 text-black cursor-pointer shadow hover:scale-[1.009]">
            <Link to="/reservation/register">
              Walk In Register
            </Link>
          </Button>
        </section>
        <section className="grid grid-cols-6 gap-4 mb-4">
          <KPI title="Total Rooms" value={TOTAL_ROOMS} subtitle="Inventory" />
          <KPI title="Occupied (Now)" value={OCCUPIED_NOW} subtitle="OC+OD snapshot" tone="info" />
          <KPI title="Occupancy %" value={`${EST_OCC_PERCENT.toFixed(2)}%`} subtitle="Provided" tone="info" />
          <KPI title="FOC (OC-HU)" value={FOC_OCHU} subtitle="Complimentary occupied" tone="warning" />
          <KPI title="Arrivals / Departures" value={`${Rooms.arrived} / ${Rooms.departed}`} subtitle={`Exp: ${Rooms.expectedArrivals} / ${Rooms.expectedDepartures}`} />
          <KPI title="OOO / OOS" value={OOO_TEMP + OOO_PERM} subtitle="Maintenance blocked" tone="danger" />
        </section>
        <section className="grid grid-cols-2 gap-4 mb-4">
          {/* Occupancy Breakdown */}
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">Occupancy Breakdown by Status</h2>
              <span className="text-xs text-slate-500">Sum vs Total Rooms</span>
            </div>
            <div className="h-72 min-w-0">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={occupancyBreakdown} dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={2}>
                    {occupancyBreakdown.map((entry, idx) => (
                      <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
          {/* Room Flow */}
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">Room Flow Today</h2>
              <span className="text-xs text-slate-500">Arrivals / Departures / Walk-ins</span>
            </div>
            <div className="h-72 min-w-0">  
              <ResponsiveContainer>
                <BarChart data={flowData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="label" />
                  <YAxis allowDecimals={false} />
                  <RechartsTooltip />
                  <Bar dataKey="value" fill="#738e7b" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 text-xs text-slate-500">Prep focus: ensure readiness for expected arrivals while clearing VD rooms.</div>
          </Card>
        </section>
        {/* Rooms vs Pax */}
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">Rooms vs Pax (with Average Pax/Room)</h2>
            <span className="text-xs text-slate-500">Operational planning</span>
          </div>
          <div className="overflow-x-auto">
            <Table className="w-full table-auto border-collapse text-sm">
              <TableHeader>
                <TableRow className="text-left text-slate-600">
                  <TableHead className="border-b p-2">Metric</TableHead>
                  <TableHead className="border-b p-2">Rooms</TableHead>
                  <TableHead className="border-b p-2">Pax</TableHead>
                  <TableHead className="border-b p-2">Avg Pax/Room</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roomsPaxTable.map((r) => {
                  const avg = r.rooms ? (r.pax / r.rooms).toFixed(2) : "-";
                  return (
                    <TableRow key={r.row} className="hover:bg-slate-50">
                      <TableCell className="border-b p-2 font-medium text-slate-700">{r.row}</TableCell>
                      <TableCell className="border-b p-2">{r.rooms}</TableCell>
                      <TableCell className="border-b p-2">{r.pax}</TableCell>
                      <TableCell className="border-b p-2">{avg}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>
        {/* HK Status Grid */}
        <section className="my-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Card>
            <h3 className="text-base font-semibold text-slate-800">Vacant Status</h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between rounded-lg bg-green-50 p-3">
                <span className="font-medium text-green-700">VC (Vacant Clean)</span>
                <span className="text-green-700">{VC}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-emerald-50 p-3">
                <span className="font-medium text-emerald-700">VCI (Vacant Clean Inspected)</span>
                <span className="text-emerald-700">{VCI}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-red-50 p-3">
                <span className="font-medium text-red-700">VD (Vacant Dirty)</span>
                <span className="text-red-700">{VD}</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-base font-semibold text-slate-800">Occupied Status</h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3">
                <span className="font-medium text-blue-700">OC (Occupied Clean)</span>
                <span className="text-blue-700">{OC}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-indigo-50 p-3">
                <span className="font-medium text-indigo-700">OD (Occupied Dirty)</span>
                <span className="text-indigo-700">{OD}</span>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-base font-semibold text-slate-800">Internal / Maintenance</h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between rounded-lg bg-amber-50 p-3">
                <span className="font-medium text-amber-700">HU TEMP</span>
                <span className="text-amber-700">{HU_TEMP}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-amber-50 p-3">
                <span className="font-medium text-amber-700">HU PERM</span>
                <span className="text-amber-700">{HU_PERM}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-amber-50 p-3">
                <span className="font-medium text-amber-700">HU PRMO</span>
                <span className="text-amber-700">{HU_PRMO}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-purple-50 p-3">
                <span className="font-medium text-purple-700">COMP FOC</span>
                <span className="text-purple-700">{COMP_FOC}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-100 p-3">
                <span className="font-medium text-slate-700">OOO / OOS</span>
                <span className="text-slate-700">{OOO_TEMP + OOO_PERM}</span>
              </div>
            </div>
            <div className="mt-3 text-xs text-slate-500">FOC OCHU today: {FOC_OCHU}. Consider reviewing comp policy / promo usage.</div>
          </Card>
        </section>
        <Card>
          <header className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-2xl">7 Days Room Availability</h2>
            <Select>
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
            </Select>
          </header>
          <Table>
            <TableCaption>A list of 7 Days Availability Room</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Room Type</TableHead>
                <TableHead className="text-right">13/09 Sat</TableHead>
                <TableHead className="text-right">14/09 Sun</TableHead>
                <TableHead className="text-right">15/09 Mon</TableHead>
                <TableHead className="text-right">16/09 Tue</TableHead>
                <TableHead className="text-right">17/09 Wed</TableHead>
                <TableHead className="text-right">18/09 Thu</TableHead>
                <TableHead className="text-right">19/09 Fri</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roomAvailability.map((room, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{room.type_of_room}</TableCell>
                  {
                    room.availability.map((availability, index) => (
                      <TableCell key={index} className="text-right">
                        {availability}
                      </TableCell>
                    ))
                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
      <div className={`fixed bottom-5 right-5 bg-white shadow-sm rounded-xl w-[350px] border border-gray-200 transition-all duration-200 overflow-auto ${styleStatusContainer}`}>
        <div className="relative">
          <header className="flex justify-between h-[50px] items-center sticky top-0 bg-white p-4 shadow-sm">
            <h4 className="font-medium text-lg">Status</h4>
            <ChevronsUp size={20} className={`cursor-pointer ${statusOpen ? 'rotate-180' : ''}`}  onClick={() => setStatusOpen(!statusOpen)}/>
          </header>
          <div className={`p-4 inset-shadow-xs ${!statusOpen && 'h-0 overflow-hidden !p-0'}`}>
            {
              Object.keys(statusOptionList).map((status: string, index: number) => {
                const currentStatus = statusOptionList[status as keyof typeof statusOptionList];
                return (
                  <section className="mb-4" key={index}>
                    <h4 className="font-medium text-lg mb-2 capitalize">{currentStatus.label}</h4>
                    <div className="flex flex-col gap-1 items-start">
                      {currentStatus.data.map((item, index) => (
                        <button className="hover:underline !text-sm" key={index}>{item.label}</button>
                      ))}
                    </div>
                  </section>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
