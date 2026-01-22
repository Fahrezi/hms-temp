import { useMemo } from "react";
import { Control, useFieldArray } from "react-hook-form";

import CardForm from "@/components/ui/CardForm/CardForm";
import { InputLabel } from "@/components/ui/InputLabel";
import SelectInput from "@/components/ui/SelectInput";
import TableInput from "@/components/ui/TableInput";

import { cardTypeList, paidMethodList } from "@/constants/data";

import { RHFBridgeProps } from "../types/index.type";
import { Building2, CreditCard, Crown } from "lucide-react";
import { Label } from "@/components/ui/Label";
import { DepositCombobox } from "@/components/fragments/deposits/DepositCombobox";
import { Checkbox } from "@/components/ui/Checkbox";
import { CompanyCombobox } from "@/components/fragments/companies/CompanyCombobox";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/TextArea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { RoomReservation } from "@/types/hotel";
import { companies, deposits, guests, rooms } from "@/data/mock";

type StepProps = RHFBridgeProps<any>;

const HEADER_DEPOSIT = [
  { label: 'DPST #', value: 'depositId' },
  { label: 'Date', value: 'date' },
  { label: 'Description', value: 'description' },
  { label: 'Amount', value: 'amount' },
  { label: 'Ref #', value: 'ref' },
  { label: 'Paid By', value: 'paidBy' },
]

const HEADER_MEMBERSHIP = [
  { label: 'ID', value: 'membershipId' },
  { label: 'MBR', value: 'member' },
  { label: 'Name', value: 'name' },
  { label: 'Valid Until', value: 'validUntil' },
  { label: 'STS', value: 'status' },
]

