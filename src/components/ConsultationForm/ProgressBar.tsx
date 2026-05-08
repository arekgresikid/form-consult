import React from 'react';
import { 
  CheckCircle2, ChevronRight
} from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: { id: number, label: string }[];
  onStepClick: (step: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, steps, onStepClick }) => {
  return (
    <div className="relative mb-16">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-2xl shadow-xl font-bold text-xl">
            {currentStep}
          </div>
          <div>
            <h3 className="font-bold text-black uppercase tracking-widest text-xs">Langkah {currentStep} dari {totalSteps}</h3>
            <p className="text-gray-400 text-[10px] font-medium uppercase tracking-widest">
              {steps.find(s => s.id === currentStep)?.label}
            </p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-1">
          {steps.map((step, idx) => (
            <React.Fragment key={step.id}>
              <button
                type="button"
                onClick={() => onStepClick(step.id)}
                className={`h-2 rounded-full transition-all duration-500 cursor-pointer hover:ring-4 hover:ring-gray-50 focus:outline-none ${
                  step.id === currentStep ? 'bg-black w-8' : 
                  step.id < currentStep ? 'bg-green-500 w-2' : 'bg-gray-200 w-2'
                }`}
                title={`Lompat ke Langkah ${step.id}: ${step.label}`}
              />
              {idx < steps.length - 1 && <div className="w-4 h-px bg-gray-100" />}
            </React.Fragment>
          ))}
        </div>
      </div>
      
      {/* Mobile labels */}
      <div className="flex md:hidden overflow-x-auto no-scrollbar gap-6 pb-2 border-b border-gray-50">
        {steps.map(step => (
          <button
            key={step.id} 
            type="button"
            onClick={() => onStepClick(step.id)}
            className={`flex items-center gap-2 whitespace-nowrap shrink-0 transition-all focus:outline-none ${
              step.id === currentStep ? 'opacity-100 scale-105' : 'opacity-40 hover:opacity-70'
            }`}
          >
            <span className={`text-[10px] font-bold uppercase tracking-tighter ${step.id === currentStep ? 'text-black' : 'text-gray-400'}`}>
              {step.id}. {step.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
