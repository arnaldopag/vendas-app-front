import { Layout } from "components"
import { Input, InputCPF } from "components"
import { useFormik } from 'formik'
import { string } from "yup"
import { useState } from "react"
import { Cliente } from "app/models/clientes"
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

interface consultaClientesFormik {
    nome?: string,
    cpf?: string,
}

export const ListagemClientes: React.FC = () => {
    const [clientes, setClientes] = useState<Cliente[]>([
        {
            id: '1',
            nome: 'arnaldo',
            cpf: '096',
            email: 'arnaldo',
        }
    ]);

    const handleSubmit = (filtro: consultaClientesFormik) => {
        console.log(filtro)
    }
    const { handleSubmit: formikSubmit,
        values: filtros,
        handleChange } = useFormik<consultaClientesFormik>({
            onSubmit: handleSubmit,
            initialValues: { nome: '', cpf: '' }

        })

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

                </div>
            </form>
            <div className="columns">
                <div className="is-full">
                    <DataTable value={clientes}>
                        <Column field="id" header="código" />
                        <Column field="nome" header="código" />
                        <Column field="cpf" header="código" />
                        <Column field="email" header="código" />
                    </DataTable>
                </div>
            </div>
        </Layout>
    )
}