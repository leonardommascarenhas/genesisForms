import type { Answers } from "./types";

const WEBHOOK_URL =
  "https://n8n.srv1067347.hstgr.cloud/webhook/5011b2cf-3365-4b30-a886-bb";

export function normalizePhone(phone: string): string {
  if (!phone) return "";

  let digits = phone.replace(/\D/g, "");
  digits = digits.replace(/^0+/, "");

  if (!digits.startsWith("55")) {
    digits = "55" + digits;
  }

  return digits;
}

export async function sendToWebhook(
  answers: Answers,
  result: "qualified" | "disqualified"
): Promise<void> {
  await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      resultado: result === "qualified" ? "qualificado" : "desqualificado",
      nome: answers.name,
      whatsapp: normalizePhone(answers.phone),
      perfil: answers.profile,
      objetivo: answers.goal,
      situacao: answers.situation,
      timestamp: new Date().toISOString(),
    }),
  });
}
