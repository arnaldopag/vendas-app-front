import { useState } from 'react'
import { Layout } from 'components'

export const CadastroProdutos: React.FC = () => {

    const[codigo,setCodigo] = useState('')
    const[preco,setPreco] = useState('')
    const[nome,setNome] = useState('')
    const[descricao,setDescricao] = useState('')
    const submit = () =>{
        const produto = {
            codigo,preco,nome,descricao 
        }
        console.log(produto)
    }
    return (
        <Layout titulo='Cadastro De Produtos'>
            <div className='columns'>
                <div className='field column is-half'>
                    <label htmlFor='inputCodigo' className='label'>
                        Código: *
                    </label>
                    <div className='control'>
                        <input className='input'
                            id='inputCodigo' value={codigo} 
                            onChange={event => setCodigo(event.target.value)}
                            placeholder='Digite o código do produto' />
                    </div>
                </div>

                <div className='field column is-half'>
                    <label htmlFor='inputPreco' className='label'>
                        Preço:
                    </label>
                    <div className='control'>
                        <input className='input'
                            id='inputPreco' value={preco}
                            onChange={event => setPreco(event.target.value)}
                            placeholder='Digite o preço do produto' />
                    </div>
                </div>
            </div>
            <div className='columns'>
                <div className='field column is-full'>
                    <label htmlFor='inputNome' className='label'>
                        Nome:
                    </label>
                    <div className='control'>
                        <input className='input'
                            id='inputNome' value={nome}
                            onChange={event => setNome(event.target.value)}
                            placeholder='Digite o nome do produto' />
                    </div>
                </div>
            </div>
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
