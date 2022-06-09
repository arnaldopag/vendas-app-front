import { InputHTMLAttributes } from 'react'
import { formatReal } from 'app/util/money'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    
    id: string;
    label: string;
    columnClasses?: string;
    currency?: boolean;
    error?: string;

}

export const Input: React.FC<InputProps> = ({
    label,
    columnClasses,
    id,
    currency,
    error,
    ...props
}: InputProps) => {
    const onInputChange = (event) => {
        let value = event.target.value;
        if (value && currency) {
            value = formatReal(value)
        }
    }
    return (
        <div className={`field column ${columnClasses}`}>
            <label htmlFor={id} className='label'>
                {label}
            </label>
            <div className='control'>
                <input className='input'
                    id={id} {...props}/>
                {error &&
                    <p className='help is-danger'>{error}</p>

                }
            </div>
        </div>
    )
}