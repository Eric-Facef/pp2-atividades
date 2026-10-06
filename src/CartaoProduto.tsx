import { useState } from "react";

interface CartaoProdutoProps {
  nome: string;
  preco: number;
}

function CartaoProduto({ nome, preco }: CartaoProdutoProps) {
  const [curtidas, setCurtidas] = useState(0);

  return (
    <div className="rounded-lg border p-4 w-56">
      <h2 className="font-bold">{nome}</h2>
      <p className="text-slate-600">R$ {preco.toFixed(2)}</p>
      <button
        onClick={() => setCurtidas(curtidas + 1)}
        className="mt-3 bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded"
      >
        Curtir
      </button>
      <p className="mt-2 text-sm">Curtidas: {curtidas}</p>
    </div>
  );
}

export default CartaoProduto;
