import { useEffect, useMemo, useState } from "react"

const SEED_DATA = [
  {
    "deposit_date": "2025-10-15",
    "deposit_number": "DPT-20251015-001",
    "reference_number": "REF-984732",
    "description": "October guest booking deposit",
    "assigned_to": "John Doe",
    "applied_to": "Booking #BK-1034",
    "amount": 1500.00,
    "status": "Confirmed",
    "arrival_date": "2025-10-20",
    "departure_date": "2025-10-25"
  },
  {
    "deposit_date": "2025-10-16",
    "deposit_number": "DPT-20251016-002",
    "reference_number": "REF-984733",
    "description": "Corporate event room deposit",
    "assigned_to": "Emily Carter",
    "applied_to": "Event #EV-204",
    "amount": 3200.00,
    "status": "Pending",
    "arrival_date": "2025-11-01",
    "departure_date": "2025-11-03"
  },
  {
    "deposit_date": "2025-10-17",
    "deposit_number": "DPT-20251017-003",
    "reference_number": "REF-984734",
    "description": "Long-stay reservation deposit",
    "assigned_to": "Michael Lee",
    "applied_to": "Booking #BK-1035",
    "amount": 4500.00,
    "status": "Confirmed",
    "arrival_date": "2025-11-10",
    "departure_date": "2025-12-10"
  }
];

export const useDeposit = () => {
  const headerList = useMemo(() => [
    { "label": "Deposit Date", "value": "deposit_date" },
    { "label": "Deposit #", "value": "deposit_number" },
    { "label": "Ref #", "value": "reference_number" },
    { "label": "Description", "value": "description" },
    { "label": "Assigned To", "value": "assigned_to" },
    { "label": "Applied To", "value": "applied_to" },
    { "label": "Amount", "value": "amount" },
    { "label": "Status", "value": "status" },
    { "label": "Arrival", "value": "arrival_date" },
    { "label": "Departure", "value": "departure_date" }
  ], []);

  const [values, setValues] = useState<typeof SEED_DATA | null>(null);
  const indexBody: string[] = useMemo(() => headerList.map(item => item.value), [headerList]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setValues(SEED_DATA);
  }, []);

  const handleView = () => {};
  const handleEdit = () => {
    setOpenModal(true);
  };
  const handleDelete = () => {};

  return {
    headerList,
    values,
    indexBody,
    handleView,
    handleEdit,
    handleDelete,
    openModal,
    setOpenModal
  }
}