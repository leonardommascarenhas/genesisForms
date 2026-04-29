export type StepConfig =
  | {
      id: string;
      type: "text";
      question: string;
      answerKey: keyof import("./types").Answers;
    }
  | {
      id: string;
      type: "option";
      question: string;
      answerKey: keyof import("./types").Answers;
      options: readonly string[];
    };

export const STEPS_CONFIG = [
  {
    id: "quiz-step-1",
    type: "text",
    question: "Qual o seu nome?",
    answerKey: "name",
  },
  {
    id: "quiz-step-2",
    type: "text",
    question: "Qual o seu WhatsApp?",
    answerKey: "phone",
  },
  {
    id: "quiz-step-3",
    type: "option",
    question: "Qual o valor aproximado da sua dívida?",
    answerKey: "debtRange",
    options: ["Menos de R$5.000", "Acima de R$5.000", "Não sei o valor exato"],
  },
  {
    id: "quiz-step-4",
    type: "option",
    question: "Você é:",
    answerKey: "profile",
    options: ["Empresário", "Autônomo", "CLT"],
  },
  //   {
  //     id: "quiz-step-5",
  //     type: "option",
  //     question: "O que você busca:",
  //     answerKey: "goal",
  //     options: ["Voltar a ter crédito", "Conseguir financiamento", "Regularizar CPF/CNPJ"],
  //   },
  //   {
  //     id: "quiz-step-6",
  //     type: "option",
  //     question: "Qual sua situação hoje:",
  //     answerKey: "situation",
  //     options: [
  //       "Tenho restrições e posso negociar",
  //       "Tenho restrições, mas estou sem caixa",
  //       "Não sei ao certo",
  //     ],
  //   },
] as const satisfies StepConfig[];
