import { loanTypes } from '@/data/lenders';
import { cn } from '@/lib/utils';

interface LoanTypeSelectorProps {
  selectedType: string;
  onSelect: (type: string) => void;
}

export const LoanTypeSelector = ({ selectedType, onSelect }: LoanTypeSelectorProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {loanTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => onSelect(type.id)}
          className={cn(
            'flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300',
            'border-2',
            selectedType === type.id
              ? 'bg-primary text-primary-foreground border-primary shadow-lg scale-105'
              : 'bg-card text-foreground border-border hover:border-primary/50 hover:bg-secondary'
          )}
        >
          <span className="text-xl">{type.icon}</span>
          <span>{type.name}</span>
        </button>
      ))}
    </div>
  );
};
