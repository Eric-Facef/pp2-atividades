import { useEffect, useState } from "react";
import type { Post } from "./tipos";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

function BuscaPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [busca, setBusca] = useState("");

  // busca todos os posts uma única vez ([] no final)
  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) {
          throw new Error(`Erro HTTP ${resposta.status}`);
        }
        const dados: Post[] = await resposta.json();
        setPosts(dados);
      } catch (e) {
        setErro(e instanceof Error ? e.message : "Erro desconhecido");
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  // filtro feito no cliente: digitar NÃO dispara novo fetch
  const encontrados = posts.filter((p) =>
    p.title.toLowerCase().includes(busca.toLowerCase())
  );

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p className="text-red-600">Erro: {erro}</p>;

  return (
    <div className="space-y-3">
      <input
        type="text"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Buscar por título..."
        className="border rounded px-2 py-1 w-full max-w-md"
      />

      <p className="text-sm text-slate-500">
        {encontrados.length} de {posts.length}
      </p>

      {encontrados.length === 0 ? (
        <p>Nenhum resultado.</p>
      ) : (
        <ul className="list-disc pl-6 space-y-1">
          {encontrados.map((p) => (
            <li key={p.id}>{p.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BuscaPosts;
