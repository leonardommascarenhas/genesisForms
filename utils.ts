import type { Step, Answers } from "./types";

export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  const match = digits.match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
  if (!match) return value;
  return !match[2]
    ? match[1]
    : `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ""}`;
}

export function validateStep(step: Step, answers: Answers): boolean {
  switch (step) {
    case "quiz-step-1":
      return answers.name.trim().length >= 3;
    case "quiz-step-2":
      return answers.phone.replace(/\D/g, "").length >= 10;
    default:
      return true;
  }
}
