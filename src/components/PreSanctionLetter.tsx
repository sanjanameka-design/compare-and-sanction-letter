import { useState } from 'react';
import { Lender } from '@/data/lenders';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Download, 
  FileText, 
  CheckCircle, 
  ArrowLeft,
  Shield,
  Clock,
  AlertCircle,
  CreditCard,
  Calendar,
  Percent,
  Building2,
  User,
  Hash,
  CalendarDays,
  IndianRupee,
  Timer,
  TrendingUp,
  Wallet,
  Receipt,
  ShieldCheck,
  Info,
  XCircle
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PreSanctionLetterProps {
  lender: Lender;
  loanType: string;
  onBack: () => void;
}

export const PreSanctionLetter = ({ lender, loanType, onBack }: PreSanctionLetterProps) => {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const currentDate = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const referenceNumber = `HPR/${lender.logo.toUpperCase()}/${Date.now().toString().slice(-8)}`;
  
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
  const processingFeeAmount = Math.round(estimatedAmount * 0.015);
  const insuranceAmount = Math.round(estimatedAmount * 0.005);
  const thirdPartyCharges = 500;
  const netDisbursalAmount = estimatedAmount - processingFeeAmount - insuranceAmount - thirdPartyCharges;
  const totalCostOfCredit = processingFeeAmount + insuranceAmount + thirdPartyCharges + Math.round(estimatedAmount * (lender.trueAPR / 100) * 3);
  
  // EMI calculation (simplified)
  const tenure = 36; // months
  const monthlyRate = lender.trueAPR / 12 / 100;
  const emi = Math.round((estimatedAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1));

  const handleAccept = () => {
    setShowSuccessDialog(true);
  };

  const handleRedirectToDashboard = () => {
    setShowSuccessDialog(false);
    // In a real app, this would navigate to the loan tracking dashboard
    onBack();
  };

  return (
    <div className="animate-slide-up max-w-4xl mx-auto pb-8">
      <Button variant="ghost" onClick={onBack} className="mb-6 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Comparison
      </Button>

      {/* Main Letter Card */}
      <Card className="border-0 shadow-xl bg-card overflow-hidden">
        {/* Header Section */}
        <CardHeader className="bg-gradient-to-r from-navy via-navy-light to-navy p-6 md:p-8 text-white">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="w-5 h-5 text-gold" />
            <span className="text-gold font-medium text-sm uppercase tracking-wide">
              Estimated Pre-Sanction Approval Letter
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center font-bold text-lg border border-white/20">
                {lender.logo.slice(0, 4)}
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold">{lender.name}</h2>
                <p className="text-white/70 text-sm">{lender.type}</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-2 text-sm md:text-right">
              <div className="flex items-center gap-2 md:justify-end">
                <User className="w-4 h-4 text-white/60" />
                <span className="text-white/80">Applicant:</span>
                <span className="font-medium">[Applicant Name]</span>
              </div>
              <div className="flex items-center gap-2 md:justify-end">
                <Hash className="w-4 h-4 text-white/60" />
                <span className="text-white/80">Ref ID:</span>
                <span className="font-mono text-xs bg-white/10 px-2 py-0.5 rounded">{referenceNumber}</span>
              </div>
              <div className="flex items-center gap-2 md:justify-end">
                <CalendarDays className="w-4 h-4 text-white/60" />
                <span className="text-white/80">Date:</span>
                <span className="font-medium">{currentDate}</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 md:p-8 space-y-6">
          {/* Loan Details Section */}
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Loan Details — {getLoanTypeName(loanType)}
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-approval-light to-white rounded-xl p-4 border border-approval/20">
                <div className="flex items-center gap-2 mb-2">
                  <IndianRupee className="w-4 h-4 text-approval" />
                  <p className="text-xs text-muted-foreground">Est. Sanction Amount</p>
                </div>
                <p className="font-display text-xl font-bold text-approval">
                  Up to ₹{(estimatedAmount / 100000).toFixed(2)}L
                </p>
              </div>
              
              <div className="bg-secondary/50 rounded-xl p-4 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Percent className="w-4 h-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Interest Rate (APR)</p>
                </div>
                <p className="font-bold text-lg">{lender.trueAPR}% – {lender.trueAPRMax}%</p>
              </div>
              
              <div className="bg-secondary/50 rounded-xl p-4 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Tenure Options</p>
                </div>
                <p className="font-bold text-lg">{lender.tenureOptions}</p>
              </div>
              
              <div className="bg-secondary/50 rounded-xl p-4 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Receipt className="w-4 h-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Processing Fee</p>
                </div>
                <p className="font-bold text-lg">{lender.processingFeeMin}% – {lender.processingFeeMax}%</p>
              </div>
              
              <div className="bg-secondary/50 rounded-xl p-4 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Timer className="w-4 h-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Expected Disbursal</p>
                </div>
                <p className="font-bold text-lg">{lender.disbursalTime}</p>
              </div>
              
              <div className="bg-secondary/50 rounded-xl p-4 border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <p className="text-xs text-muted-foreground">Approval Probability</p>
                </div>
                <p className="font-bold text-lg text-approval">{lender.approvalProbability}%</p>
              </div>
              
              <div className="bg-gradient-to-br from-gold-light to-white rounded-xl p-4 border border-gold/20 col-span-2 md:col-span-1">
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="w-4 h-4 text-gold" />
                  <p className="text-xs text-muted-foreground">Estimated EMI</p>
                </div>
                <p className="font-display text-xl font-bold text-gold">
                  ₹{emi.toLocaleString('en-IN')}/mo
                </p>
              </div>
            </div>
          </div>

          {/* KFS Section */}
          <div className="bg-gradient-to-br from-navy/5 to-transparent rounded-2xl p-6 border-2 border-navy/10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-navy" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-navy">
                  Key Fact Statement (KFS)
                </h3>
                <p className="text-xs text-muted-foreground">As per RBI Regulatory Framework</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-dashed border-navy/10">
                  <span className="text-sm text-muted-foreground">Annual Percentage Rate (APR)</span>
                  <span className="font-bold text-navy">{lender.trueAPR}% – {lender.trueAPRMax}%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-dashed border-navy/10">
                  <span className="text-sm text-muted-foreground">Total Cost of Credit</span>
                  <span className="font-bold">₹{totalCostOfCredit.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-dashed border-navy/10">
                  <span className="text-sm text-muted-foreground">Processing & Other Charges</span>
                  <span className="font-medium">₹{processingFeeAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-dashed border-navy/10">
                  <span className="text-sm text-muted-foreground">Insurance (if applicable)</span>
                  <span className="font-medium">₹{insuranceAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-dashed border-navy/10">
                  <span className="text-sm text-muted-foreground">Third-Party/Verification Charges</span>
                  <span className="font-medium">₹{thirdPartyCharges.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-dashed border-navy/10">
                  <span className="text-sm text-muted-foreground">Net Disbursal Amount</span>
                  <span className="font-bold text-approval">₹{netDisbursalAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-dashed border-navy/10">
                  <span className="text-sm text-muted-foreground">Repayment Mode</span>
                  <span className="font-medium">NACH / Auto-Debit</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-dashed border-navy/10">
                  <span className="text-sm text-muted-foreground">EMI Date</span>
                  <span className="font-medium">5th of every month</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-navy/5 rounded-lg border border-navy/10">
              <p className="text-sm font-semibold text-navy">
                <Info className="w-4 h-4 inline mr-2" />
                Total cost of credit includes interest, processing fees, insurance charges, and any third-party charges.
              </p>
            </div>
          </div>

          {/* Cooling-Off Period Section */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-2xl p-6 border-2 border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-display font-bold text-amber-800 dark:text-amber-300 mb-2">
                  Cooling-Off / Look-Up Period
                </h4>
                <p className="text-sm text-amber-700 dark:text-amber-400 mb-4">
                  As per RBI guidelines, borrowers shall have a <strong>7-day cooling-off period</strong> to exit the loan 
                  by repaying principal plus proportionate APR without penalty.
                </p>
                <Button 
                  variant="outline" 
                  className="border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900/50"
                  disabled
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Exit Loan During Cooling-Off
                </Button>
                <p className="text-xs text-amber-600 dark:text-amber-500 mt-2">
                  This option will be available after loan disbursal.
                </p>
              </div>
            </div>
          </div>

          {/* Terms & Conditions Section */}
          <div className="bg-secondary/30 rounded-xl p-5 border border-border">
            <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-muted-foreground" />
              Terms & Conditions
            </h4>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                Subject to final credit underwriting and approval
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                Subject to KYC validation and document verification
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                Sanction amount may vary during final approval stage
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                APR and KFS values are estimated and subject to final confirmation
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                Pre-payment charges: {lender.prepaymentCharges}
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                Borrowers shall have a 7-day cooling-off period to exit the loan by repaying principal plus proportionate APR without penalty
              </li>
            </ul>
          </div>

          {/* Footer CTAs */}
          <div className="pt-4 border-t border-border">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                className="flex-1 h-12 text-base font-semibold bg-gradient-to-r from-navy to-navy-light hover:opacity-90 transition-opacity"
                onClick={handleAccept}
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Accept & Continue to Final Sanction
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 h-12 text-base border-2"
              >
                <Download className="w-5 h-5 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Happirate Branding */}
      <div className="text-center mt-6">
        <div className="inline-flex items-center gap-2 mb-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-navy to-navy-light flex items-center justify-center">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-navy">Happirate</span>
        </div>
        <p className="text-xs text-muted-foreground max-w-md mx-auto">
          This is an estimated pre-sanction letter for informational purposes only. 
          Actual loan approval is subject to verification and lender's discretion.
        </p>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-approval-light to-approval/20 flex items-center justify-center mb-4">
              <ShieldCheck className="w-8 h-8 text-approval" />
            </div>
            <DialogTitle className="font-display text-2xl text-center">
              Offer Accepted! 🎉
            </DialogTitle>
            <DialogDescription className="text-center text-base pt-2">
              Your loan has been provisionally sanctioned and is now moving to the 
              <strong className="text-foreground"> Final Sanction & Agreement</strong> stage.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-secondary/50 rounded-xl p-4 mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Loan Amount</span>
              <span className="font-bold">₹{(estimatedAmount / 100000).toFixed(2)} Lakhs</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-muted-foreground">Lender</span>
              <span className="font-medium">{lender.name}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-muted-foreground">Reference</span>
              <span className="font-mono text-xs">{referenceNumber}</span>
            </div>
          </div>
          
          <Button 
            className="w-full mt-4 h-11 bg-gradient-to-r from-navy to-navy-light hover:opacity-90"
            onClick={handleRedirectToDashboard}
          >
            Go to Loan Tracking Dashboard
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
