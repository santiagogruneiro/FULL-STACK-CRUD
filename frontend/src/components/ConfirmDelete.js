import React, { useEffect, useState } from 'react'

const ConfirmDelete = ({ isOpen, confirmFunction, cancelFunction, title }) => {

    const [displayed, setDisplayed] = useState('none')
    useEffect(() => setDisplayed(isOpen), [isOpen])
    const style = { position: "fixed", left: "50%", top: '50%', transform: "translate(-50%, -50%)", borderRadius: '5px', width: "50px", height: "50px", display: displayed, flexDirection: 'column', justifyContent: 'center', alignItems: "center", width: '500px', height: '200px', padding: '20px', boxShadow: '0px 0px 5px 1px #DCDCDC',zIndex:'100',background:'#FFFFFF' }
    return (
        <>
            <div style={style} className="container delete text-center">
                <p style={{ fontWeight: '500' }} className="h6">{title}</p>
                <div className="buttons-container mt-4">
                    <button onClick={confirmFunction} className="btn btn-danger mx-2">Confirm</button>
                    <button onClick={cancelFunction} className="btn btn-info text-light mx-2">Cancel</button>
                </div>
            </div>
        </>
    )
}

export default ConfirmDelete