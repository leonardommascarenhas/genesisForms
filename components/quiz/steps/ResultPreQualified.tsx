interface ResultPreQualifiedProps {
  onProceed: () => void;
}

export function ResultPreQualified({ onProceed }: ResultPreQualifiedProps) {
  return (
    <div className="w-full flex items-center justify-center px-4">
      <div className="glassPanel w-full max-w-lg flex flex-col p-5 sm:p-8 gap-4 sm:gap-5">
        <h2 className="text-gradient font-semibold leading-tight text-center text-xl sm:text-3xl">
          Antes de continuar
        </h2>

        <div className="flex items-center justify-center gap-2">
          <div className="h-px w-12 bg-white/20" />
          <span className="text-(--dg-cyan) text-xs">◆</span>
          <div className="h-px w-12 bg-white/20" />
        </div>

        <p className="text-sm sm:text-base leading-relaxed text-white/80 text-center">
          Para que sua análise seja real e não genérica, a próxima etapa envolve uma
          consulta operacional do CPF/CNPJ. Você verá o valor antes de confirmar e só
          continua se autorizar.
        </p>

        <button
          onClick={onProceed}
          className="btn-glow w-full py-4 rounded-full text-sm sm:text-base font-bold inline-flex items-center justify-center gap-2 transition-all"
          style={{ background: "var(--primary-gradient)", color: "#fff" }}>
          Prosseguir para análise real
        </button>
      </div>
    </div>
  );
}
