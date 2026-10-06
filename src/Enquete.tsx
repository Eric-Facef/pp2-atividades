import { useState } from "react";

interface EnqueteProps {
  pergunta: string;
  opcaoA: string;
  opcaoB: string;
}

function Enquete({ pergunta, opcaoA, opcaoB }: EnqueteProps) {
  const [votosA, setVotosA] = useState(0);
  const [votosB, setVotosB] = useState(0);

  // valor calculado: não precisa de state próprio
  let resultado = "Empate";
  if (votosA > votosB) resultado = `${opcaoA} está na frente`;
  else if (votosB > votosA) resultado = `${opcaoB} está na frente`;

  function zerar() {
    setVotosA(0);
    setVotosB(0);
  }

  return (
    <div className="rounded-lg border p-4 flex flex-col gap-3 w-72">
      <h2 className="font-bold">{pergunta}</h2>
      <div className="flex gap-2">
        <button
          onClick={() => setVotosA(votosA + 1)}
          className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded py-2"
        >
          {opcaoA} ({votosA})
        </button>
        <button
          onClick={() => setVotosB(votosB + 1)}
          className="flex-1 bg-teal-600 hover:bg-teal-700 text-white rounded py-2"
        >
          {opcaoB} ({votosB})
        </button>
      </div>
      <p className="text-sm text-slate-600">{resultado}</p>
      <button
        onClick={zerar}
        className="text-sm text-red-600 hover:underline self-start"
      >
        Zerar votos
      </button>
    </div>
  );
}

export default Enquete;
