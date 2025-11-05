import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import Card from "@/components/ui/Card/Card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/Dialog/Dialog";
import { Input } from "@/components/ui/Input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/Table";
import { useHeaderNav } from "@/hooks/useHeaderNav";
import { Separator } from "@radix-ui/react-select";
import { set } from "date-fns";
import { Download, Ellipsis, Eye, Search } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ReportDoc } from "./components/ReportPDF";
import { pdf } from "@react-pdf/renderer";

const SEED_GUEST = [
  {
    "id": '1',
    "room_no": "101",
    "last_name": "Smith",
    "first_name": "John",
    "arrival": "2025-11-04",
    "departure": "2025-11-07",
    "rate_source": "Agoda",
    "group": "Business",
    "etd": "18:00",
    "by": "Front Desk",
    "sell_type": "Room Only",
    "guest_type": "VIP",
    "m_j": "01",
    "adult": "2",
    "child": "0",
    "rsvp": "RS1P100679",
    "type": "Confirmed",
    "reg_no": "REG001",
    "status": "check-in",
    "balance": "0"
  },
  {
    "id": '2',
    "room_no": "202",
    "last_name": "Garcia",
    "first_name": "Maria",
    "arrival": "2025-11-05",
    "departure": "2025-11-08",
    "rate_source": "Booking.com",
    "group": "Family",
    "etd": "12:00",
    "by": "Online",
    "sell_type": "B&B",
    "guest_type": "Leisure",
    "m_j": "01",
    "adult": "2",
    "child": "1",
    "rsvp": "RS1P101234",
    "type": "Tentative",
    "reg_no": "REG002",
    "status": "check-out",
    "balance": "0"
  },
  {
    "id": '3',
    "room_no": "303",
    "last_name": "Tanaka",
    "first_name": "Hiroshi",
    "arrival": "2025-11-03",
    "departure": "2025-11-06",
    "rate_source": "Walk-in",
    "group": "-",
    "etd": "14:00",
    "by": "Front Desk",
    "sell_type": "Full Board",
    "guest_type": "Individual",
    "m_j": "01",
    "adult": "1",
    "child": "0",
    "rsvp": "RS1P102345",
    "type": "Checked In",
    "reg_no": "REG003",
    "status": "check-in",
    "balance": "0"
  }
];

const GUEST_LABEL_KEY = [
  { label: "Room#", value: "room_no" },
  { label: "RSVP", value: "rsvp" },
  { label: "Status", value: "status" },
  { label: "Last Name", value: "last_name" },
  { label: "First Name", value: "first_name" },
  { label: "Arrival", value: "arrival" },
  { label: "Departure", value: "departure" },
  { label: "Rate Source", value: "rate_source" },
  { label: "Group", value: "group" },
  { label: "ETD", value: "etd" },
  { label: "By", value: "by" },
  { label: "Sell Type", value: "sell_type" },
  { label: "Guest Type", value: "guest_type" },
  { label: "M/J", value: "m_j" },
  { label: "Adult", value: "adult" },
  { label: "Child", value: "child" },
  { label: "Type", value: "type" },
  { label: "REG#", value: "reg_no" }
];

