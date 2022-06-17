import { Layout } from "components"
import { Input, InputCPF } from "components"
import { useFormik } from 'formik'
import { string } from "yup"

interface consultaClientesFormik {
    nome?: string,
    cpf?: string,
}

export const ListagemClientes: React.FC = () => {

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
        </Layout>
    )
}