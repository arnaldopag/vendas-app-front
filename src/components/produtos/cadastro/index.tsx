import { useState } from 'react'
import { Layout, Input } from 'components'
import { useProdutoService } from 'app/services'
import { Produto } from 'app/models/produtos'

export const CadastroProdutos: React.FC = () => {
    const service = useProdutoService()
    const [codigo, setCodigo] = useState<string>('')
    const [preco, setPreco] = useState<string>('')
    const [nome, setNome] = useState<string>('')
    const [descricao, setDescricao] = useState<string>('')

    const submit = () => {
        const produto: Produto = {
            codigo,
            preco: parseFloat(preco),
            nome,
            descricao
        }
        service.save(produto).then(produtoResposta => console.log(produto))
    }

    return (
        <Layout titulo='Cadastro De Produtos'>
            <div className='columns'>
                <Input label='Codigo*' columnClasses='is-half'
                    onChange={setCodigo}
                    id="inputCodigo"
                    placeholder='Coloque o código do objeto' />

                <Input label='Preço*' columnClasses='is-half'
                    onChange={setPreco}
                    id="inputPreco"
                    placeholder='Coloque o Preço do objeto' />
            </div>
            <Input label='Nome*:' columnClasses='is-full'
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
                    <button onClick={submit} className='button is-link'>Salvar</button>
                </div>
                <div className='control'>
                    <button className='button is-link is-light'>Voltar</button>
                </div>
            </div>
        </Layout >
    )
}
