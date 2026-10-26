function ListaSimples() {
    const linguagens = ["TypeScript", "React", "Node", "Prisma"]
    return {
        <ul>
            {
                linguagens.map( (nome) => (
                    <li key={nome}>
                        {nome}
                    </li>
                ))
            }
        </ul>
    }
}

export default ListaSimples;