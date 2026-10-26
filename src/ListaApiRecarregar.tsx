import { useEffect, useState } from "react";
import type { Todo } from "./tipos";

// Para testar o erro, troque por /todoss e use o botão como "Tentar de novo"
const API_URL = "https://jsonplaceholder.typicode.com/todos?userId=1";

function ListaApiRecarregar() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [tentativa, setTentativa] = useState(0);
  const [atualizadoEm, setAtualizadoEm] = useState<Date | null>(null);

  useEffect(() => {
    async function carregar() {
      setCarregando(true);
      setErro(null);
      try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) {
          throw new Error(`Erro HTTP ${resposta.status}`);
        }
        const dados: Todo[] = await resposta.json();
        setTodos(dados);
        setAtualizadoEm(new Date());
      } catch (e) {
        setErro(e instanceof Error ? e.message : "Erro desconhecido");
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, [tentativa]); // mudou a tentativa, busca de novo

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setTentativa(tentativa + 1)}
          className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          {erro ? "Tentar de novo" : "Recarregar"}
        </button>
        {atualizadoEm && (
          <span className="text-sm text-slate-500">
            Última atualização: {atualizadoEm.toLocaleTimeString("pt-BR")}
          </span>
        )}
      </div>

      {carregando && <p>Carregando...</p>}
      {erro && <p className="text-red-600">Erro: {erro}</p>}
      {!carregando && !erro && todos.length === 0 && <p>Nenhuma tarefa.</p>}
      {!carregando && !erro && todos.length > 0 && (
        <ul className="space-y-1">
          {todos.map((t) => (
            <li key={t.id}>
              {t.completed ? "[x]" : "[ ]"} {t.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaApiRecarregar;
