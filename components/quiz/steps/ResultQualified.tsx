import { useMediaQuery } from "react-responsive";

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
  const isMobile = useMediaQuery({ maxWidth: 639 }); // matches Tailwind's `sm` breakpoint (640px)

  const benefits = isMobile
    ? [
        "Bloqueios no seu acesso ao crédito",
        "Restrições que merecem atenção",
        "O melhor caminho para o seu caso",
      ]
    : [
        "Possíveis bloqueios no seu acesso ao crédito",
        "Restrições ou pendências que merecem atenção",
        "O melhor caminho para avançar com mais segurança",
      ];

  return (
    <div className="w-full flex items-center justify-center px-4">
      <div className="glassPanel w-full max-w-lg flex flex-col p-5 sm:p-8 gap-3.5 sm:gap-4">
        {/* Title */}
        <h2 className="text-gradient font-semibold leading-tight text-center text-xl sm:text-3xl">
          {isMobile
            ? "Diagnóstico financeiro"
            : "Etapa final do seu diagnóstico financeiro"}
        </h2>

        {/* Divider */}
        <div className="flex items-center justify-center gap-2">
          <div className="h-px w-12 bg-white/20" />
          <span className="text-(--dg-cyan) text-xs">◆</span>
          <div className="h-px w-12 bg-white/20" />
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm leading-relaxed text-white/80 text-left">
          {isMobile
            ? "Agora consultamos seu CPF e identificamos o melhor caminho para o seu caso."
            : "Com base nas informações que você preencheu, agora seguimos para a consulta do seu CPF e a análise inicial do seu caso."}
        </p>

        {/* Benefits */}
        <div>
          <p className="font-semibold mb-2 text-(--dg-cyan) text-xs sm:text-sm">
            {isMobile ? "O que identificamos:" : "Essa etapa permite identificar:"}
          </p>
          <ul className="flex flex-col gap-1.5 sm:gap-2">
            {benefits.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-xs sm:text-sm text-white/90">
                <span className="shrink-0 w-4 h-4 rounded-full border border-(--dg-cyan) text-(--dg-cyan) flex items-center justify-center text-[10px] mt-0.5">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Card */}
        <div className="w-full rounded-2xl p-4 sm:p-5 bg-black/20 border border-(--glass-border)">
          <p className="font-bold mb-1.5 sm:mb-2 text-(--dg-cyan) text-base sm:text-lg text-center">
            Consulta inicial do CPF
          </p>
          <p className="text-white/70 text-xs mb-3 text-center leading-relaxed">
            {isMobile
              ? "Taxa única para viabilizar sua análise real."
              : "Taxa operacional referente ao custo da consulta. Viabiliza uma análise real da sua situação e evita direcionamentos genéricos."}
          </p>
          <p className="text-(--dg-cyan) font-bold text-4xl sm:text-5xl text-center mb-1">
            R$20,00
          </p>
          <p className="text-(--dg-cyan)/70 font-semibold text-xs text-center mb-2 sm:mb-3">
            Taxa operacional da consulta
          </p>
          <div className="w-full h-px bg-white/10 mb-2 sm:mb-3" />
          <p className="text-white/50 text-xs text-center">
            {isMobile
              ? "Pagamento único • Sem recorrência"
              : "Pagamento único • Sem mensalidade • Sem cobrança recorrente"}
          </p>
        </div>

        {/* CTA */}
        {scheduleSuccess ? (
          <div className="px-4 py-3 rounded-xl bg-(--dg-green)/10 border border-(--dg-green) text-(--dg-green) font-semibold text-xs sm:text-sm text-center">
            {isMobile
              ? "✅ Solicitação recebida! Entraremos em contato pelo WhatsApp."
              : "✅ Recebemos sua solicitação! Em breve entraremos em contato pelo WhatsApp."}
          </div>
        ) : (
          <>
            <button
              onClick={onSchedule}
              disabled={scheduleLoading}
              className="btn-glow w-full py-3.5 rounded-full text-sm sm:text-base font-bold inline-flex items-center justify-center gap-3 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
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
                <>{isMobile ? "Continuar" : "Quero continuar"}</>
              )}
            </button>

            {!isMobile && (
              <div className="flex items-start gap-2 justify-center">
                <span className="text-white/40 text-xs mt-0.5">🛡</span>
                <p className="text-white/50 text-xs text-center leading-relaxed">
                  Ao concluir esta etapa, sua análise poderá seguir com mais precisão.
                </p>
              </div>
            )}

            {scheduleError && (
              <p className="text-xs text-red-400 text-center">⚠️ {scheduleError}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
