import React from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface Step {
  name: string;
  active?: boolean;
  completed?: boolean;
  status?: "completed" | "current" | "upcoming"; 
}

interface StepperProps {
  steps: Step[];
}

export default function Stepper({ steps }: StepperProps) {
  const normalizedSteps = steps.map(step => ({
    ...step,
    isCompleted: step.completed || step.status === "completed",
    isCurrent: step.active || step.status === "current"
  }));

  const currentIndex = normalizedSteps.findIndex(s => s.isCurrent);
  const activeIndex = currentIndex !== -1 ? currentIndex : normalizedSteps.length - 1;

  return (
    <div className="w-full py-8 px-4 md:px-8 bg-white rounded-xl shadow-sm border border-slate-200 mb-8">
      <div className="relative flex items-center justify-between w-full max-w-4xl mx-auto">
        {/* Background line */}
        <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-1 bg-slate-100 z-0 rounded-full" />
        
        {/* Active line */}
        <div 
          className="absolute left-[10%] top-1/2 -translate-y-1/2 h-1 bg-primary z-0 transition-all duration-500 rounded-full"
          style={{ width: `${(activeIndex / (steps.length - 1)) * 80}%` }}
        />

        {normalizedSteps.map((step, idx) => {
          return (
            <div key={idx} className="relative z-10 flex flex-col items-center group">
              <div 
                className={cn(
                  "w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-xs md:text-sm transition-all duration-300 shadow-sm",
                  step.isCompleted ? "bg-primary text-white" : 
                  step.isCurrent ? "bg-primary text-white ring-4 ring-primary/20" : 
                  "bg-white text-slate-400 border-2 border-slate-200"
                )}
              >
                {step.isCompleted ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : (idx + 1)}
              </div>
              <span 
                className={cn(
                  "absolute top-full mt-3 text-[10px] md:text-xs font-bold whitespace-nowrap transition-colors duration-300 text-center",
                  (step.isCompleted || step.isCurrent) ? "text-primary" : "text-slate-400",
                  step.isCurrent ? "block" : "hidden sm:block"
                )}
              >
                {step.name}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Spacer to prevent overlap of absolutely positioned labels */}
      <div className="h-6 w-full hidden sm:block"></div>
      <div className="mt-4 text-center font-bold text-primary text-xs sm:hidden">
        {normalizedSteps[activeIndex]?.name}
      </div>
    </div>
  );
}
