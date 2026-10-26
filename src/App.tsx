import { useState } from "react";
import ListaPosts from "./ListaPosts";
import TabelaUsuarios from "./TabelaUsuarios";
import TarefasFiltro from "./TarefasFiltro";
import BuscaPosts from "./BuscaPosts";
import ComentariosPost from "./ComentariosPost";
import ListaApiRecarregar from "./ListaApiRecarregar";

const EXERCICIOS = [
  { id: 1, titulo: "1 · Lista de posts", componente: <ListaPosts /> },
  { id: 2, titulo: "2 · Tabela de usuários", componente: <TabelaUsuarios /> },
  { id: 3, titulo: "3 · Tarefas com filtro", componente: <TarefasFiltro /> },
  { id: 4, titulo: "4 · Busca por título", componente: <BuscaPosts /> },
  { id: 5, titulo: "5 · Comentários de um post", componente: <ComentariosPost /> },
  { id: 6, titulo: "6 · Botão recarregar", componente: <ListaApiRecarregar /> },
];

function App() {
  const [ativo, setAtivo] = useState(1);
  const exercicio = EXERCICIOS.find((e) => e.id === ativo)!;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-4 text-slate-800">
      <h1 className="text-2xl font-bold">Listas, useEffect e fetch</h1>

      <nav className="flex flex-wrap gap-2">
        {EXERCICIOS.map((e) => (
          <button
            key={e.id}
            onClick={() => setAtivo(e.id)}
            className={
              "px-3 py-1 rounded border " +
              (ativo === e.id
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white hover:bg-slate-100")
            }
          >
            {e.titulo}
          </button>
        ))}
      </nav>

      <section className="border rounded p-4">
        {/* key força o React a remontar o componente ao trocar de aba */}
        <div key={exercicio.id}>{exercicio.componente}</div>
      </section>
    </div>
  );
}

export default App;
