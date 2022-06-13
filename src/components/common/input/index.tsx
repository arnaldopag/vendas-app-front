import { ChangeEvent, InputHTMLAttributes } from 'react'
import { formatReal } from 'app/util/money'
import {FormatUtils} from '@4us-dev/utils'
import { format } from 'path'
import { idText } from 'typescript'

const formatUtil = new FormatUtils()

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {

    id: string;
    label: string;
    columnClasses?: string;
    currency?: boolean;
    error?: string;
    formatter?: (value: string) => string;
}

export const Input: React.FC<InputProps> = ({
    label,
    columnClasses,
    id,
    error,
    onChange,
    formatter,
    ...props
}: InputProps) => {

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const name = event.target.name;

        const formattedValue = (formatter && formatter(value as string)) || value
        onChange({
            ...event,
            target: {
                name,
                value: formattedValue
            }
        })
    }
    return (
        <div className={`field column ${columnClasses}`}>
            <label htmlFor={id} className='label'>
                {label}
            </label>
            <div className='control'>
                <input className='input'
                    onChange={onInputChange}
                    id={id} {...props} />
                {error &&
                    <p className='help is-danger'>{error}</p>
                }
            </div>
        </div>
    )
}

export const InputMoney: React.FC<InputProps> = (props: InputProps) => {
    return (
        <input {...props} formatter={formatReal} />
    )
}

export const InputCpf: React.FC<InputProps> = (props: InputProps) => {
    return (
        <input {...props} formatter={formatUtil.formatCPF} />
    )
}
export const InputFone: React.FC<InputProps> = (props: InputProps) => {
    return (
        <input {...props} formatter={formatUtil.formatPhone} />
    )
}
export const InputDate: React.FC<InputProps> = (props: InputProps) => {

    const formatData = (value : string) =>{
        if(!value){
            return ''
        }
        const data  = formatUtil.formatOnlyIntegers(value)
        const size = value.length
        if(size <= 2){
            return data
        }       
        if(size<=4){
            return data.substr(0,2) + "/" + data.substring(2,2)
        }
        if(size <=6){
            return data.substr(0,2) + "/" + data.substring(2,2) + '/' +data.substring(4,2) 
        }
    }

    return (
        <input {...props} maxLength={10} formatter={formatData} />
    )
}