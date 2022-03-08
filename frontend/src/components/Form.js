import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import { useNavigate } from 'react-router-dom'
import './mediaquery/media.css'
const Form = ({ fields, data, handleSend, create }) => {
    const [loading, setLoading] = useState(true)
    const [newData, setNewData] = useState()
    useEffect(() => {
        setNewData([data])
        setLoading(false)
    }, [data])

    let navigate = useNavigate()

    // useEffect(() => {
    //     let timer = setTimeout(() => {
    //         setLoading(false)
    //     }, 700);
    //     return () => clearTimeout(timer)
    // }, [])
    const handleChange = ({ target: { value, name } }) => {
        // setNewData({...newData[0],[name]:value})
        const newObj = [{ ...newData[0], [name]: value }]
        setNewData(newObj)

    }
    return (
        <>
            {loading ? (
                <Loader loading={loading} />
            ) : (
                <div className="form form-group border rounded-3 p-5 d-flex flex-column justify-items-center align-items-center w-50 align-self-center">
                    {
                        fields.map((field, index) => (
                            <>
                                <label>{field}</label>
                                {!create && newData.map((el, index) => (
                                    <input
                                        name={field}
                                        value={el[field]}
                                        readOnly={field === '_id' ? true : false}
                                        type={field === 'email' ? 'email' : 'text'}
                                        className={'form-control mb-4 w-100'}
                                        onChange={handleChange} />
                                ))}
                                {create && (
                                    <input
                                        name={field}
                                        type={field === 'email' ? 'email' : 'text'}
                                        className={'form-control mb-4 w-100'}
                                        onChange={handleChange}
                                    />
                                )}
                            </>
                        ))
                    }
                    <div className="buttons-container d-flex w-75 align-self-center px-5 justify-content-around">
                        <button onClick={() => handleSend(newData[0], create)} className="btn btn-success ">Send</button>
                        <button onClick={() => navigate(-1)} className="btn btn-danger ">Cancel</button>
                    </div>
                </div>
            )}

        </>
    )
}

export default Form