import { useState } from "react";

interface ResultQualifiedProps {
  scheduleLoading: boolean;
  scheduleError: string | null;
  scheduleSuccess: boolean;
  onSchedule: () => void;
}

export function ResultQualified({
  scheduleLoading,
  scheduleError,
  scheduleSuccess,
  onSchedule,
}: ResultQualifiedProps) {
  const [declined, setDeclined] = useState(false);

  return (
    <div className="w-full flex items-center justify-center px-4">
      <div className="glassPanel w-full max-w-lg flex flex-col p-5 sm:p-8 gap-3.5 sm:gap-4">
        {/* Title */}
        <h2 className="text-gradient font-semibold leading-tight text-center text-xl sm:text-3xl">
          Diagnóstico financeiro
        </h2>

        {/* Divider */}
        <div className="flex items-center justify-center gap-2">
          <div className="h-px w-12 bg-white/20" />
          <span className="text-(--dg-cyan) text-xs">◆</span>
          <div className="h-px w-12 bg-white/20" />
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm leading-relaxed text-white/80 text-left">
          Agora vamos validar sua situação para entender o que pode estar impedindo seu
          acesso ao crédito e qual o melhor caminho para avançar.
        </p>

        {/* Card */}
        <div className="w-full rounded-2xl p-4 sm:p-5 bg-black/20 border border-(--glass-border)">
          <p className="font-bold mb-1.5 text-(--dg-cyan) text-base sm:text-lg text-center">
            Consulta inicial única: R$20,00
          </p>
          <div className="w-full h-px bg-white/10 my-3" />
          <p className="text-white/70 text-xs text-center leading-relaxed">
            A taxa cobre a verificação necessária para uma análise mais precisa do seu
            caso. Pagamento único, sem mensalidade e sem cobrança recorrente.
          </p>
        </div>

        {/* CTA */}
        {scheduleSuccess ? (
          <div className="px-4 py-3 rounded-xl bg-(--dg-green)/10 border border-(--dg-green) text-(--dg-green) font-semibold text-xs sm:text-sm text-center">
            ✅ Recebemos sua solicitação! Em breve entraremos em contato pelo WhatsApp.
          </div>
        ) : declined ? (
          <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 text-xs sm:text-sm text-center leading-relaxed">
            Tudo bem. Se mudar de ideia, é só nos chamar no WhatsApp. Sua análise fica
            salva e podemos retomar quando você estiver pronto.
          </div>
        ) : (
          <>
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button
                onClick={onSchedule}
                disabled={scheduleLoading}
                className="btn-glow flex-1 py-3.5 rounded-full text-sm font-bold inline-flex items-center justify-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed md:px-0.5"
                style={{
                  background: scheduleLoading
                    ? "rgba(140, 198, 63, 0.4)"
                    : "var(--primary-gradient)",
                  color: "#fff",
                }}>
                {scheduleLoading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Sim, quero consultar por R$20,00"
                )}
              </button>

              <button
                onClick={() => setDeclined(true)}
                disabled={scheduleLoading}
                className="flex-1 py-3.5 rounded-full text-sm font-bold inline-flex items-center justify-center gap-2 transition-all border border-white/20 text-white/60 hover:border-white/40 hover:text-white/80 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "rgba(255,255,255,0.05)" }}>
                Não quero continuar agora
              </button>
            </div>

            {scheduleError && (
              <p className="text-xs text-red-400 text-center">⚠️ {scheduleError}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
