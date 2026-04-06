interface HomeScreenProps {
  onStart: () => void;
}

const BENEFITS = [
  { icon: "🧹", text: "Limpeza de nome CPF/CNPJ" },
  { icon: "📄", text: "Regularização de restrições" },
  { icon: "💳", text: "Recuperação de crédito" },
  { icon: "🔒", text: "Processo sigiloso e individual" },
];

export function HomeScreen({ onStart }: HomeScreenProps) {
  return (
    <div className="w-full flex flex-col items-center gap-5 md:gap-6 text-center">
      {/* Badge */}
      <div className="glass rounded-full px-5 py-2 inline-flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wide text-(--dg-cyan) border border-(--dg-cyan)/20">
        <span className="pulse-dot" />
        <span className="sm:hidden">Análise individual · Processo sigiloso</span>
        <span className="hidden sm:inline">
          Análise individual · Processo sigiloso · Atendimento prioritário
        </span>
      </div>

      {/* Título */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight">
        Solicite seu diagnóstico financeiro{" "}
        <span className="text-gradient">e recupere seu crédito.</span>
      </h1>

      {/* Subtítulo */}
      <p className="text-sm md:text-base text-(--text-muted) leading-relaxed max-w-xl">
        Analisamos sua situação para estruturar a melhor estratégia de recuperação de
        crédito, de forma individual e sigilosa.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full">
        {BENEFITS.map((b) => (
          <div
            key={b.text}
            className="glass rounded-xl md:rounded-2xl flex flex-col items-center justify-center gap-2 md:gap-3 p-3 md:p-4">
            <span className="text-2xl md:text-3xl">{b.icon}</span>
            <span className="text-[11px] md:text-sm font-medium leading-tight">
              {b.text}
            </span>
          </div>
        ))}
      </div>

      {/* Botão */}
      <button
        onClick={onStart}
        className="btn-glow w-full md:w-auto px-8 md:px-12 py-4 rounded-full text-base md:text-lg font-bold inline-flex items-center justify-center gap-3 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.98] transition-all"
        style={{ background: "var(--primary-gradient)", color: "#fff" }}>
        QUERO MEU DIAGNÓSTICO <span>→</span>
      </button>

      {/* Disclaimer */}
      <p className="text-xs opacity-70 text-(--text-muted)">
        Diagnóstico estratégico individual. Processo 100% sigiloso e personalizado.
      </p>
    </div>
  );
}
