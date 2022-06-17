import { Cliente } from "app/models/clientes"
import { Layout } from "components/layout"
import { useState } from "react"
import { ClienteForm } from "./form"
import { useClienteService } from "app/services"
import { Alert } from "components/common/message"


export const CadastroClientes: React.FC = () => {

    const [cliente , setCliente] = useState<Cliente>({})
    const [messages, setMessages] = useState<Array<Alert>>([])
    const service = useClienteService()
    const handleSubmit = (cliente : Cliente) => {
        if(cliente.id){
            service.update(cliente).then( response => {
                setMessages([{
                    tipo: "success", texto: "Cliente Atualizado com sucesso"
                }])
            })
        }else{
            service.save(cliente).then( clienteSalvo => {
                setCliente(clienteSalvo)
                setMessages([{
                    tipo: "success", texto: "Produto Salvo com sucesso"
                }])
            })
        }
    }

    return(
    <Layout titulo="Clientes" mensagens={messages}>
        <ClienteForm cliente={cliente} onSubmit={handleSubmit}></ClienteForm>
    </Layout>
    )
}