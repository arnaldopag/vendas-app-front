import * as yup from "yup"

const campoObrigatorioMensagem = "Campo Obrigatório";
const campoObrigatorioValidation = yup.string().trim().required(campoObrigatorioMensagem)

export const validationScheme = yup.object().shape({

    cpf: campoObrigatorioValidation.length(14, "CPF Inválido"),
    dataNascimento: campoObrigatorioValidation.length(10, "Data Inválida"),
    email: campoObrigatorioValidation.email("Email Inválido"),
    endereco: campoObrigatorioValidation,
    nome: campoObrigatorioValidation,
    telefone: campoObrigatorioValidation
})