import { useState, useMemo } from "react";
import { Check, ChevronsUpDown, Plus, DollarSign, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/Command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Badge } from "@/components/ui/Badge";
import { Deposit, Guest } from "@/types/hotel";

interface DepositComboboxProps {
  deposits: Deposit[];
  guests: Guest[];
  selectedDepositId: string | null;
  onSelect: (deposit: Deposit | null) => void;
  onAddNew: () => void;
  disabled?: boolean;
}

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  pending: { label: "Pending", variant: "secondary" },
  received: { label: "Received", variant: "default" },
  applied: { label: "Applied", variant: "outline" },
  refunded: { label: "Refunded", variant: "destructive" },
  forfeited: { label: "Forfeited", variant: "destructive" },
};

const paymentMethodLabels: Record<string, string> = {
  cash: "Cash",
  "credit-card": "Credit Card",
  "debit-card": "Debit Card",
  "bank-transfer": "Bank Transfer",
  online: "Online",
};

export function DepositCombobox({
  deposits,
  guests,
  selectedDepositId,
  onSelect,
  onAddNew,
  disabled = false,
}: DepositComboboxProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const getGuestName = (guestId: string) => {
    return guests.find((g) => g.id === guestId)?.name || "Unknown Guest";
  };

  const selectedDeposit = useMemo(() => {
    return deposits.find((d) => d.id === selectedDepositId) || null;
  }, [deposits, selectedDepositId]);

  // Filter to show only pending/received deposits that can be applied
  const availableDeposits = useMemo(() => {
    return deposits.filter(
      (d) => d.status === "pending" || d.status === "received"
    );
  }, [deposits]);

  const filteredDeposits = useMemo(() => {
    if (!searchValue) return availableDeposits;
    const search = searchValue.toLowerCase();
    return availableDeposits.filter((d) => {
      const guestName = getGuestName(d.guestId).toLowerCase();
      return (
        d.id.toLowerCase().includes(search) ||
        guestName.includes(search) ||
        d.amount.toString().includes(search)
      );
    });
  }, [availableDeposits, searchValue]);

  const handleSelect = (deposit: Deposit) => {
    onSelect(deposit);
    setOpen(false);
    setSearchValue("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect(null);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-auto min-h-10 py-2"
          disabled={disabled}
        >
          {selectedDeposit ? (
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <DollarSign className="h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="flex flex-col items-start min-w-0 flex-1">
                <span className="font-medium truncate w-full text-left">
                  {selectedDeposit.id} - ${selectedDeposit.amount.toLocaleString()}
                </span>
                <span className="text-xs text-muted-foreground truncate w-full text-left">
                  {getGuestName(selectedDeposit.guestId)} · {paymentMethodLabels[selectedDeposit.paymentMethod] || selectedDeposit.paymentMethod}
                </span>
              </div>
              <Badge variant={statusConfig[selectedDeposit.status]?.variant || "secondary"} className="shrink-0">
                {statusConfig[selectedDeposit.status]?.label || selectedDeposit.status}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 shrink-0"
                onClick={handleClear}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ) : (
            <span className="text-muted-foreground">Search or select deposit...</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0 bg-popover" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search by ID, guest name, or amount..."
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>
              <div className="py-4 text-center text-sm text-muted-foreground">
                No deposit found.
              </div>
            </CommandEmpty>
            <CommandGroup heading="Available Deposits">
              {filteredDeposits.map((deposit) => (
                <CommandItem
                  key={deposit.id}
                  value={deposit.id}
                  onSelect={() => handleSelect(deposit)}
                  className="flex items-start gap-3 py-3"
                >
                  <Check
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0",
                      selectedDepositId === deposit.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{deposit.id}</span>
                      <span className="font-semibold text-primary">
                        ${deposit.amount.toLocaleString()}
                      </span>
                      <Badge variant={statusConfig[deposit.status]?.variant || "secondary"} className="text-xs">
                        {statusConfig[deposit.status]?.label || deposit.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{getGuestName(deposit.guestId)}</span>
                      <span>·</span>
                      <span>{paymentMethodLabels[deposit.paymentMethod] || deposit.paymentMethod}</span>
                      {deposit.receivedAt && (
                        <>
                          <span>·</span>
                          <span>{new Date(deposit.receivedAt).toLocaleDateString()}</span>
                        </>
                      )}
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  onAddNew();
                }}
                className="flex items-center gap-2 py-3"
              >
                <Plus className="h-4 w-4" />
                <span className="font-medium">Add New Deposit</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
