"use client";

import { useQuizFlow } from "./quiz/useQuizFlow";
import { HomeScreen } from "./quiz/steps/HomeScreen";
import { TextInputStep } from "./quiz/steps/TextInputStep";
import { OptionStep } from "./quiz/steps/OptionStep";
import { ResultQualified } from "./quiz/steps/ResultQualified";
import { ResultDisqualified } from "./quiz/steps/ResultDisqualified";
import type { Step } from "@/types";

const TEXT_STEPS: Step[] = ["quiz-step-1", "quiz-step-2"];
const OPTION_STEPS: Step[] = ["quiz-step-3", "quiz-step-4", "quiz-step-5"];

type TextStep = "quiz-step-1" | "quiz-step-2";
type OptionStep = "quiz-step-3" | "quiz-step-4" | "quiz-step-5";

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
  } = useQuizFlow();

  const screen = activeScreen as Step;

  const wrapperClass = `w-full max-w-[620px] px-4 flex-1 min-h-0 flex flex-col justify-center transition-all duration-400 ${
    transitioning
      ? "opacity-0 translate-y-4 scale-[0.98]"
      : "opacity-100 translate-y-0 scale-100"
  }`;

  return (
    <div className="h-dvh flex flex-col items-center justify-center px-4">
      <div className={wrapperClass}>
        <img
          src="/logo.png"
          alt="Genesis Logo"
          className="h-24 md:h-36 w-auto object-contain"
        />

        {screen === "screen-home" && <HomeScreen onStart={startQuiz} />}

        {TEXT_STEPS.includes(screen) && (
          <TextInputStep
            step={screen as TextStep}
            answers={answers}
            onAnswer={setAnswer}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )}

        {OPTION_STEPS.includes(screen) && (
          <OptionStep
            step={screen as OptionStep}
            answers={answers}
            onSelect={selectOption}
            onPrev={prevStep}
          />
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
