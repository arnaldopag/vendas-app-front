import { InputHTMLAttributes } from 'react'
import { formatReal } from 'app/util/money'
import { FormatUtils } from "/home/arnaldo/Documents/next-app/vendas-app/node_modules/@4us-dev/utils/lib/src/index"

const formatUtils = new FormatUtils();


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
    const onInputChange = (event) => {
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

export const InputCpf: React.FC<InputProps> =( props : InputProps) =>{
    return(
        <input {...props} formatter ={formatUtils.formatCPF} />
    )
}
