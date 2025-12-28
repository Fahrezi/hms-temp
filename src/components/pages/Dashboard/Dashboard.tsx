import { BedDouble, Construction, Gift, LoaderIcon, UserCircle, UsersRound } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip as RechartsTooltip,XAxis, YAxis } from "recharts"

import { ActivityFeed } from '@/components/fragments/dashboard/ActivityFeed';
import { KPI } from '@/components/fragments/dashboard/Kpi';
import { Card } from '@/components/ui/Card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';

import { COLORS, COMP_FOC, EST_OCC_PERCENT, flowData, FOC_OCHU, HU_PERM, HU_PRMO, HU_TEMP, OC, occupancyBreakdown, OCCUPIED_NOW, OD, OOO_PERM, OOO_TEMP, optionsAvailability, roomAvailability, Rooms, roomsPaxTable, statusOptionList, TOTAL_ROOMS, VC, VCI, VD } from './data.contants';

import { activities } from '@/data/mock';

const Dashboard = () => {
  return (
    <div className='relative flex gap-8'>
      <div className="grow">
        <section className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-4">
          <KPI title="Total Rooms" value={TOTAL_ROOMS} subtitle="Inventory" icon={BedDouble} />
          <KPI title="Occupied (Now)" value={OCCUPIED_NOW} subtitle="OC+OD snapshot" tone="info" icon={UserCircle} />
          <KPI title="Occupancy %" value={`${EST_OCC_PERCENT.toFixed(2)}%`} subtitle="Provided" tone="info" icon={UsersRound} />
          <KPI title="FOC (OC-HU)" value={FOC_OCHU} subtitle="Complimentary occupied" tone="warning" icon={Gift} />
          <KPI title="Arrivals / Departures" value={`${Rooms.arrived} / ${Rooms.departed}`} subtitle={`Exp: ${Rooms.expectedArrivals} / ${Rooms.expectedDepartures}`} icon={LoaderIcon} />
          <KPI title="OOO / OOS" value={OOO_TEMP + OOO_PERM} subtitle="Maintenance blocked" tone="danger" icon={Construction} />
        </section>
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
        <Card className="mb-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-800">Rooms vs Pax (with Average Pax/Room)</h2>
            <span className="text-xs text-slate-500">Operational planning</span>
          </div>
          <div className="rounded-xl overflow-auto">
            <Table className="w-full table-auto border-collapse text-sm">
              <TableHeader>
                <TableRow className="text-left">
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
          <div className="rounded-xl overflow-auto">
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
          </div>
        </Card>
      </div>

      <ActivityFeed activities={activities} />
    </div>
  );
};

export default Dashboard;
