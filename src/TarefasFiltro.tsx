import { useEffect, useState } from "react";
import type { Todo } from "./tipos";

const API_URL = "https://jsonplaceholder.typicode.com/todos?userId=1";

type Filtro = "todas" | "pendentes" | "concluidas";

const OPCOES: { valor: Filtro; rotulo: string }[] = [
  { valor: "todas", rotulo: "Todas" },
  { valor: "pendentes", rotulo: "Pendentes" },
  { valor: "concluidas", rotulo: "Concluídas" },
];

function TarefasFiltro() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<Filtro>("todas");

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) {
          throw new Error(`Erro HTTP ${resposta.status}`);
        }
        const dados: Todo[] = await resposta.json();
        setTodos(dados);
      } catch (e) {
        setErro(e instanceof Error ? e.message : "Erro desconhecido");
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  // estado derivado: calculado a cada render, sem outro useState
  const visiveis = todos.filter((t) => {
    if (filtro === "pendentes") return !t.completed;
    if (filtro === "concluidas") return t.completed;
    return true;
  });

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p className="text-red-600">Erro: {erro}</p>;

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {OPCOES.map((o) => (
          <button
            key={o.valor}
            onClick={() => setFiltro(o.valor)}
            className={
              "px-3 py-1 rounded border " +
              (filtro === o.valor
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-slate-700 hover:bg-slate-100")
            }
          >
            {o.rotulo}
          </button>
        ))}
      </div>

      <p className="text-sm text-slate-500">{visiveis.length} tarefas</p>

      {visiveis.length === 0 ? (
        <p>Nenhuma tarefa.</p>
      ) : (
        <ul className="space-y-1">
          {visiveis.map((t) => (
            <li
              key={t.id}
              className={t.completed ? "line-through text-slate-400" : ""}
            >
              {t.completed ? "[x]" : "[ ]"} {t.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TarefasFiltro;
