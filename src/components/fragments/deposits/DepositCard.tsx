import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  DollarSign, 
  Banknote, 
  CreditCard, 
  Building, 
  Wallet,
  CheckCircle,
  Clock,
  RefreshCcw,
  XCircle
} from 'lucide-react';
import { Deposit, DepositStatus, PaymentMethod } from '@/types/hotel';
import { format } from 'date-fns';

const statusConfig: Record<DepositStatus, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: React.ElementType }> = {
  pending: { label: 'Pending', variant: 'outline', icon: Clock },
  received: { label: 'Received', variant: 'secondary', icon: CheckCircle },
  applied: { label: 'Applied', variant: 'default', icon: CheckCircle },
  refunded: { label: 'Refunded', variant: 'outline', icon: RefreshCcw },
  forfeited: { label: 'Forfeited', variant: 'destructive', icon: XCircle },
};

const paymentMethodConfig: Record<PaymentMethod, { label: string; icon: React.ElementType }> = {
  cash: { label: 'Cash', icon: Banknote },
  'credit-card': { label: 'Credit Card', icon: CreditCard },
  'debit-card': { label: 'Debit Card', icon: CreditCard },
  'bank-transfer': { label: 'Bank Transfer', icon: Building },
  online: { label: 'Online', icon: Wallet },
};

interface DepositCardProps {
  deposit: Deposit;
  onReceive?: () => void;
  onApply?: () => void;
  onRefund?: () => void;
  compact?: boolean;
}

export function DepositCard({ 
  deposit, 
  onReceive, 
  onApply, 
  onRefund,
  compact = false 
}: DepositCardProps) {
  const statusInfo = statusConfig[deposit.status];
  const paymentInfo = paymentMethodConfig[deposit.paymentMethod];
  const StatusIcon = statusInfo.icon;
  const PaymentIcon = paymentInfo.icon;

  if (compact) {
    return (
      <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">${deposit.amount.toLocaleString()}</span>
          <Badge variant={statusInfo.variant} className="text-xs">
            <StatusIcon className="h-3 w-3 mr-1" />
            {statusInfo.label}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <PaymentIcon className="h-3 w-3" />
          {paymentInfo.label}
        </div>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-primary/10 rounded-full">
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="font-semibold">${deposit.amount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">{deposit.id}</p>
          </div>
        </div>
        <Badge variant={statusInfo.variant}>
          <StatusIcon className="h-3 w-3 mr-1" />
          {statusInfo.label}
        </Badge>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <PaymentIcon className="h-4 w-4" />
          <span>{paymentInfo.label}</span>
        </div>
        {deposit.receivedAt && (
          <span>
            {format(new Date(deposit.receivedAt), 'MMM dd, yyyy')}
          </span>
        )}
      </div>

      {deposit.notes && (
        <p className="text-sm text-muted-foreground bg-muted/50 p-2 rounded">
          {deposit.notes}
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        {deposit.status === 'pending' && onReceive && (
          <Button size="sm" variant="outline" onClick={onReceive}>
            <CheckCircle className="h-3 w-3 mr-1" />
            Receive
          </Button>
        )}
        {deposit.status === 'received' && (
          <>
            {onApply && (
              <Button size="sm" variant="outline" onClick={onApply}>
                Apply
              </Button>
            )}
            {onRefund && (
              <Button size="sm" variant="ghost" onClick={onRefund}>
                Refund
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
