interface ResultDisqualifiedProps {
  onReset: () => void;
}

export function ResultDisqualified({ onReset }: ResultDisqualifiedProps) {
  return (
    <div className="glassPanel p-24 gap-0">
      <div className="text-6xl mb-4">🏢</div>

      <h2 className="text-2xl font-semibold leading-snug mb-6 w-full text-left">
        Ainda não é o momento ideal para avançarmos com essa estrutura.
      </h2>

      <div className="text-base leading-relaxed mb-8 w-full text-left text-(--text-muted)">
        <p className="mb-3">
          Hoje, nosso modelo é indicado para empresas que já têm operação ativa e estão
          prontas para investir em crescimento com mais previsibilidade.
        </p>
        <p>
          Quando sua empresa estiver nesse momento, será um prazer analisar seu cenário.
        </p>
      </div>

      <button
        onClick={onReset}
        className="px-10 py-3.5 rounded-full text-base font-semibold bg-(--text-main) text-(--bg-dark) hover:-translate-y-0.5 transition-transform">
        Voltar ao Início
      </button>
    </div>
  );
}
