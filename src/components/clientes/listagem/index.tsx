import { Layout } from "components"
import { Input, InputCPF } from "components"
import { useFormik } from 'formik'
import { string } from "yup"
import { useState } from "react"
import { Cliente } from "app/models/clientes"
import { DataTable, DataTablePageParams } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Page } from 'app/models/common/page'
import { useClienteService } from "app/services"
import { Button } from 'primereact/button'
import Router from 'next/router'
import { confirmDialog } from 'primereact/confirmdialog';



interface consultaClientesFormik {
    nome?: string,
    cpf?: string,
}


export const ListagemClientes: React.FC = () => {
    const [clientes, setClientes] = useState<Page<Cliente>>({
        content: [],
        first: 0,
        number: 0,
        size: 10,
        totalElements: 0
    })
    const service = useClienteService()
    const [loading, setLoading] = useState<boolean>(false)
    const handleSubmit = (filtro: consultaClientesFormik) => {
        handleTable(null)
    }
    const { handleSubmit: formikSubmit,
        values: filtros,
        handleChange } = useFormik<consultaClientesFormik>({
            onSubmit: handleSubmit,
            initialValues: { nome: '', cpf: '' }

        })
    const handleTable = (event: DataTablePageParams) => {
        setLoading(true)
        service.find(filtros.nome, filtros.cpf, event?.page, event?.rows)
            .then(result => {
                setClientes({ ...result, first: event?.first })
            }).finally(() => setLoading(false))
    }
    const deletar = (cliente: Cliente) => {
        service.deletar(cliente.id).then(result => {
            handleTable(null)
        })
    }
    const actionTemplate = (registro: Cliente) => {
        const url = `/cadastros/clientes?id=${registro.id}`
        return <div>
            <Button label="Editar"
                className="p-button-rounded p-button-info"
                onClick={e => Router.push(url)} />
            <Button label="Excluir" onClick={e => {
                confirmDialog({
                    message: "Confirma a Exclusão",
                    acceptLabel: "Sim",
                    rejectLabel: "Não",
                    header: "Confirmação",
                    accept: () => deletar(registro)
                })
            }}
                className="p-button-rounded p-button-danger" />
        </div>
    }
    return (
        <Layout titulo="Clientes">
            <form onSubmit={formikSubmit}>
                <div className="columns">
                    <Input id="nome" name="nome"
                        label="Nome:"
                        columnClasses="is-half"
                        autoComplete="off"
                        onChange={handleChange}
                        value={filtros.nome}
                    />
                    <InputCPF id="cpf" name="cpf"
                        label="CPF:"
                        autoComplete="off"
                        onChange={handleChange}
                        columnClasses="is-half"
                        value={filtros.cpf}
                    />
                </div>
                <div className="field is-grouped">
                    <div className="control is-link">
                        <button type="submit" className="button is-success">
                            Consultar
                        </button>
                    </div>
                    <div className="control is-link">
                        <button
                            type="submit"
                            className="button is-warning"
                            onClick={e => Router.push("/cadastros/clientes")}>
                            Novo
                        </button>
                    </div>
                </div>
            </form>
            <br />
            <div className="columns">
                <div className="is-full">
                    <DataTable
                        value={clientes.content}
                        totalRecords={clientes.totalElements}
                        lazy paginator
                        first={clientes.first}
                        rows={clientes.size}
                        onPage={handleTable}
                        loading={loading}
                        emptyMessage={"Nenhum registro"}>
                        <Column field="id" header="código" />
                        <Column field="nome" header="Nome" />
                        <Column field="cpf" header="Cpf" />
                        <Column field="email" header="Email" />
                        <Column body={actionTemplate} />
                    </DataTable>
                </div>
            </div>
        </Layout>
    )
}