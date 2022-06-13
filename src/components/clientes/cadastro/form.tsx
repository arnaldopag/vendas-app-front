import { Cliente } from "app/models/clientes"
import { useFormik } from 'formik'
import { Input, InputCpf, InputFone, InputDate } from 'components'

interface ClienteFormProps {
    cliente: Cliente
    onSubmit: (cliente: Cliente) => void
}

const formScheme: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    dataNascimento: '',
    endereco: '',
    email: '',
    telefone: '',
    dataCadastro: ''
}

export const ClienteForm: React.FC<ClienteFormProps> = ({
    cliente,
    onSubmit
}) => {
    const formik = useFormik<Cliente>({
        initialValues: { ...formScheme, ...cliente },
        onSubmit,
    })


    return (
        <form onSubmit={formik.handleSubmit}>
            {formik.values.id &&
                <div className="columns">
                    <Input id="id"
                        name="id"
                        label="Id:"
                        disabled
                        columnClasses="is-half"
                        value={formik.values.id} />

                    <Input id="dataCadastro"
                        name="dataCadastro"
                        label="Data de Cadastro:"
                        disabled
                        columnClasses="is-half"
                        value={formik.values.dataCadastro}
                    />
                </div>
            }

            <div className="columns">
                <Input id="nome"
                    name="nome"
                    label="Nome: *"
                    autoComplete="off"
                    columnClasses="is-full"
                    onChange={formik.handleChange}
                    value={formik.values.nome}
                    error={formik.errors.nome}
                />
            </div>
            <div className="columns">
                <div className="field column is-half">
                    <label className="label" htmlFor="cpf">CPF*</label>
                    <div className="control">
                        <InputCpf id="cpf"
                            name="cpf"
                            label="CPF*:"
                            autoComplete="off"
                            className="input"
                            onChange={formik.handleChange}
                            value={formik.values.cpf} />
                    </div>
                </div>
                <div className="field column is-half">
                    <label className="label" htmlFor="cpf">Data Nascimento*</label>
                    <div className="control">
                        <InputDate id="dataNascimento"
                            name="dataNascimento"
                            label="Data de Nascimento*:"
                            autoComplete="off"
                            className="input"
                            onChange={formik.handleChange}
                            value={formik.values.dataNascimento} />
                    </div>
                </div>
            </div>
            <div className="columns">
                <Input id="endereco"
                    name="endereco"
                    label="Endereço: *"
                    autoComplete="off"
                    columnClasses="is-full"
                    onChange={formik.handleChange}
                    value={formik.values.endereco}
                    error={formik.errors.endereco}
                />
            </div>
            <div className="columns">
                <Input id="email"
                    name="email"
                    label="Email*:"
                    autoComplete="off"
                    columnClasses="is-half"
                    onChange={formik.handleChange}
                    value={formik.values.email} />
                <div className="field column is-half">
                    <label className="label" htmlFor="cpf">Telefone*</label>
                    <div className="control">
                        <InputFone id="telefone"
                            name="telefone"
                            label="Telefone*:"
                            autoComplete="off"
                            className="input"
                            onChange={formik.handleChange}
                            value={formik.values.telefone} />
                    </div>
                </div>

            </div>
            <div className="field is-grouped">
                <div className="control is-link">
                    <button className="button" type="submit">
                        {formik.values.id ? "Atualizar" : "Salvar"}
                    </button>
                </div>
            </div>
        </form >
    )

}