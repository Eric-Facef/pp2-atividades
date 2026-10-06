import Card from "./Card";
import Contador from "./Contador";
import Imc from "./Imc";
import Botao from "./Botao";
import ContadorPasso from "./ContadorPasso";
import CartaoProduto from "./CartaoProduto";
import TarefaCard from "./TarefaCard";
import ConversorMoeda from "./ConversorMoeda";
import Enquete from "./Enquete";

const produtos = [
  { nome: "Teclado", preco: 149.9 },
  { nome: "Mouse", preco: 79.5 },
  { nome: "Monitor", preco: 899 },
];

function Secao({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl font-bold border-b pb-1">{titulo}</h2>
      <div className="flex flex-wrap gap-3 items-start">{children}</div>
    </section>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-slate-100 p-6 flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Frontend PP2</h1>

      <Secao titulo="Exemplos da aula">
        <Card title="Estudar" description="Ler cap. 4" />
        <Contador />
        <Imc />
      </Secao>

      <Secao titulo="Exercício 1 — Botão reutilizável">
        <Botao texto="Salvar" variante="primario" onClick={() => alert("Salvo!")} />
        <Botao texto="Excluir" variante="perigo" onClick={() => alert("Excluído!")} />
        <Botao texto="Enviar" variante="primario" onClick={() => alert("Enviado!")} />
      </Secao>

      <Secao titulo="Exercício 2 — Contador com passo">
        <ContadorPasso passo={1} />
        <ContadorPasso passo={5} />
      </Secao>

      <Secao titulo="Exercício 3 — Cartão de produto">
        {produtos.map((p) => (
          <CartaoProduto key={p.nome} nome={p.nome} preco={p.preco} />
        ))}
      </Secao>

      <Secao titulo="Exercício 4 — Cartão de tarefa">
        <TarefaCard titulo="Estudar React" />
        <TarefaCard titulo="Fazer exercícios" />
        <TarefaCard titulo="Revisar props" />
      </Secao>

      <Secao titulo="Exercício 5 — Conversor de moeda">
        <ConversorMoeda moeda="USD" taxa={0.18} />
        <ConversorMoeda moeda="EUR" taxa={0.16} />
      </Secao>

      <Secao titulo="Exercício 6 — Enquete">
        <Enquete pergunta="Melhor linguagem?" opcaoA="TypeScript" opcaoB="Python" />
        <Enquete pergunta="Melhor editor?" opcaoA="VS Code" opcaoB="WebStorm" />
      </Secao>
    </div>
  );
}

export default App;
