import { Produto } from "app/models/produtos"
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import Router from 'next/router'
import { confirmDialog } from 'primereact/confirmdialog';

interface TabelaProdutosProps {
    produtos: Array<Produto>
    onEdit: (produto) => void;
    onDelete: (produto) => void;
}
export const TabelaProdutos: React.FC<TabelaProdutosProps> = ({
    produtos,
    onDelete,
}) => {
    const actionTemplate = (registro: Produto) => {
        const url = `/cadastros/produtos?id=${registro.id}`
        return <div>
            <Button label="Editar"
                className="p-button-rounded p-button-info"
                onClick={e => Router.push(url)} />
            <Button label="Excluir"
                className="p-button-rounded p-button-danger"
                onClick={e => {
                    confirmDialog({
                        message: "Confirma a Exclusão",
                        acceptLabel: "Sim",
                        rejectLabel: "Não",
                        header: "Confirmação",
                        accept: () => onDelete(registro)
                    })
                }} />

        </div>
    }
    return (
        <DataTable
            value={produtos}
            paginator rows={5}>
            <Column field="codigo" header="Código" />
            <Column field="nome" header="Nome" />
            <Column field="preco" header="Preço" />
            <Column header="" body={actionTemplate} />
        </DataTable>
    )
}
interface ProdutoRowProps {
    produto: Produto;
    onDelete: (produto: any) => void
}