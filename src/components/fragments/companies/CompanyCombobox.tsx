import { useState, useMemo } from "react";
import { Check, ChevronsUpDown, Plus, Building2, X } from "lucide-react";
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
import { Company } from "@/types/hotel";

interface CompanyComboboxProps {
  companies: Company[];
  selectedCompanyId: string | null;
  onSelect: (company: Company | null) => void;
  onAddNew: () => void;
  disabled?: boolean;
}

export function CompanyCombobox({
  companies,
  selectedCompanyId,
  onSelect,
  onAddNew,
  disabled = false,
}: CompanyComboboxProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const selectedCompany = useMemo(() => {
    return companies.find((c) => c.id === selectedCompanyId) || null;
  }, [companies, selectedCompanyId]);

  const filteredCompanies = useMemo(() => {
    if (!searchValue) return companies.filter((c) => c.isActive);
    const search = searchValue.toLowerCase();
    return companies.filter(
      (c) =>
        c.isActive &&
        (c.name.toLowerCase().includes(search) ||
          c.corporateAccountId.toLowerCase().includes(search) ||
          c.email.toLowerCase().includes(search))
    );
  }, [companies, searchValue]);

  const handleSelect = (company: Company) => {
    onSelect(company);
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
          {selectedCompany ? (
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Building2 className="h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="flex flex-col items-start min-w-0 flex-1">
                <span className="font-medium truncate w-full text-left">
                  {selectedCompany.name}
                </span>
                <span className="text-xs text-muted-foreground truncate w-full text-left">
                  {selectedCompany.corporateAccountId}
                  {selectedCompany.contractedRate && (
                    <> · {selectedCompany.contractedRate}% discount</>
                  )}
                </span>
              </div>
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
            <span className="text-muted-foreground">Search or select company...</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search companies..."
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>
              <div className="py-4 text-center text-sm text-muted-foreground">
                No company found.
              </div>
            </CommandEmpty>
            <CommandGroup heading="Companies">
              {filteredCompanies.map((company) => (
                <CommandItem
                  key={company.id}
                  value={company.id}
                  onSelect={() => handleSelect(company)}
                  className="flex items-start gap-3 py-3"
                >
                  <Check
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0",
                      selectedCompanyId === company.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{company.name}</span>
                      {company.contractedRate && (
                        <Badge variant="secondary" className="text-xs">
                          {company.contractedRate}% off
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{company.corporateAccountId}</span>
                      {company.email && (
                        <>
                          <span>·</span>
                          <span className="truncate">{company.email}</span>
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
                <span className="font-medium">Add New Company</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