export const AccountForm = ({ form, errors, setValue }: StepProps) => {
  const { register, control, watch } = form;
  
  // Watch form values
  const paidMethodValue = watch('paidMethod');
  const checkIn = watch('arrival');
  const checkOut = watch('departure');
  
  // Deposit fields
  const selectedDepositId = watch('selectedDepositId') || '';
  const depositAmount = watch('depositAmount') || 0;
  const depositPaymentMethod = watch('depositPaymentMethod') || '';
  const depositReceiptNumber = watch('depositReceiptNumber') || '';
  const depositIsNonRefundable = watch('depositIsNonRefundable') || false;
  
  // Card details
  const cardholderName = watch('cardholderName') || '';
  const cardNumber = watch('cardNumber') || '';
  const cardType = watch('cardType') || '';
  const expiryMonth = watch('expiryMonth') || '';
  const expiryYear = watch('expiryYear') || '';
  const cvv = watch('cvv') || '';
  
  // Company info
  const selectedCompanyId = watch('selectedCompanyId') || '';
  const companyName = watch('companyName') || '';
  const corporateAccountId = watch('corporateAccountId') || '';
  const companyAddress = watch('companyAddress') || '';
  const companyPhone = watch('companyPhone') || '';
  const companyEmail = watch('companyEmail') || '';
  const taxId = watch('taxId') || '';
  const billingContact = watch('billingContact') || '';
  
  // Membership
  const membershipProgramName = watch('membershipProgramName') || '';
  const membershipNumber = watch('membershipNumber') || '';
  const membershipTier = watch('membershipTier') || 'none';
  const membershipPointsBalance = watch('membershipPointsBalance') || 0;
  
  // Account notes
  const accountNotes = watch('accountNotes') || '';
  
  // Helper functions
  const formatCardNumber = (value: string) => {
    return value.replace(/(\d{4})/g, '$1 ').trim();
  };
  
  const maskCardNumber = (value: string) => {
    if (value.length < 4) return value;
    return '**** **** **** ' + value.slice(-4);
  };
  
  const handleDepositSelect = (deposit: typeof deposits[0]) => {
    setValue('selectedDepositId', String(deposit.id));
    setValue('depositAmount', deposit.amount);
    setValue('depositPaymentMethod', deposit.paymentMethod || '');
    setValue('depositReceiptNumber', String(deposit.id) || '');
  };
  
  const onAddNewDeposit = () => {
    // Logic to add new deposit
  };
  
  const handleCompanySelect = (company: typeof companies[0]) => {
    setValue('selectedCompanyId', String(company.id));
    setValue('companyName', company.name);
    setValue('corporateAccountId', company.corporateAccountId || '');
    setValue('companyAddress', company.address || '');
    setValue('companyPhone', company.phone || '');
    setValue('companyEmail', company.email || '');
    setValue('taxId', company.taxId || '');
    setValue('billingContact', company.billingContact || '');
  };
  
  const onAddNewCompany = () => {
    // Logic to add new company
  };
  
  const showCardInput = ['credit_card', 'debit_card'].includes(paidMethodValue || '');
  
  const loyaltyPrograms = ['Hilton Honors', 'Marriott Bonvoy', 'IHG Rewards', 'World of Hyatt'];
  const membershipTiers = [
    { value: 'none', label: 'No Membership', color: 'bg-gray-400' },
    { value: 'silver', label: 'Silver', color: 'bg-gray-300' },
    { value: 'gold', label: 'Gold', color: 'bg-yellow-500' },
    { value: 'platinum', label: 'Platinum', color: 'bg-blue-500' },
    { value: 'diamond', label: 'Diamond', color: 'bg-purple-500' }
  ];

  const isCard = useMemo(() => {
    if (!paidMethodValue) return false;
    return ['credit_card', 'debit_card'].includes(paidMethodValue);
  }, [paidMethodValue]);


  const { fields } = useFieldArray({
    control,
    name: "accommodation"
  });

  // Type cast fields to RoomReservation for proper typing
  const typedFields = fields as unknown as RoomReservation[];

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    if (nights <= 0) return 0;

    return typedFields.reduce((total, reservation) => {
      const room = rooms.find(r => r.id === reservation.roomId);
      return total + (room ? room.price * nights : 0);
    }, 0);
  };

  return (
    <CardForm className="mt-6" title="Account">
    <div className="space-y-6">
      {/* Deposit & Payment Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Deposit & Payment</h3>
        </div>

        {/* Deposit Combobox - like Company selection */}
        <div className="space-y-2">
          <Label>Select or Create Deposit</Label>
          <DepositCombobox
            deposits={deposits}
            guests={guests}
            selectedDepositId={selectedDepositId}
            onSelect={handleDepositSelect}
            onAddNew={onAddNewDeposit}
          />
        </div>

        {/* Selected Deposit Info */}
        {selectedDepositId && (
          <div className="bg-muted/50 p-3 rounded-lg text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-medium">${depositAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Method</span>
              <span className="font-medium capitalize">{depositPaymentMethod.replace('-', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Receipt</span>
              <span className="font-medium">{depositReceiptNumber}</span>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Checkbox
            id="nonRefundable"
            checked={depositIsNonRefundable}
            onCheckedChange={(checked) => setValue('depositIsNonRefundable', checked as boolean)}
          />
          <Label htmlFor="nonRefundable" className="text-sm font-normal cursor-pointer">
            Non-Refundable Deposit
          </Label>
        </div>
      </div>

      {/* Card Details Section - Conditional */}
      {showCardInput && (
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Card Details</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Card Type</Label>
              <Select 
                value={cardType} 
                onValueChange={(value) => setValue('cardType', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select card type" />
                </SelectTrigger>
                <SelectContent>
                  {cardTypeList.map((type) => (
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Card Number</Label>
              <Input
                value={formatCardNumber(cardNumber)}
                onChange={(e) => setValue('cardNumber', e.target.value.replace(/\D/g, '').slice(0, 16))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
              />
              {cardNumber && (
                <p className="text-xs text-muted-foreground">Masked: {maskCardNumber(cardNumber)}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Cardholder Name</Label>
            <Input
              value={cardholderName}
              onChange={(e) => setValue('cardholderName', e.target.value)}
              placeholder="JOHN SMITH"
              className="uppercase"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Expiry Month</Label>
              <Select 
                value={expiryMonth} 
                onValueChange={(value) => setValue('expiryMonth', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => {
                    const month = (i + 1).toString().padStart(2, '0');
                    return <SelectItem key={month} value={month}>{month}</SelectItem>;
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Expiry Year</Label>
              <Select 
                value={expiryYear} 
                onValueChange={(value) => setValue('expiryYear', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="YY" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => {
                    const year = (new Date().getFullYear() + i).toString().slice(-2);
                    return <SelectItem key={year} value={year}>{year}</SelectItem>;
                  })}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="flex items-center gap-1 cursor-help">
                CVV
              </Label>
              <Input
                type="password"
                value={cvv}
                onChange={(e) => setValue('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="***"
                maxLength={4}
              />
            </div>
          </div>
        </div>
      )}

      {/* Company Information Section */}
      <div className="space-y-4 pt-4 border-t">
        <div className="flex items-center gap-2">
          <Building2 className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Company Information</h3>
        </div>
        
        {/* Company Selection Combobox */}
        <div className="space-y-2">
          <Label>Select Company</Label>
          <CompanyCombobox
            companies={companies}
            selectedCompanyId={selectedCompanyId}
            onSelect={handleCompanySelect}
            onAddNew={onAddNewCompany}
          />
          {selectedCompanyId && (
            <p className="text-xs text-muted-foreground">
              Fields below are auto-filled from company profile. You can still edit them for this reservation.
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Company Name</Label>
            <Input
              value={companyName}
              onChange={(e) => setValue('companyName', e.target.value)}
              placeholder="Acme Corporation"
            />
          </div>
          <div className="space-y-2">
            <Label>Corporate Account ID</Label>
            <Input
              value={corporateAccountId}
              onChange={(e) => setValue('corporateAccountId', e.target.value)}
              placeholder="CORP-001"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Company Address</Label>
          <Textarea
            name="companyAddress"
            value={companyAddress}
            onChange={(e) => setValue('companyAddress', e.target.value)}
            placeholder="123 Business Street, City, Country"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Company Phone</Label>
            <Input
              name="companyPhone"
              value={companyPhone}
              onChange={(e) => setValue('companyPhone', e.target.value)}
              placeholder="+1 555-0100"
            />
          </div>
          <div className="space-y-2">
            <Label>Company Email</Label>
            <Input
              type="email"
              value={companyEmail}
              onChange={(e) => setValue('companyEmail', e.target.value)}
              placeholder="billing@company.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Tax ID / VAT Number</Label>
            <Input
              value={taxId}
              onChange={(e) => setValue('taxId', e.target.value)}
              placeholder="TX-123456789"
            />
          </div>
          <div className="space-y-2">
            <Label>Billing Contact</Label>
            <Input
              value={billingContact}
              onChange={(e) => setValue('billingContact', e.target.value)}
              placeholder="Jane Doe"
            />
          </div>
        </div>
      </div>

      {/* Membership Section */}
      <div className="space-y-4 pt-4 border-t">
        <div className="flex items-center gap-2">
          <Crown className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Membership</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Loyalty Program</Label>
            <Select 
              value={membershipProgramName} 
              onValueChange={(value) => setValue('membershipProgramName', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select program" />
              </SelectTrigger>
              <SelectContent>
                {loyaltyPrograms.map((program) => (
                  <SelectItem key={program} value={program}>{program}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Member Number</Label>
            <Input
              value={membershipNumber}
              onChange={(e) => setValue('membershipNumber', e.target.value)}
              placeholder="HH-12345678"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Membership Tier</Label>
            <Select 
              value={membershipTier} 
              onValueChange={(value) => setValue('membershipTier', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select tier" />
              </SelectTrigger>
              <SelectContent>
                {membershipTiers.map((tier) => (
                  <SelectItem key={tier.value} value={tier.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${tier.color}`} />
                      {tier.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Points Balance</Label>
            <Input
              type="number"
              value={membershipPointsBalance || ''}
              onChange={(e) => setValue('membershipPointsBalance', parseInt(e.target.value) || 0)}
              placeholder="0"
            />
            {membershipTier !== 'none' && membershipPointsBalance > 0 && (
              <p className="text-xs text-muted-foreground">{membershipPointsBalance.toLocaleString()} pts available</p>
            )}
          </div>
        </div>

        {membershipTier !== 'none' && (
          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${membershipTiers.find(t => t.value === membershipTier)?.color} text-white`}>
              <Crown className="h-3 w-3 mr-1" />
              {membershipTiers.find(t => t.value === membershipTier)?.label} Member
            </span>
            {membershipProgramName && (
              <span className="text-sm text-muted-foreground">• {membershipProgramName}</span>
            )}
          </div>
        )}
      </div>

      {/* Account Notes */}
      <div className="space-y-4 pt-4 border-t">
        <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Account Notes</h3>
        <Textarea
          name="accountNotes"
          value={accountNotes}
          onChange={(e) => setValue('accountNotes', e.target.value)}
          placeholder="Billing notes, payment arrangements, special instructions..."
          rows={3}
        />
      </div>

      {/* Payment Summary */}
      <div className="bg-muted p-4 rounded-lg">
        <h4 className="font-medium mb-3">Payment Summary</h4>
        <div className="space-y-1 text-sm">
          {typedFields.filter(r => r.roomId).map((res, idx) => {
            const room = rooms.find(r => r.id === res.roomId);
            return (
              <div key={res.id} className="flex justify-between">
                <span>Room {idx + 1} ({room?.number})</span>
                <span>${room?.price || 0}/night</span>
              </div>
            );
          })}
          <div className="flex justify-between pt-2 border-t mt-2">
            <span>Nights</span>
            <span>
              {checkIn && checkOut 
                ? Math.max(0, Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)))
                : 0}
            </span>
          </div>
          <div className="flex justify-between font-bold text-base pt-2 border-t">
            <span>Total</span>
            <span>${calculateTotal().toLocaleString()}</span>
          </div>
          {depositAmount > 0 && (
            <>
              <div className="flex justify-between text-success">
                <span>Deposit Received</span>
                <span>-${depositAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2 border-t">
                <span>Balance Due</span>
                <span>${(calculateTotal() - depositAmount).toLocaleString()}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    </CardForm>
  );
};