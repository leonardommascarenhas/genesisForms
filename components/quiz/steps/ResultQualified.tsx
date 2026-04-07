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
  return (
    <div className="glassPanel p-4 sm:p-8 md:p-12 lg:p-16 gap-0">
      <div
        className="text-4xl sm:text-5xl lg:text-6xl mb-4"
        style={{ animation: "bounceIn 1s cubic-bezier(0.36,0,0.66,-0.56) both" }}>
        ✨
      </div>

      <h2 className="text-gradient text-xl sm:text-2xl font-semibold leading-snug mb-6 sm:mb-8 w-full text-left">
        Etapa final do seu diagnóstico financeiro.
      </h2>

      <div className="text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 w-full text-left">
        <p className="mb-4">
          Para avançarmos, realizamos uma análise aprofundada do seu CPF ou CNPJ,
          avaliando sua situação financeira e os pontos que podem estar impedindo seu
          acesso ao crédito.
        </p>
        <p className="mb-3">Essa análise permite identificar:</p>
        <ul className="flex flex-col gap-3">
          {[
            "O que está bloqueando seu acesso ao crédito",
            "O que pode ser revertido na sua situação atual",
            "Quais caminhos realmente fazem sentido para o seu caso",
          ].map((item) => (
            <li key={item} className="pl-7 sm:pl-8 relative">
              <span className="absolute left-0 font-bold text-(--dg-green)">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center flex-col w-full rounded-2xl p-4 sm:p-6 bg-black/20 border border-(--glass-border)">
        <p className="font-semibold mb-2 text-(--dg-cyan) text-sm sm:text-base">
          Diagnóstico estratégico individual
        </p>
        <p className="text-white/50 text-xs sm:text-sm mb-4 text-center">
          Valor do diagnóstico:{" "}
          <span className="text-white/80 font-semibold">R$20,00</span>
        </p>
        <p className="text-white/35 text-[11px] sm:text-xs mb-5 text-center leading-relaxed max-w-sm">
          Esse valor garante uma análise real do seu caso, com direcionamento estratégico.
          Ao final do processo, realizamos uma nova consulta 100% gratuita para confirmar
          que não há mais restrições em seu CPF ou CNPJ.
        </p>

        {scheduleSuccess ? (
          <div className="px-4 py-3 sm:px-6 sm:py-4 rounded-xl bg-(--dg-green)/10 border border-(--dg-green) text-(--dg-green) font-semibold flex items-start sm:items-center gap-2 sm:gap-3 text-sm sm:text-base">
            ✅ Recebemos sua solicitação! Em breve entraremos em contato pelo WhatsApp.
          </div>
        ) : (
          <>
            <button
              onClick={onSchedule}
              disabled={scheduleLoading}
              className="btn-glow w-full sm:w-auto px-6 sm:px-10 py-3.5 rounded-full text-sm sm:text-base font-bold inline-flex items-center justify-center gap-3 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
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
                <>Sim, quero meu diagnóstico →</>
              )}
            </button>

            {scheduleError && (
              <p className="mt-3 text-sm text-red-400">⚠️ {scheduleError}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
