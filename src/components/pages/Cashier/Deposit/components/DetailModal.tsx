import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/Dialog/Dialog";
import { Eye } from "lucide-react";
import { useState } from "react";

const DetailModal = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button className="!p-1" variant="ghost" onClick={() => setOpenModal(true)}><Eye size={16} /></Button>
      </DialogTrigger>
      <DialogContent showCloseButton className="bg-white border border-gray-100 min-w-[60vw]">
        <h1 className="text-xl font-semibold">Detail Deposit</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
          <div>
            <h3 className="font-medium">Entry Date</h3>
            <p>2023-01-01</p>
          </div>
          <div>
            <h3 className="font-medium">Ref</h3>
            <p>Deposit-2023-01-01</p>
          </div>
          <div>
            <h3 className="font-medium">Description</h3>
            <p>This deposit is 25% of the total amount</p>
          </div>
          <div>
            <h3 className="font-medium">Deposit For</h3>
            <p>Event</p>
          </div>
          <div>
            <h3 className="font-medium">Currency</h3>
            <p>IDR</p>
          </div>
          <div>
            <h3 className="font-medium">Exchange Rate</h3>
            <p>1</p>
          </div>
          <div>
            <h3 className="font-medium">Amount</h3>
            <p>Rp.100,000</p>
          </div>
          <div>
            <h3 className="font-medium">Foreign Amount</h3>
            <p>Rp.100,000</p>
          </div>
          <div>
            <h3 className="font-medium">Notes</h3>
            <p>Remind me for this deposit</p>
          </div>
        </div>

        <DialogFooter className="mt-2">
          <Button type="button" variant="secondary" onClick={() => setOpenModal(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DetailModal