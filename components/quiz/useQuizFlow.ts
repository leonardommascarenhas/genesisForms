import { useState, useCallback } from "react";
import type { Answers } from "@/types";
import { STEPS_MAP, STEP_ANSWER_KEY } from "@/types";
import { validateStep } from "@/utils";
import { sendToWebhook } from "@/webhook";

interface UseQuizFlowReturn {
  activeScreen: string;
  currentStep: number;
  answers: Answers;
  transitioning: boolean;
  scheduleLoading: boolean;
  scheduleError: string | null;
  scheduleSuccess: boolean;
  startQuiz: () => void;
  nextStep: () => void;
  prevStep: () => void;
  proceedToQualified: () => void;
  goToStep: (index: number) => void;
  selectOption: (option: string | string[]) => void;
  setAnswer: (key: keyof Answers, value: string) => void;
  handleSchedule: () => Promise<void>;
  reset: () => void;
}

const INITIAL_ANSWERS: Answers = {
  name: "",
  phone: "",
  debtRange: "",
  profile: "",
  goal: "",
  situation: "",
  acceptsFee: "",
};

// ─── Qualificação ──────────────────────────────────────────────────────────────

function evaluateDebt(debtRange: string): "qualified" | "disqualified" | "pending" {
  if (debtRange === "Menos de R$5.000") return "disqualified";
  if (debtRange === "Acima de R$5.000") return "qualified";
  if (debtRange === "Não sei o valor exato") return "pending"; // TODO: confirmar com Henrique
  return "pending";
}

// ─── Hook ──────────────────────────────────────────────────────────────────────

export function useQuizFlow(): UseQuizFlowReturn {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>(INITIAL_ANSWERS);
  const [result, setResult] = useState<
    "pre-qualified" | "qualified" | "disqualified" | null
  >(null);
  const [transitioning, setTransitioning] = useState(false);
  const [scheduleLoading, setScheduleLoading] = useState(false);
  const [scheduleError, setScheduleError] = useState<string | null>(null);
  const [scheduleSuccess, setScheduleSuccess] = useState(false);

  const activeScreen = result
    ? result === "qualified"
      ? "result-qualified"
      : result === "pre-qualified"
      ? "result-pre-qualified"
      : "result-disqualified"
    : STEPS_MAP[currentStep];

  const goToStep = useCallback((nextIndex: number) => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentStep(nextIndex);
      setTransitioning(false);
    }, 400);
  }, []);

  const startQuiz = useCallback(() => goToStep(1), [goToStep]);

  const nextStep = useCallback(() => {
    const step = STEPS_MAP[currentStep];
    if (!validateStep(step, answers)) {
      alert("Por favor, preencha o campo corretamente para continuar.");
      return;
    }
    goToStep(currentStep + 1);
  }, [currentStep, answers, goToStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) goToStep(currentStep - 1);
  }, [currentStep, goToStep]);

  const setAnswer = useCallback((key: keyof Answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }, []);

  const selectOption = useCallback(
    (option: string | string[]) => {
      const step = STEPS_MAP[currentStep];
      const key = STEP_ANSWER_KEY[step];
      if (!key) return;

      const value = Array.isArray(option) ? option.join(", ") : option;
      const updated = { ...answers, [key]: value };
      setAnswers(updated);

      // ── Avaliação imediata no passo da dívida (passo 3) ──
      if (key === "debtRange") {
        const debtResult = evaluateDebt(value);
        if (debtResult === "disqualified") {
          setTransitioning(true);
          setTimeout(() => {
            setResult("disqualified");
            setTransitioning(false);
          }, 400);
          return;
        }
        // "qualified" ou "pending": continua o quiz normalmente
        goToStep(currentStep + 1);
        return;
      }

      // ── Último passo: finaliza como qualified ──
      if (currentStep === STEPS_MAP.length - 1) {
        setTransitioning(true);
        setTimeout(() => {
          setResult("pre-qualified"); // ← era "qualified"
          setTransitioning(false);
        }, 400);
        return;
      }

      goToStep(currentStep + 1);
    },
    [currentStep, answers, goToStep]
  );

  const proceedToQualified = useCallback(() => {
    setTransitioning(true);
    setTimeout(() => {
      setResult("qualified");
      setTransitioning(false);
    }, 400);
  }, []);

  const handleSchedule = useCallback(async () => {
    setScheduleLoading(true);
    setScheduleError(null);
    try {
      await sendToWebhook(answers, "qualified");
      setScheduleSuccess(true);
      window.history.pushState({}, "", "/obrigado");
    } catch (err) {
      console.error("Webhook error:", err);
      setScheduleError(
        "Ocorreu um erro ao agendar. Tente novamente ou entre em contato pelo WhatsApp."
      );
    } finally {
      setScheduleLoading(false);
    }
  }, [answers]);

  const reset = useCallback(() => {
    setResult(null);
    setCurrentStep(0);
    setScheduleLoading(false);
    setScheduleError(null);
    setScheduleSuccess(false);
    setAnswers(INITIAL_ANSWERS);
  }, []);

  return {
    activeScreen,
    currentStep,
    answers,
    transitioning,
    scheduleLoading,
    scheduleError,
    scheduleSuccess,
    proceedToQualified,
    startQuiz,
    nextStep,
    prevStep,
    goToStep,
    selectOption,
    setAnswer,
    handleSchedule,
    reset,
  };
}
