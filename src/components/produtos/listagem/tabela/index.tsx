import { Produto } from "app/models/produtos"

interface TabelaProdutosProps {
    produtos: Array<Produto>
    onEdit: (produto) => void;
    onDelete: (produto) => void;
}


export const TabelaProdutos: React.FC<TabelaProdutosProps> = ({
    produtos,
    onDelete,
    onEdit
}) => {
    return (
        <table className="table is-striped is-hoverable is-narrow ">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th></th>
                </tr>

            </thead>
            <tbody>
                {
                    produtos.map(produto => (<ProdutoRow onDelete={onDelete}
                        onEdit={onEdit} key={produto.id} produto={produto} />))

                }
            </tbody>
        </table>
    )

}
interface ProdutoRowProps {
    produto: Produto;
    onEdit: (produto: any) => void;
    onDelete: (produto: any) => void;

}


const ProdutoRow: React.FC<ProdutoRowProps> = ({
    produto,
    onDelete,
    onEdit
}) => {
    return (
        <tr>
            <td>{produto.id}</td>
            <td>{produto.codigo}</td>
            <td>{produto.nome}</td>
            <td>{produto.preco}</td>
            <td>
                <button onClick={e => onEdit(produto)}
                    className="button is-success is-rounded is-small">
                    Editar
                </button>
                <button onClick={e => onDelete(produto)}
                    className="button is-danger is-rounded is-small">
                    Deletar
                </button>
            </td>
        </tr>
    )

} 