import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    onChange?: (value: any) => void;
    id: string;
    label: string;
    columnClasses?: string;

}

export const Input: React.FC<InputProps> = ({

    onChange,
    label,
    columnClasses,
    id,
    ...props
}: InputProps) => {
    return (
        <div className={`field column ${columnClasses}`}>
            <label htmlFor={id} className='label'>
                {label}
            </label>
            <div className='control'>
                <input className='input'
                    id={id} {...props}
                    onChange={event => {
                        if (onChange) {
                            onChange(event.target.value)
                        }
                    }} />
            </div>
        </div>
    )
}