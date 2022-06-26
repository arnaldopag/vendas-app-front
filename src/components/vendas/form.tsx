import { Cliente } from "app/models/clientes";
import { Page } from "app/models/common/page";
import { Venda } from "app/models/vendas"
import { useClienteService } from "app/services";
import { useFormik } from "formik"
import {
    AutoComplete,
    AutoCompleteChangeParams,
    AutoCompleteCompleteMethodParams
} from 'primereact/autocomplete';
import { useState } from "react";
import { Button } from 'primereact/button'

interface VendasFormProps {
    onSubmit: (venda: Venda) => void
}
const formScheme: Venda = {
    cliente: null,
    produtos: [],
    total: 0,
    formaPagamento: ''
}

export const VendasForm: React.FC<VendasFormProps> = ({
    onSubmit
}) => {
    const service = useClienteService();

    const [listaClientes, setlistaClientes] = useState<Page<Cliente>>({
        content: [],
        first: 0,
        number: 0,
        size: 10,
        totalElements: 0
    })

    const formik = useFormik<Venda>({
        onSubmit,
        initialValues: formScheme
    })
    const handleClienteAutoComplete = (e: AutoCompleteCompleteMethodParams) => {
        const nome = e.query
        service
            .find(nome, '', 0, 20)
            .then(clientes => setlistaClientes(clientes))
    }
    const handleClienteChange = (e: AutoCompleteChangeParams) => {
        const clienteSelecionado: Cliente = e.value;
        formik.setFieldValue("cliente", clienteSelecionado)
    }
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="p-fluid">
                <div className="p-field">
                    <label htmlFor="cliente">Cliente: *</label>
                    <AutoComplete
                        suggestions={listaClientes.content}
                        value={formik.values.cliente}
                        completeMethod={handleClienteAutoComplete}
                        field="nome"
                        id="cliente"
                        name="cliente"
                        onChange={handleClienteChange} />
                </div>
                <Button type="submit" label="Finalizar" />
            </div>
        </form>
    )
}