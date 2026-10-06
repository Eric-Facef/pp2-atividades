import { useState } from "react";

interface ConversorMoedaProps {
  moeda: string;
  taxa: number; // quanto vale R$ 1 nessa moeda
}

function ConversorMoeda({ moeda, taxa }: ConversorMoedaProps) {
  const [reais, setReais] = useState("");
  const [resultado, setResultado] = useState<number | null>(null);

  function converter() {
    const valor = Number(reais);

    if (valor > 0) {
      setResultado(valor * taxa);
    }
  }

  return (
    <div className="rounded-lg border p-4 flex flex-col gap-3 w-64">
      <h2 className="font-bold">Reais → {moeda}</h2>
      <input
        type="number"
        placeholder="Valor em R$"
        value={reais}
        onChange={(e) => setReais(e.target.value)}
        className="border rounded px-3 py-2"
      />
      <button
        onClick={converter}
        className="bg-teal-600 hover:bg-teal-700 text-white rounded py-2"
      >
        Converter
      </button>
      {resultado !== null && (
        <p>
          {resultado.toFixed(2)} {moeda}
        </p>
      )}
    </div>
  );
}

export default ConversorMoeda;
