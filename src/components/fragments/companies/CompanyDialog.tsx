import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/TextArea";
import { Checkbox } from "@/components/ui/Checkbox";
import { Company } from "@/types/hotel";
import { Building2 } from "lucide-react";
import { toast } from "sonner";

interface CompanyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCompanyCreated: (company: Company) => void;
}

export function CompanyDialog({ open, onOpenChange, onCompanyCreated }: CompanyDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    taxId: '',
    corporateAccountId: '',
    billingContact: '',
    contractedRate: '',
    creditLimit: '',
    paymentTerms: 'Net 30',
    notes: '',
    isActive: true,
  });

  const generateCorpId = () => {
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `CORP-${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("Company name is required");
      return;
    }

    const newCompany: Company = {
      id: Date.now().toString(),
      name: formData.name.trim(),
      address: formData.address.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      taxId: formData.taxId.trim(),
      corporateAccountId: formData.corporateAccountId.trim() || generateCorpId(),
      billingContact: formData.billingContact.trim(),
      contractedRate: formData.contractedRate ? parseFloat(formData.contractedRate) : undefined,
      creditLimit: formData.creditLimit ? parseFloat(formData.creditLimit) : undefined,
      paymentTerms: formData.paymentTerms.trim() || undefined,
      isActive: formData.isActive,
      createdAt: new Date().toISOString(),
      notes: formData.notes.trim() || undefined,
    };

    onCompanyCreated(newCompany);
    toast.success(`Company "${newCompany.name}" created`);
    
    // Reset form
    setFormData({
      name: '',
      address: '',
      phone: '',
      email: '',
      taxId: '',
      corporateAccountId: '',
      billingContact: '',
      contractedRate: '',
      creditLimit: '',
      paymentTerms: 'Net 30',
      notes: '',
      isActive: true,
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Add New Company
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Company Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Acme Corporation"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="corporateAccountId">Corporate Account ID</Label>
              <Input
                id="corporateAccountId"
                value={formData.corporateAccountId}
                onChange={(e) => setFormData({ ...formData, corporateAccountId: e.target.value })}
                placeholder="Auto-generated if empty"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              name="address"
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="123 Business Ave, New York, NY 10001"
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 555-0100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="billing@acme.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="taxId">Tax ID</Label>
              <Input
                id="taxId"
                value={formData.taxId}
                onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                placeholder="TX-123456789"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billingContact">Billing Contact</Label>
              <Input
                id="billingContact"
                value={formData.billingContact}
                onChange={(e) => setFormData({ ...formData, billingContact: e.target.value })}
                placeholder="Jane Smith"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contractedRate">Contracted Rate (%)</Label>
              <Input
                id="contractedRate"
                type="number"
                min={0}
                max={100}
                value={formData.contractedRate}
                onChange={(e) => setFormData({ ...formData, contractedRate: e.target.value })}
                placeholder="10"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="creditLimit">Credit Limit ($)</Label>
              <Input
                id="creditLimit"
                type="number"
                min={0}
                value={formData.creditLimit}
                onChange={(e) => setFormData({ ...formData, creditLimit: e.target.value })}
                placeholder="50000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentTerms">Payment Terms</Label>
              <Input
                id="paymentTerms"
                value={formData.paymentTerms}
                onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
                placeholder="Net 30"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              name="notes"
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes about this company..."
              rows={2}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked as boolean })}
            />
            <Label htmlFor="isActive" className="text-sm font-normal cursor-pointer">
              Active Company
            </Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              <Building2 className="h-4 w-4 mr-2" />
              Create Company
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
