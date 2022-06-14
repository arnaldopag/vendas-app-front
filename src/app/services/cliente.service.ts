import { httpClient } from "app/http";
import { Cliente } from "app/models/clientes";
import { AxiosResponse } from "axios";


const resourceUrl: string ="/api/clientes"


export const useClienteService = () =>{

    const save = async (cliente : Cliente) : Promise<Cliente> =>{
        const response : AxiosResponse<Cliente> = await httpClient.post<Cliente>(resourceUrl, cliente)
        return response.data;
    }
    const update =async (cliente : Cliente) :Promise<void> => {
        const url:string = `${resourceUrl}/${cliente.id}`
         await httpClient.put<Cliente>(url,cliente)
    }
    const getById = async (id:number) : Promise<Cliente> => {
        const url:string = `${resourceUrl}/${id}`
        const response : AxiosResponse<Cliente> = await httpClient.get(url);
        return response.data;
    }
    const deletar= async (id : string) :Promise<void> => {
        const url:string = `${resourceUrl}/${id}`
        await httpClient.delete(url)
    }
    return{
        save,
        update,
        getById,
        deletar
    }
}