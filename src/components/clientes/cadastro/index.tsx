import { Cliente } from "app/models/clientes"
import { Layout } from "components/layout"
import { useState } from "react"
import { ClienteForm } from "./form"
import { useClienteService } from "app/services"


export const CadastroClientes: React.FC = () => {

    const [cliente , setCliente] = useState<Cliente>({})
    const service = useClienteService()
    const handleSubmit = (cliente : Cliente) => {
        if(cliente.id){
            service.update(cliente).then( response => {
                console.log("atualizado")
            })
        }else{
            service.save(cliente).then( clienteSalvo => {
                setCliente(clienteSalvo)
            })
        }
    }

    return(
    <Layout titulo="Clientes">
        <ClienteForm cliente={cliente} onSubmit={handleSubmit}></ClienteForm>
    </Layout>
    )
}