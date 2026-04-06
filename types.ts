export type Step =
  | "screen-home"
  | "quiz-step-1"
  | "quiz-step-2"
  | "quiz-step-3"
  | "quiz-step-4"
  | "quiz-step-5"
  | "result-qualified"
  | "result-disqualified";

export interface Answers {
  name: string;
  phone: string;
  profile: string;
  goal: string;
  situation: string;
}

export const STEP_OPTIONS = {
  "quiz-step-3": ["Empresário", "Autônomo", "CLT"],
  "quiz-step-4": [
    "Voltar a ter crédito",
    "Conseguir financiamento",
    "Regularizar CPF/CNPJ",
  ],
  "quiz-step-5": [
    "Tenho restrições e posso negociar",
    "Tenho restrições, mas estou sem caixa",
    "Não sei ao certo",
  ],
} as const;

export const STEP_QUESTIONS: Partial<Record<Step, string>> = {
  "quiz-step-1": "Qual o seu nome?",
  "quiz-step-2": "Qual o seu WhatsApp?",
  "quiz-step-3": "Você é:",
  "quiz-step-4": "O que você busca:",
  "quiz-step-5": "Qual sua situação hoje:",
};

export const STEPS_MAP: Step[] = [
  "screen-home",
  "quiz-step-1",
  "quiz-step-2",
  "quiz-step-3",
  "quiz-step-4",
  "quiz-step-5",
];

export const STEP_ANSWER_KEY: Partial<Record<Step, keyof Answers>> = {
  "quiz-step-1": "name",
  "quiz-step-2": "phone",
  "quiz-step-3": "profile",
  "quiz-step-4": "goal",
  "quiz-step-5": "situation",
};

export const TOTAL_STEPS = 5;

export const STEP_DISPLAY_NUMBER: Record<string, number> = {
  "quiz-step-1": 1,
  "quiz-step-2": 2,
  "quiz-step-3": 3,
  "quiz-step-4": 4,
  "quiz-step-5": 5,
};
