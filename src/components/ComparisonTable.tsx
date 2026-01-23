import { Lender } from '@/data/lenders';
import { cn } from '@/lib/utils';
import { Check, TrendingUp, Clock, CreditCard, Percent, Calendar, AlertCircle, Banknote } from 'lucide-react';

interface ComparisonTableProps {
  lenders: Lender[];
  selectedLenders: string[];
  onSelectLender: (id: string) => void;
}

export const ComparisonTable = ({ lenders, selectedLenders, onSelectLender }: ComparisonTableProps) => {
  const isDisabled = (id: string) => selectedLenders.length >= 2 && !selectedLenders.includes(id);

  const getApprovalColor = (probability: number) => {
    if (probability >= 90) return 'text-approval font-semibold';
    if (probability >= 80) return 'text-trust font-semibold';
    return 'text-warning font-semibold';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-navy text-primary-foreground">
            <th className="sticky left-0 bg-navy z-10 px-4 py-4 text-left font-semibold rounded-tl-xl">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                Select
              </div>
            </th>
            <th className="px-4 py-4 text-left font-semibold">Lender</th>
            <th className="px-4 py-4 text-left font-semibold">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Max Amount
              </div>
            </th>
            <th className="px-4 py-4 text-left font-semibold">
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4" />
                True APR
              </div>
            </th>
            <th className="px-4 py-4 text-left font-semibold">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Tenure
              </div>
            </th>
            <th className="px-4 py-4 text-left font-semibold">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Processing Fee
              </div>
            </th>
            <th className="px-4 py-4 text-left font-semibold">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Approval
              </div>
            </th>
            <th className="px-4 py-4 text-left font-semibold">
              <div className="flex items-center gap-2">
                <Banknote className="w-4 h-4" />
                Pre-Payment
              </div>
            </th>
            <th className="px-4 py-4 text-left font-semibold rounded-tr-xl">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Disbursal
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {lenders.map((lender, index) => (
            <tr
              key={lender.id}
              className={cn(
                'transition-all duration-200 cursor-pointer group',
                selectedLenders.includes(lender.id)
                  ? 'bg-trust-light'
                  : index % 2 === 0
                  ? 'bg-card'
                  : 'bg-secondary/30',
                isDisabled(lender.id) && 'opacity-50 cursor-not-allowed',
                !isDisabled(lender.id) && 'hover:bg-trust-light/50'
              )}
              onClick={() => !isDisabled(lender.id) && onSelectLender(lender.id)}
            >
              <td className={cn(
                'sticky left-0 z-10 px-4 py-4',
                selectedLenders.includes(lender.id) ? 'bg-trust-light' : index % 2 === 0 ? 'bg-card' : 'bg-secondary/30',
                !isDisabled(lender.id) && 'group-hover:bg-trust-light/50'
              )}>
                <div className={cn(
                  'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
                  selectedLenders.includes(lender.id) ? 'bg-primary border-primary' : 'border-border'
                )}>
                  {selectedLenders.includes(lender.id) && <Check className="w-4 h-4 text-primary-foreground" />}
                </div>
              </td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs',
                    lender.type === 'Bank' ? 'bg-navy text-primary-foreground' : 'bg-trust text-primary-foreground'
                  )}>
                    {lender.logo.slice(0, 3)}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{lender.name}</div>
                    <div className="text-xs text-muted-foreground">{lender.type}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 font-semibold">Up to ₹{(lender.maxSanctionAmount / 100000).toFixed(0)}L</td>
              <td className="px-4 py-4 font-semibold">{lender.trueAPR}% – {lender.trueAPRMax}%</td>
              <td className="px-4 py-4">{lender.tenureOptions}</td>
              <td className="px-4 py-4">{lender.processingFeeMin}% – {lender.processingFeeMax}%</td>
              <td className={cn('px-4 py-4', getApprovalColor(lender.approvalProbability))}>
                {lender.approvalProbability}%
              </td>
              <td className="px-4 py-4 text-sm">{lender.prepaymentCharges}</td>
              <td className="px-4 py-4">{lender.disbursalTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
