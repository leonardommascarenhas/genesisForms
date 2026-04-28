import { STEPS_CONFIG } from "./steps.config";
export type { StepConfig } from "./steps.config";

// Tipos derivados automaticamente do config
export type QuizStepId = (typeof STEPS_CONFIG)[number]["id"];

export type Step =
  | "screen-home"
  | QuizStepId
  | "result-pre-qualified"
  | "result-qualified"
  | "result-disqualified";

export interface Answers {
  name: string;
  phone: string;
  debtRange: string;
  profile: string;
  goal: string;
  situation: string;
  acceptsFee: string;
}

export const STEPS_MAP: Step[] = [
  "screen-home",
  ...STEPS_CONFIG.map((s) => s.id as QuizStepId),
];

export const TOTAL_STEPS = STEPS_CONFIG.length;

export const STEP_QUESTIONS = Object.fromEntries(
  STEPS_CONFIG.map((s) => [s.id, s.question])
) as Record<QuizStepId, string>;

export const STEP_ANSWER_KEY = Object.fromEntries(
  STEPS_CONFIG.map((s) => [s.id, s.answerKey])
) as Record<QuizStepId, keyof Answers>;

export const STEP_DISPLAY_NUMBER = Object.fromEntries(
  STEPS_CONFIG.map((s, i) => [s.id, i + 1])
) as Record<QuizStepId, number>;

// Só os steps de opção têm `options`
export const STEP_OPTIONS = Object.fromEntries(
  STEPS_CONFIG.filter((s) => s.type === "option").map((s) => [
    s.id,
    (s as Extract<typeof s, { type: "option" }>).options,
  ])
) as Record<string, readonly string[]>;
