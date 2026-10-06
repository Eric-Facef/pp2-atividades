import { useState } from "react";

interface TarefaCardProps {
  titulo: string;
}

function TarefaCard({ titulo }: TarefaCardProps) {
  const [concluida, setConcluida] = useState(false);

  return (
    <div
      className={`rounded-lg border-2 p-4 flex items-center justify-between ${
        concluida ? "border-green-500" : "border-slate-300"
      }`}
    >
      <span className={concluida ? "line-through text-slate-400" : ""}>
        {titulo}
      </span>
      <button
        onClick={() => setConcluida(!concluida)}
        className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded"
      >
        {concluida ? "Desfazer" : "Concluir"}
      </button>
    </div>
  );
}

export default TarefaCard;
