import { useState } from 'react';
import { lenders, Lender } from '@/data/lenders';
import { LenderCard } from '@/components/LenderCard';
import { ComparisonTable } from '@/components/ComparisonTable';
import { DetailedComparison } from '@/components/DetailedComparison';
import { PreSanctionLetter } from '@/components/PreSanctionLetter';
import { ProvisionalSanctionLetter } from '@/components/ProvisionalSanctionLetter';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { LayoutGrid, Table, ArrowRight, X, Shield, Zap, Award, FileText, GitCompare } from 'lucide-react';

type ViewMode = 'grid' | 'table';
type Stage = 'compare' | 'detailed' | 'letter' | 'psl';
type MainTab = 'compare' | 'psl';

const Index = () => {
  const [selectedLoanType, setSelectedLoanType] = useState('personal');
  const [selectedLenders, setSelectedLenders] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [stage, setStage] = useState<Stage>('compare');
  const [mainTab, setMainTab] = useState<MainTab>('compare');
  const [selectedForLetter, setSelectedForLetter] = useState<Lender | null>(null);

  const handleSelectLender = (id: string) => {
    if (selectedLenders.includes(id)) {
      setSelectedLenders(selectedLenders.filter((l) => l !== id));
    } else if (selectedLenders.length < 2) {
      setSelectedLenders([...selectedLenders, id]);
    }
  };

  const handleCompare = () => {
    if (selectedLenders.length === 2) {
      setStage('detailed');
    }
  };

  const handleSelectForLetter = (lender: Lender) => {
    setSelectedForLetter(lender);
    setStage('letter');
  };

  const handleApplyNow = (lender: Lender) => {
    setSelectedForLetter(lender);
    setStage('letter');
  };

  const handleBackToCompare = () => {
    setStage('compare');
    setSelectedForLetter(null);
  };

  const handleBackToDetailed = () => {
    setStage('detailed');
    setSelectedForLetter(null);
  };

  const handleOpenPSL = () => {
    setStage('psl');
  };

  const handleClosePSL = () => {
    setStage('compare');
  };

  const selectedLenderObjects = lenders.filter((l) => selectedLenders.includes(l.id));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="gradient-hero text-primary-foreground py-16 md:py-20">
        <div className="container max-w-6xl">
          <div className="text-center animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-trust/20 text-trust-light px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Trusted by 50,000+ borrowers
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Compare Loans.<br />
              <span className="text-trust-light">Save Thousands.</span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Compare offers from 10+ top banks & NBFCs. Get the best rates, 
              fastest approval, and lowest fees.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-gold" />
                <span>Instant comparison</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-gold" />
                <span>Pre-approval in minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-gold" />
                <span>100% secure</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-6xl py-10 md:py-14">
        {/* Main Tabs - Only show when not in detailed/letter views */}
        {(stage === 'compare' || stage === 'psl') && (
          <div className="flex justify-center mb-8">
            <div className="flex bg-secondary rounded-xl p-1.5 gap-1">
              <button
                onClick={() => setStage('compare')}
                className={cn(
                  'flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold transition-all',
                  stage === 'compare'
                    ? 'bg-card shadow-md text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <GitCompare className="w-4 h-4" />
                Compare Lenders
              </button>
              <button
                onClick={handleOpenPSL}
                className={cn(
                  'flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold transition-all',
                  stage === 'psl'
                    ? 'bg-card shadow-md text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <FileText className="w-4 h-4" />
                Provisional Sanction Letter
              </button>
            </div>
          </div>
        )}

        {stage === 'compare' && (
          <div className="animate-fade-in">

            {/* View Toggle & Selection Info */}
            <section className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <h2 className="font-display text-xl font-bold">
                  Compare {lenders.length} Lenders
                </h2>
                {selectedLenders.length > 0 && (
                  <span className="trust-badge">
                    {selectedLenders.length}/2 selected
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex bg-secondary rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all',
                      viewMode === 'grid'
                        ? 'bg-card shadow-sm text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <LayoutGrid className="w-4 h-4" />
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all',
                      viewMode === 'table'
                        ? 'bg-card shadow-sm text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                  >
                    <Table className="w-4 h-4" />
                    Table
                  </button>
                </div>
                {selectedLenders.length === 2 && (
                  <Button onClick={handleCompare} className="gradient-primary hover:opacity-90">
                    Compare Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </section>

            {/* Selected Lenders Chips */}
            {selectedLenders.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedLenderObjects.map((lender) => (
                  <div
                    key={lender.id}
                    className="inline-flex items-center gap-2 bg-trust-light text-trust px-3 py-1.5 rounded-full text-sm font-medium"
                  >
                    {lender.name}
                    <button
                      onClick={() => handleSelectLender(lender.id)}
                      className="hover:bg-trust/20 rounded-full p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Lenders Display */}
            {viewMode === 'grid' ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {lenders.map((lender) => (
                  <LenderCard
                    key={lender.id}
                    lender={lender}
                    isSelected={selectedLenders.includes(lender.id)}
                    onSelect={handleSelectLender}
                    disabled={
                      selectedLenders.length >= 2 &&
                      !selectedLenders.includes(lender.id)
                    }
                    onApplyNow={handleApplyNow}
                  />
                ))}
              </div>
            ) : (
              <div className="card-elevated overflow-hidden">
                <ComparisonTable
                  lenders={lenders}
                  selectedLenders={selectedLenders}
                  onSelectLender={handleSelectLender}
                  onApplyNow={handleApplyNow}
                />
              </div>
            )}

            {/* Help Text */}
            <p className="text-center text-muted-foreground text-sm mt-8">
              Select any 2 lenders to compare, or click "Apply Now" to get a pre-sanction letter directly
            </p>
          </div>
        )}

        {stage === 'psl' && (
          <ProvisionalSanctionLetter
            onClose={handleClosePSL}
            onApplyNow={handleApplyNow}
          />
        )}

        {stage === 'detailed' && selectedLenderObjects.length === 2 && (
          <div>
            <Button variant="ghost" onClick={handleBackToCompare} className="mb-6">
              ← Back to all lenders
            </Button>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-center mb-8">
              Side-by-Side Comparison
            </h2>
            <DetailedComparison
              lender1={selectedLenderObjects[0]}
              lender2={selectedLenderObjects[1]}
              onSelectForLetter={handleSelectForLetter}
            />
          </div>
        )}

        {stage === 'letter' && selectedForLetter && (
          <PreSanctionLetter
            lender={selectedForLetter}
            loanType={selectedLoanType}
            onBack={handleBackToCompare}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-navy text-primary-foreground/70 py-10">
        <div className="container max-w-6xl text-center">
          <p className="text-sm">
            © 2026 Happirate. All loan offers are subject to lender terms and conditions.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
