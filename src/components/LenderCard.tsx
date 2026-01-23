import { Lender } from '@/data/lenders';
import { cn } from '@/lib/utils';
import { Check, Clock, Percent, CreditCard, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

interface LenderCardProps {
  lender: Lender;
  isSelected: boolean;
  onSelect: (id: string) => void;
  disabled: boolean;
}

export const LenderCard = ({ lender, isSelected, onSelect, disabled }: LenderCardProps) => {
  const getApprovalColor = (probability: number) => {
    if (probability >= 90) return 'text-approval';
    if (probability >= 80) return 'text-trust';
    return 'text-warning';
  };

  const getApprovalBadge = (probability: number) => {
    if (probability >= 90) return 'approval-badge';
    if (probability >= 80) return 'trust-badge';
    return 'warning-badge';
  };

  return (
    <div
      className={cn(
        'card-elevated p-5 cursor-pointer transition-all duration-300',
        isSelected && 'ring-2 ring-primary bg-trust-light',
        disabled && !isSelected && 'opacity-50 cursor-not-allowed'
      )}
      onClick={() => !disabled && onSelect(lender.id)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm',
            lender.type === 'Bank' ? 'bg-navy text-primary-foreground' : 'bg-trust text-primary-foreground'
          )}>
            {lender.logo.slice(0, 4)}
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground">{lender.name}</h3>
            <span className={cn(
              'text-xs px-2 py-0.5 rounded-full',
              lender.type === 'Bank' ? 'bg-navy/10 text-navy' : 'bg-trust/10 text-trust'
            )}>
              {lender.type}
            </span>
          </div>
        </div>
        <div className={cn(
          'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
          isSelected ? 'bg-primary border-primary' : 'border-border'
        )}>
          {isSelected && <Check className="w-4 h-4 text-primary-foreground" />}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-secondary/50 rounded-lg p-3">
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1">
            <CreditCard className="w-3.5 h-3.5" />
            Est. Sanction
          </div>
          <div className="font-semibold text-foreground">
            Up to ₹{(lender.maxSanctionAmount / 100000).toFixed(0)}L
          </div>
        </div>
        <div className="bg-secondary/50 rounded-lg p-3">
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-1">
            <Percent className="w-3.5 h-3.5" />
            True APR
          </div>
          <div className="font-semibold text-foreground">{lender.trueAPR}% – {lender.trueAPRMax}%</div>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2.5 text-sm">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            Tenure
          </span>
          <span className="font-medium">{lender.tenureOptions}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <AlertCircle className="w-3.5 h-3.5" />
            Processing Fee
          </span>
          <span className="font-medium">{lender.processingFeeMin}% – {lender.processingFeeMax}%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <TrendingUp className="w-3.5 h-3.5" />
            Approval
          </span>
          <span className={cn('font-semibold', getApprovalColor(lender.approvalProbability))}>
            {lender.approvalProbability}%
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            Disbursal
          </span>
          <span className="font-medium">{lender.disbursalTime}</span>
        </div>
      </div>

      {/* Approval Badge */}
      <div className="mt-4 pt-3 border-t border-border">
        <span className={getApprovalBadge(lender.approvalProbability)}>
          {lender.approvalProbability >= 90 ? 'High Approval' : lender.approvalProbability >= 80 ? 'Good Match' : 'Fair Match'}
        </span>
      </div>
    </div>
  );
};
