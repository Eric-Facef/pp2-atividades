import type { Usuario } from "./tipos";

interface LinhaUsuarioProps {
  usuario: Usuario;
}

function LinhaUsuario({ usuario }: LinhaUsuarioProps) {
  return (
    <tr className="border-b">
      <td className="px-3 py-2">{usuario.name}</td>
      <td className="px-3 py-2">
        <a
          href={`mailto:${usuario.email}`}
          className="text-blue-600 underline"
        >
          {usuario.email}
        </a>
      </td>
      <td className="px-3 py-2">{usuario.address.city}</td>
      <td className="px-3 py-2">{usuario.company.name}</td>
    </tr>
  );
}

export default LinhaUsuario;
