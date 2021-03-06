import { httpClient } from "app/http";
import { Produto } from "app/models/produtos";
import { AxiosResponse } from "axios";

const resourceUrl : string = "/api/produtos"


export const useProdutoService = () =>{
    const save = async (produto : Produto) : Promise<Produto>  => {
        const response: AxiosResponse<Produto> = await httpClient.post<Produto>(resourceUrl,produto)
        return response.data
    }
    const update = async ( produto : Produto) :Promise<void> => {
        const url:string = `${resourceUrl}/${produto.id}`
         await httpClient.put<Produto>(url,produto)
    }
    const getById = async (id:number) : Promise<Produto> => {
        const url:string = `${resourceUrl}/${id}`
        const response : AxiosResponse<Produto> = await httpClient.get(url);
        return response.data;
    }
    const deletar = async (id : string) :Promise<void> => {
        const url:string = `${resourceUrl}/${id}`
        await httpClient.delete(url)
    }
    return {
        save,
        update,
        getById,
        deletar
    }
}