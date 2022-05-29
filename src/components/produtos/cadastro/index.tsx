import { useState } from 'react'
import { Layout, Input, Message } from 'components'
import { useProdutoService } from 'app/services'
import { Produto } from 'app/models/produtos'
import { converterEmBigDecimal } from 'app/util/money'
import { Alert } from 'components/common/message'
import * as yup from 'yup'
import { json } from 'stream/consumers'

const validationSchema = yup.object().shape({
    codigo: yup.string().required(),
    nome: yup.string().required(),
    descricao: yup.string().required(),
    preco: yup.number().required(),

})

export const CadastroProdutos: React.FC = () => {
    const service = useProdutoService()
    const [codigo, setCodigo] = useState<string>('')
    const [preco, setPreco] = useState<string>('')
    const [nome, setNome] = useState<string>('')
    const [descricao, setDescricao] = useState<string>('')
    const [id, setId] = useState<string>()
    const [dataCadastro, setCadastro] = useState<string>()
    const [messages, setMessages] = useState<Array<Alert>>([])

    const submit = () => {
        const produto: Produto = {
            id,
            codigo,
            preco: converterEmBigDecimal(preco),
            nome,
            descricao
        }
        validationSchema.validate(produto).then(obj => {
            if (id) {
                service.update(produto)
                    .then(response => setMessages([{
                        tipo: "success", texto: "Produto Atualizado com sucesso"
                    }]))
            } else {
                service.save(produto).then(produtoResposta => {
                    setId(produtoResposta.id)
                    setCadastro(produtoResposta.cadastro)
                    setMessages([{
                        tipo: "success", texto: "Produto Cadastrado com sucesso"
                    }])
                })
            }

        }).catch(err => {
            const field = err.path;
            const message = err.message
            setMessages([{
                tipo: "danger", field, texto: message
            }])
            console.log(JSON.parse(JSON.stringify(err)))
        })

    }

    return (
        <Layout titulo='Cadastro De Produtos' mensagens={messages}>
            {id &&
                <div className='columns'>
                    <Input label='Id'
                        value={id}
                        columnClasses='is-half'
                        id="inpuId"
                        disabled
                    />

                    <Input label='Data Cadastro:'
                        columnClasses='is-half'
                        value={dataCadastro}
                        id="inputDataCadastro"
                        disabled
                    />
                </div>
            }

            <div className='columns'>
                <Input label='Codigo*' columnClasses='is-half'
                    onChange={setCodigo}
                    id="inputCodigo"
                    placeholder='Coloque o código do objeto' />

                <Input label='Preço*' columnClasses='is-half'
                    onChange={setPreco}
                    value={preco}
                    id="inputPreco"
                    placeholder='Coloque o Preço do objeto'
                    currency={true}
                    maxLength={16}
                />
            </div>
            <Input label='Nome*:'
                columnClasses='is-full'
                onChange={setNome}
                id="inputNome"
                placeholder='Coloque o nome do objeto' />

            <div className='columns'>
                <div className='field column is-full'>
                    <label htmlFor='inputDescricao' className='label'>
                        Descrição:
                    </label>
                    <div className='control'>
                        <input className='textarea'
                            id='inputDescricao' value={descricao}
                            onChange={event => setDescricao(event.target.value)}
                            placeholder='Digite a descrição do produto' />
                    </div>
                </div>
            </div>

            <div className='field is-grouped'>
                <div className='control'>
                    <button onClick={submit} className='button is-link'>
                        {id ? "Atualizar" : "Salvar"}
                    </button>
                </div>
                <div className='control'>
                    <button className='button is-link is-light'>Voltar</button>
                </div>
            </div>
        </Layout >
    )
}
