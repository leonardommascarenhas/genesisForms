"use client";

import { useQuizFlow } from "./quiz/useQuizFlow";
import { HomeScreen } from "./quiz/steps/HomeScreen";
import { TextInputStep } from "./quiz/steps/TextInputStep";
import { OptionStep } from "./quiz/steps/OptionStep";
import { ResultQualified } from "./quiz/steps/ResultQualified";
import { ResultDisqualified } from "./quiz/steps/ResultDisqualified";
import { STEPS_CONFIG } from "@/steps.config";
import type { Step } from "@/types";
import { ResultPreQualified } from "./quiz/steps/ResultPreQualified";

type TextStepId = Extract<(typeof STEPS_CONFIG)[number], { type: "text" }>["id"];
type OptionStepId = Extract<(typeof STEPS_CONFIG)[number], { type: "option" }>["id"];

const TEXT_STEP_IDS = STEPS_CONFIG.filter(
  (s): s is Extract<typeof s, { type: "text" }> => s.type === "text"
).map((s) => s.id);

const OPTION_STEP_IDS = STEPS_CONFIG.filter(
  (s): s is Extract<typeof s, { type: "option" }> => s.type === "option"
).map((s) => s.id);

// Type guards — o TS reconhece o narrowing corretamente
function isTextStep(s: Step): s is TextStepId {
  return TEXT_STEP_IDS.includes(s as TextStepId);
}

function isOptionStep(s: Step): s is OptionStepId {
  return OPTION_STEP_IDS.includes(s as OptionStepId);
}

export default function QuizFlow() {
  const {
    activeScreen,
    answers,
    transitioning,
    scheduleLoading,
    scheduleError,
    scheduleSuccess,
    startQuiz,
    nextStep,
    prevStep,
    selectOption,
    setAnswer,
    handleSchedule,
    reset,
    proceedToQualified,
  } = useQuizFlow();

  const screen = activeScreen as Step;

  const wrapperClass = `w-full max-w-[620px] px-4 flex-1 min-h-0 flex flex-col justify-center transition-all duration-400 ${
    transitioning
      ? "opacity-0 translate-y-4 scale-[0.98]"
      : "opacity-100 translate-y-0 scale-100"
  }`;

  return (
    <div className="h-full flex flex-col items-center justify-center px-4">
      <div className={wrapperClass}>
        <img
          src="/logo.png"
          alt="Genesis Logo"
          className="h-24 md:h-36 w-auto object-contain"
        />

        {screen === "screen-home" && <HomeScreen onStart={startQuiz} />}

        {isTextStep(screen) && (
          <TextInputStep
            step={screen}
            answers={answers}
            onAnswer={setAnswer}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}

        {isOptionStep(screen) && (
          <OptionStep
            step={screen}
            answers={answers}
            onSelect={selectOption}
            onPrev={prevStep}
          />
        )}
        {screen === "result-pre-qualified" && (
          <ResultPreQualified onProceed={proceedToQualified} />
        )}
        {screen === "result-qualified" && (
          <ResultQualified
            scheduleLoading={scheduleLoading}
            scheduleError={scheduleError}
            scheduleSuccess={scheduleSuccess}
            onSchedule={handleSchedule}
          />
        )}

        {screen === "result-disqualified" && <ResultDisqualified onReset={reset} />}
      </div>
    </div>
  );
}