const GuestList = () => {
  const { changeTitle } = useHeaderNav();
  const [openModal, setOpenModal] = useState<Record<'view' | 'checkout', boolean>>({
    view: false,
    checkout: false
  });
  const [listGuest, setListGuest] = useState(SEED_GUEST);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string>("");
  const [guestDetail, setGuestDetail] = useState<typeof SEED_GUEST[0] | null>(null);

  const handleModal = useCallback((key: 'view' | 'checkout', value: boolean) => {
    setOpenModal({ ...openModal, [key]: value });
  }, []);

  const handleView = useCallback((detailGuest: typeof SEED_GUEST[0]) => {
    setGuestDetail(detailGuest);
    handleModal('view', true);
  }, []);

  const handleCheckout = useCallback((detailGuest: typeof SEED_GUEST[0]) => {
    setGuestDetail(detailGuest);
    setSelectedId(detailGuest.id);
    handleModal('checkout', true);
  }, []);

  const confirmCheckout = useCallback(() => {
    const checkedOutGuestIndex = listGuest.findIndex((guest) => guest.id === selectedId);
    const newListGuest = [...listGuest];

    if (checkedOutGuestIndex !== -1) {
      newListGuest[checkedOutGuestIndex].status = 'check-out';
      setListGuest([...newListGuest]);
    }

    handleModal('checkout', false);
    setSelectedId('');
  }, [selectedId, listGuest]);

  const ACTION_TABLE = useMemo(() => [
    {
      name: 'Check Out',
      action: (detailGuest: typeof SEED_GUEST[0]) => handleCheckout(detailGuest),
    },
  ], [handleCheckout]);
  
  useEffect(() => {
    changeTitle('Guest List');
  }, []);

  useEffect(() => {
    if (search) {
      setListGuest(SEED_GUEST.filter((guest) => guest.rsvp.toLowerCase().includes(search.toLowerCase())));
    }
  }, [search]);

  const handleDownloadPDF = async () => {
    const blob = await pdf(<ReportDoc hotelName="Hotel Lorin Sentul" data={listGuest} />).toBlob();

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'guest-list-report.pdf';
    link.click();

    setTimeout(() => {
      link.remove();
      URL.revokeObjectURL(url);
    }, 100);
  }

  return (
    <section>
      <Card>
        <header className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-2xl capitalize">Guest List</h2>
          <div className="flex items-center gap-2">
            <Button className="!py-2 !px-4" variant="default" onClick={() => handleDownloadPDF()}>
              <Download size={16}/><span>Report Guest List</span>
            </Button>
            <div className="relative">
              <span className="absolute top-1/2 left-2 transform -translate-y-1/2">
                <Search size={16} />
              </span>
              <Input
                className="pl-8 min-w-[250px] !text-xs"
                placeholder="Search RSVP Id"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </header>
        <div className="w-full overflow-auto">
          <Table>
            <TableCaption>A list of your recent guests.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[50px ]">Action</TableHead>
                {
                  GUEST_LABEL_KEY.map(({ label }) => (
                    <TableHead className="min-w-[80px]">{label}</TableHead>
                  ))
                }
              </TableRow>
            </TableHeader>
            <TableBody>
              {listGuest?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="text-right">
                    <div className="flex items-center gap-2">
                      <Popover>
                        <PopoverTrigger>
                          <Button className="border border-hotel-green/30 rounded-xl p-4 cursor-pointer shadow-md">
                            <Ellipsis size={16} />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="flex flex-col gap-2 p-2 rounded-lg w-[150px] shadow bg-white border-none" align="start">
                          {ACTION_TABLE.map((itemAction, index) => (
                            <button
                              className="p-2 w-auto rounded !text-xs hover:shadow-xs bg-red-700 hover:bg-red-700/80 text-white cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                              key={index}
                              disabled={item.status === 'check-out'}
                              onClick={() => itemAction.action(item)}
                            >
                              {itemAction.name}
                            </button>
                          ))}
                        </PopoverContent>
                      </Popover>
                      <Button className="border border-gray-200" variant="ghost" onClick={() => handleView(item)}>
                        <Eye size={16} className="cursor-pointer" />
                      </Button>
                    </div>
                  </TableCell>
                  {
                    GUEST_LABEL_KEY.map(({ value }, indexChild) => (
                      <TableCell key={indexChild} className="min-w-[60px]">
                        {
                          value === 'status' ? (
                            <Badge variant={(item as Record<string, string>)[value] === 'check-in' ? 'warning' : 'destructive'}>
                              {(item as Record<string, string>)[value]}
                            </Badge>
                          ) : (
                            <>
                              {(item as Record<string, string>)[value]}
                            </>
                          )
                        }
                      </TableCell>
                    ))
                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
      <Dialog open={openModal.checkout} onOpenChange={() => handleModal('checkout', false)}>
        <DialogContent showCloseButton className="bg-white min-w-[60vw] max-h-[50vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="mb-6">Check Out</DialogTitle>
          </DialogHeader>
          <div className="text-sm grid grid-cols-3 gap-2">
            <span className="text-muted-foreground">Guest</span>
            <span className="col-span-2 font-medium">
              {guestDetail?.first_name} {guestDetail?.last_name}
            </span>

            <span className="text-muted-foreground">Room</span>
            <span className="col-span-2">{guestDetail?.room_no}</span>

            <span className="text-muted-foreground">REG#</span>
            <span className="col-span-2">{guestDetail?.reg_no}</span>

            <span className="text-muted-foreground">RSVP</span>
            <span className="col-span-2">{guestDetail?.rsvp}</span>

            <span className="text-muted-foreground">Balance</span>
            <span className={`col-span-2 ${guestDetail?.balance === '0' ? "text-green-600" : "text-red-600"}`}>
              {Number(guestDetail?.balance).toFixed(2)}
            </span>
          </div>
          <DialogFooter className="mt-2">
            <Button type="button" variant="secondary" onClick={() => handleModal('checkout', false)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={() => confirmCheckout()}>Check out</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={openModal.view} onOpenChange={() => handleModal('view', false)}>
        <DialogContent showCloseButton className="bg-white min-w-[60vw] max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="mb-6">Guest Detail</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            {
              GUEST_LABEL_KEY.map(({ label, value }, index) => (
                <div key={index}>
                  <h3 className="font-medium">{label}</h3>
                  <p>{guestDetail?.[value as keyof typeof SEED_GUEST[0]]}</p>
                </div>
              ))
            }
          </div>
          <Separator />
          <DialogFooter className="mt-2">
            <Button type="button" variant="secondary" onClick={() => handleModal('view', false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default GuestList;