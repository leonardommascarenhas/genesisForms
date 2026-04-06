import type { Answers, Step } from "@/types";
import { STEP_QUESTIONS, TOTAL_STEPS, STEP_DISPLAY_NUMBER } from "@/types";
import { formatPhone } from "@/utils";

interface TextInputStepProps {
  step: Extract<Step, "quiz-step-1" | "quiz-step-2">;
  answers: Answers;
  onAnswer: (key: keyof Answers, value: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const STEP_CONFIG = {
  "quiz-step-1": { type: "text", placeholder: "Ex: João Silva", key: "name" },
  "quiz-step-2": { type: "tel", placeholder: "(11) 99999-9999", key: "phone" },
} as const;

export function TextInputStep({
  step,
  answers,
  onAnswer,
  onNext,
  onPrev,
}: TextInputStepProps) {
  const config = STEP_CONFIG[step];
  const value = answers[config.key];
  const currentStep = STEP_DISPLAY_NUMBER[step];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = step === "quiz-step-2" ? formatPhone(e.target.value) : e.target.value;
    onAnswer(config.key, val);
  };

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

      <input
        autoFocus
        type={config.type}
        placeholder={config.placeholder}
        value={value}
        onChange={handleChange}
        onKeyDown={(e) => e.key === "Enter" && onNext()}
        className="
          w-full rounded-[14px] px-4.5 py-3.5
          text-[15px] font-light
          bg-white/4 border border-white/9
          text-white/90 placeholder:text-white/18
          outline-none caret-(--dg-cyan)
          focus:border-(--dg-cyan)/35 focus:bg-(--dg-cyan)/4
          focus:shadow-[0_0_0_3px_rgba(94,231,200,0.07)]
          transition-all duration-200 mb-6
        "
      />

      <div className="flex items-center justify-between w-full">
        {currentStep > 1 ? (
          <button
            onClick={onPrev}
            className="flex items-center gap-1.5 text-[13px] text-white/25 hover:text-white/55 transition-colors">
            ← Voltar
          </button>
        ) : (
          <span />
        )}

        <button
          onClick={onNext}
          className="
            group flex items-center gap-2
            px-7 py-3.5 rounded-full
            text-[14px] font-medium tracking-[0.01em]
            bg-white/90 text-(--bg-dark)
            hover:bg-white hover:-translate-y-px hover:shadow-[0_8px_24px_-4px_rgba(0,0,0,0.35)]
            active:translate-y-0
            transition-all duration-150
          ">
          Continuar
          <span className="text-[13px] transition-transform duration-150 group-hover:translate-x-0.5">
            →
          </span>
        </button>
      </div>

      <p className="text-[11px] text-white/12 text-right mt-4 tracking-wide">
        Pressione{" "}
        <kbd className="font-sans text-[10px] text-white/20 bg-white/5 border border-white/8 rounded-[5px] px-1.5 py-px">
          Enter ↵
        </kbd>{" "}
        para continuar
      </p>
    </div>
  );
}
