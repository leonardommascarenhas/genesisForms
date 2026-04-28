interface ResultDisqualifiedProps {
  onReset: () => void;
}

export function ResultDisqualified({ onReset }: ResultDisqualifiedProps) {
  return (
    <div className="glassPanel p-24 gap-0">
      <div className="text-6xl mb-4">💬</div>

      <h2 className="text-2xl font-semibold leading-snug mb-6 w-full text-left">
        Ainda não conseguimos atuar no seu caso.
      </h2>

      <p className="text-base leading-relaxed mb-8 w-full text-left text-(--text-muted)">
        Nossa assessoria exige um perfil específico de dívida para que a gente consiga
        entregar um resultado real. Se sua situação mudar, pode voltar quando quiser.
      </p>

      <button
        onClick={onReset}
        className="px-10 py-3.5 rounded-full text-base font-semibold bg-(--text-main) text-(--bg-dark) hover:-translate-y-0.5 transition-transform">
        Voltar ao Início
      </button>
    </div>
  );
}
