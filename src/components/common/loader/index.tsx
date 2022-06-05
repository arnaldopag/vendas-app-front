import React from "react"

interface LoaderProps {
    show: boolean
}

export const Loader: React.FC<LoaderProps> = ({
    show
})=> {
    if(!show){
        return <React.Fragment></React.Fragment>
    }
    return (
        <div id="loader" style={{
            background: 'rgba(255,255,255,0.5)',
            width: '100%',
            zIndex: 999999,
            position: 'absolute',
            left: '20%',
            top: '30%'

        }}>
            <div style={{
                position: 'absolute',
                left: '20%',
                top: '30%'
            }}>
                <div className="lds-hourglass"></div>
            </div>

        </div>
    )

}