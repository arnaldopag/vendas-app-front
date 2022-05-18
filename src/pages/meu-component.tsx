import React from "react";

interface MensagemProps{
    mensagem: string;
}

interface numeroProps{
    numero: number;
}
const Mensagem: React.FC<MensagemProps> = (props: MensagemProps) =>{
    return(
     <div>
       {props.mensagem}
     </div>
       
    )
}

const Numero :React.FC <numeroProps> = (props: numeroProps) =>{
    return(
        <div>
            {props.numero}
        </div>
    )
}

const meuComponent = () => {
    return(
        <div>
            <Mensagem mensagem = "Component"/>
            <Numero  numero={20}/>
        </div>
    )
}
// exportar função
export default meuComponent
