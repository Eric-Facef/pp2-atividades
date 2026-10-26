import { useEffect, useState } from "react";
import type { Comentario } from "./tipos";

function ComentariosPost() {
  const [postId, setPostId] = useState(1);
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // busca de novo sempre que o postId mudar; o cleanup cancela a requisição antiga
  useEffect(() => {
    const controller = new AbortController();

    async function carregar() {
      setCarregando(true);
      setErro(null);
      try {
        const resposta = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
          { signal: controller.signal }
        );
        if (!resposta.ok) {
          throw new Error(`Erro HTTP ${resposta.status}`);
        }
        const dados: Comentario[] = await resposta.json();
        setComentarios(dados);
        setCarregando(false);
      } catch (e) {
        // cancelar de propósito (AbortError) não é erro
        if ((e as Error).name === "AbortError") return;
        setErro(e instanceof Error ? e.message : "Erro desconhecido");
        setCarregando(false);
      }
    }

    carregar();
    return () => controller.abort();
  }, [postId]);

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2">
        Post (1 a 100):
        <input
          type="number"
          min={1}
          max={100}
          value={postId}
          onChange={(e) => setPostId(Number(e.target.value))}
          className="border rounded px-2 py-1 w-24"
        />
      </label>

      {carregando && <p>Carregando...</p>}
      {erro && <p className="text-red-600">Erro: {erro}</p>}

      {!carregando && !erro && (
        <>
          <p className="text-sm text-slate-500">
            {comentarios.length} comentários
          </p>
          {comentarios.length === 0 ? (
            <p>Nenhum comentário.</p>
          ) : (
            <ul className="space-y-3">
              {comentarios.map((c) => (
                <li key={c.id} className="border rounded p-3">
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-sm text-slate-500">{c.email}</p>
                  <p className="mt-1">{c.body}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}

export default ComentariosPost;
