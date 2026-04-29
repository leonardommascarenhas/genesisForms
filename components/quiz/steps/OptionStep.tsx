import { STEP_QUESTIONS, STEP_OPTIONS, TOTAL_STEPS, STEP_DISPLAY_NUMBER } from "@/types";
import type { Answers } from "@/types";

type OptionStepKey = "quiz-step-3" | "quiz-step-4"; // ← added

interface OptionStepProps {
  step: OptionStepKey;
  answers: Answers;
  onSelect: (option: string) => void;
  onPrev: () => void;
}

const STEP_ANSWER_KEY: Record<OptionStepKey, keyof Answers> = {
  "quiz-step-3": "debtRange", // ← updated
  "quiz-step-4": "profile",
  // "quiz-step-5": "goal",
  // "quiz-step-6": "situation", // ← added
};

export function OptionStep({ step, answers, onSelect, onPrev }: OptionStepProps) {
  const options = STEP_OPTIONS[step];
  const answerKey = STEP_ANSWER_KEY[step];
  const currentStep = STEP_DISPLAY_NUMBER[step];

  return (
    <div className="glassPanel px-8 py-10 sm:px-12 sm:py-14">
      <div className="w-full h-0.5 bg-white/6 rounded-full mb-10 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${(currentStep / TOTAL_STEPS) * 100}%`,
            background: "linear-gradient(90deg, #5ee7c8, #7eb8f7)",
          }}
        />
      </div>

      <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-(--dg-cyan) opacity-60 mb-3">
        Passo {currentStep} de {TOTAL_STEPS}
      </p>

      <h2 className="font-serif text-[1.65rem] font-normal leading-snug tracking-tight text-white/90 mb-7">
        {STEP_QUESTIONS[step]}
      </h2>

      <div className="flex flex-col gap-3 w-full mb-8">
        {options.map((option) => {
          const isSelected = answers[answerKey] === option;
          return (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className={`w-full text-left px-5 py-3.5 rounded-[14px] text-[15px] font-light
                bg-white/4 border transition-all duration-150
                ${
                  isSelected
                    ? "border-(--dg-green) bg-white/6 text-white/90"
                    : "border-white/9 text-white/60 hover:border-white/20 hover:text-white/80"
                }`}>
              {option}
            </button>
          );
        })}
      </div>

      <button
        onClick={onPrev}
        className="flex items-center gap-1.5 text-[13px] text-white/25 hover:text-white/55 transition-colors">
        ← Voltar
      </button>
    </div>
  );
}
