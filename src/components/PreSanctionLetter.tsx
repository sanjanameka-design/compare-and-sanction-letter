import { Lender } from '@/data/lenders';
import { Button } from '@/components/ui/button';
import { Download, FileText, CheckCircle, ArrowLeft } from 'lucide-react';

interface PreSanctionLetterProps {
  lender: Lender;
  loanType: string;
  onBack: () => void;
}

export const PreSanctionLetter = ({ lender, loanType, onBack }: PreSanctionLetterProps) => {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const referenceNumber = `PSL/${lender.logo.toUpperCase()}/${Date.now().toString().slice(-8)}`;
  
  const getLoanTypeName = (type: string) => {
    const types: Record<string, string> = {
      personal: 'Personal Loan',
      home: 'Home Loan',
      car: 'Car Loan',
      education: 'Education Loan',
      business: 'Business Loan',
    };
    return types[type] || 'Personal Loan';
  };

  const estimatedAmount = Math.round(lender.maxSanctionAmount * 0.85);

  return (
    <div className="animate-slide-up max-w-3xl mx-auto">
      <Button variant="ghost" onClick={onBack} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Comparison
      </Button>

      <div className="card-elevated p-8 md:p-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-8 pb-6 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-navy text-primary-foreground rounded-xl flex items-center justify-center font-bold text-lg">
              {lender.logo.slice(0, 4)}
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-navy">{lender.name}</h2>
              <p className="text-muted-foreground">{lender.type}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="approval-badge mb-2">
              <CheckCircle className="w-3.5 h-3.5 mr-1" />
              Pre-Approved
            </div>
            <p className="text-xs text-muted-foreground">Ref: {referenceNumber}</p>
          </div>
        </div>

        {/* Letter Content */}
        <div className="space-y-6">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Date:</span>
            <span className="font-medium">{currentDate}</span>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold mb-2">
              Estimated Pre-Sanction Approval Letter
            </h3>
            <p className="text-muted-foreground">
              For {getLoanTypeName(loanType)}
            </p>
          </div>

          <div className="bg-approval-light rounded-xl p-6 border border-approval/20">
            <div className="text-center">
              <p className="text-sm text-approval mb-2">Estimated Sanction Amount</p>
              <p className="font-display text-4xl font-bold text-approval">
                ₹{(estimatedAmount / 100000).toFixed(2)} Lakhs
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Interest Rate (APR)</p>
              <p className="font-bold text-lg">{lender.trueAPR}% p.a.</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Tenure Options</p>
              <p className="font-bold text-lg">{lender.tenureOptions}</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Processing Fee</p>
              <p className="font-bold text-lg">{lender.processingFee}</p>
            </div>
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-xs text-muted-foreground mb-1">Expected Disbursal</p>
              <p className="font-bold text-lg">{lender.disbursalTime}</p>
            </div>
          </div>

          <div className="bg-gold-light rounded-xl p-5 border border-gold/20">
            <h4 className="font-semibold text-gold mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Terms & Conditions
            </h4>
            <ul className="text-sm space-y-2 text-foreground/80">
              <li>• This is an estimated pre-sanction letter based on preliminary assessment</li>
              <li>• Final sanction amount may vary based on document verification</li>
              <li>• Pre-payment charges: {lender.prepaymentCharges}</li>
              <li>• Valid for 30 days from the date of issue</li>
              <li>• Subject to standard terms and conditions of {lender.name}</li>
            </ul>
          </div>

          <div className="pt-6 border-t border-border">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
              <span>Approval Probability:</span>
              <span className="font-bold text-approval">{lender.approvalProbability}%</span>
            </div>
            
            <div className="flex gap-4">
              <Button className="flex-1 gradient-primary hover:opacity-90">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" className="flex-1">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-6">
        This is an estimated pre-sanction letter for informational purposes only. 
        Actual loan approval is subject to verification and lender's discretion.
      </p>
    </div>
  );
};
