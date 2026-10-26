import { useEffect, useState } from "react";
import type { Usuario } from "./tipos";
import LinhaUsuario from "./LinhaUsuario";

const API_URL = "https://jsonplaceholder.typicode.com/users";

function TabelaUsuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregar() {
      try {
        const resposta = await fetch(API_URL);
        if (!resposta.ok) {
          throw new Error(`Erro HTTP ${resposta.status}`);
        }
        const dados: Usuario[] = await resposta.json();
        setUsuarios(dados);
      } catch (e) {
        setErro(e instanceof Error ? e.message : "Erro desconhecido");
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p className="text-red-600">Erro: {erro}</p>;
  if (usuarios.length === 0) return <p>Nenhum usuário.</p>;

  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="border-b-2 bg-slate-100">
          <th className="px-3 py-2">Nome</th>
          <th className="px-3 py-2">E-mail</th>
          <th className="px-3 py-2">Cidade</th>
          <th className="px-3 py-2">Empresa</th>
        </tr>
      </thead>
      <tbody>
        {usuarios.map((u) => (
          <LinhaUsuario key={u.id} usuario={u} />
        ))}
      </tbody>
    </table>
  );
}

export default TabelaUsuarios;
