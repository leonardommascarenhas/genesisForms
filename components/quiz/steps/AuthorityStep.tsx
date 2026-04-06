interface AuthorityStepProps {
  onNext: () => void;
}

const METRICS = [
  { val: "+5.000", desc: "alunos formados" },
  { val: "+8 anos", desc: "de experiência " },
  { val: "4.9★", desc: "de avaliação" },
];

const TAGS = ["🗣️ Conversação", "🎯 Método Intensivo", "🤖 IA para praticar"];

export function AuthorityStep({ onNext }: AuthorityStepProps) {
  return (
    <div className="glassPanel p-24 gap-0">
      <h2 className="title-gradient text-4xl font-extrabold leading-tight mb-4 w-full text-left">
        Estamos quase lá.
      </h2>

      <p className="text-(--text-muted) text-lg leading-relaxed mb-8 w-full text-left">
        A Intense English School usa um método intensivo focado em conversação real — sem
        decoreba, sem enrolação. Nossos alunos saem falando, não só estudando.
      </p>

      <div className="grid grid-cols-3 gap-4 mb-8 w-full">
        {METRICS.map((m) => (
          <div
            key={m.val}
            className="flex flex-col items-center justify-center gap-1.5 px-4 py-5 rounded-2xl bg-(--glass-bg) border border-(--glass-border) text-center">
            <span className="text-xl font-extrabold text-(--dg-cyan) leading-tight">
              {m.val}
            </span>
            <span className="text-[11px] uppercase tracking-widest text-(--text-muted) leading-snug">
              {m.desc}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {TAGS.map((tag) => (
          <span
            key={tag}
            className="px-5 py-1.5 rounded-full text-sm font-semibold bg-(--glass-bg) border border-(--glass-highlight)">
            {tag}
          </span>
        ))}
      </div>

      <button
        onClick={onNext}
        className="px-10 py-3.5 rounded-full text-base font-semibold bg-(--text-main) text-(--bg-dark) hover:-translate-y-0.5 transition-transform">
        Continuar →
      </button>
    </div>
  );
}
