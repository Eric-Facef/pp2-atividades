import { useState } from "react";

interface ContadorPassoProps {
  passo: number;
}

function ContadorPasso({ passo }: ContadorPassoProps) {
  const [valor, setValor] = useState(0);

  function diminuir() {
    // nunca deixa o valor ficar abaixo de zero
    setValor(Math.max(0, valor - passo));
  }

  return (
    <div className="rounded-lg border p-4 flex items-center gap-3">
      <button
        onClick={diminuir}
        className="bg-slate-200 hover:bg-slate-300 px-3 py-1 rounded"
      >
        −
      </button>
      <span className="w-12 text-center font-bold">{valor}</span>
      <button
        onClick={() => setValor(valor + passo)}
        className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded"
      >
        +
      </button>
      <button
        onClick={() => setValor(0)}
        className="bg-slate-200 hover:bg-slate-300 px-3 py-1 rounded"
      >
        Zerar
      </button>
      <span className="text-sm text-slate-500">passo: {passo}</span>
    </div>
  );
}

export default ContadorPasso;
