export type Step =
  | "screen-home"
  | "quiz-step-1"
  | "quiz-step-2"
  | "quiz-step-3"
  | "quiz-step-4"
  | "quiz-step-5"
  | "quiz-step-6"
  | "result-qualified"
  | "result-disqualified";

export interface Answers {
  name: string;
  phone: string;
  traffic: string;
  process: string;
  revenue: string;
  commitment: string;
}

export const STEP_OPTIONS = {
  "quiz-step-3": ["Sim, já investimos", "Já investimos antes", "Nunca investimos"],
  "quiz-step-4": ["Sim, já temos", "Temos, mas é desorganizado", "Não temos"],
  "quiz-step-5": [
    "Até R$10 mil",
    "R$10 mil a R$30 mil",
    "R$30 mil a R$50 mil",
    "R$50 mil a R$100 mil",
    "Acima de R$100 mil",
  ],
  "quiz-step-6": ["Sim, estamos dispostos", "Ainda não estamos dispostos"],
} as const;

export const STEP_QUESTIONS: Partial<Record<Step, string>> = {
  "quiz-step-1": "Qual o seu nome?",
  "quiz-step-2": "Qual o seu WhatsApp?",
  "quiz-step-3": "Sua empresa já investe em tráfego pago hoje?",
  "quiz-step-4":
    "Hoje vocês já têm algum processo para organizar, acompanhar e responder os leads?",
  "quiz-step-5": "Qual o faturamento médio mensal da sua empresa?",
  "quiz-step-6":
    "Sua empresa está disposta a investir pelo menos R$2.000/mês em anúncios para gerar demanda e aumentar as oportunidades de venda?",
};

export const STEPS_MAP: Step[] = [
  "screen-home",
  "quiz-step-1",
  "quiz-step-2",
  "quiz-step-3",
  "quiz-step-4",
  "quiz-step-5",
  "quiz-step-6",
];

export const STEP_ANSWER_KEY: Partial<Record<Step, keyof Answers>> = {
  "quiz-step-1": "name",
  "quiz-step-2": "phone",
  "quiz-step-3": "traffic",
  "quiz-step-4": "process",
  "quiz-step-5": "revenue",
  "quiz-step-6": "commitment",
};

export const TOTAL_STEPS = 6;

export const STEP_DISPLAY_NUMBER: Record<string, number> = {
  "quiz-step-1": 1,
  "quiz-step-2": 2,
  "quiz-step-3": 3,
  "quiz-step-4": 4,
  "quiz-step-5": 5,
  "quiz-step-6": 6,
};
