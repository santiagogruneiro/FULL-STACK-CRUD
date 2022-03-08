import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filterByLicensePlate } from '../lib/filter/cars.filter'
import { useNavigate } from 'react-router-dom'
import { validateObjectFields } from '../lib/utils'
import { salesHandler } from '../services/salesHandler'
import { addSale, setSelectedSale } from '../redux/actions/sales.actions'
import { customersHandler } from '../services/customersHandler'
import { setCustomersData } from '../redux/actions/customers.actions'
import { setCarsData } from '../redux/actions/cars.actions'

const SalesForm = () => {
    const [suggestions, setSuggestions] = useState()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [saleToCreate, setSaleToCreate] = useState({ customer: '', car: '' })
    const [selectedSuggestion, setSelectedSuggestion] = useState()
    const [hover, setHover] = useState({ hovered: false, item: '' })
    const { cars } = useSelector(state => state.cars)
    const { selectedCustomer, customers } = useSelector(state => state.customers)
    const itemStyle = {
        cursor: "default",
    }
    const styleHover = {
        background: 'lightgray',
    }
    useEffect(() => selectedCustomer && setSaleToCreate({ ...saleToCreate, customer: selectedCustomer._id }), [selectedCustomer])
    const handleSearch = ({ target: { value } }) => {
        if (value.trim()) {
            const suggestedCars = filterByLicensePlate(cars, value.toUpperCase().trim(), true)
            setSuggestions(suggestedCars)
        } else setSuggestions('')
    }
    const handleSelectItem = (element) => {
        setSelectedSuggestion(element.licensePlate)
        setSaleToCreate({ ...saleToCreate, car: element._id })
        setSuggestions(null)
    }
    const handleBlur = () => {
        let timer = false
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
            setSuggestions(null)
        }, 300);
    }
    const handleSend = () => {
        if (validateObjectFields(saleToCreate)) {
            salesHandler.create(saleToCreate).then(res => {
                dispatch(addSale(res))
                salesHandler.findById(res.customer).then(res => res && dispatch(setSelectedSale(res)))
                const customerToUpdate = customers.find(c => c._id === res.customer)
                customerToUpdate.sales.push(res)
                const carToUpdate = cars.find(c => c._id === res.car)
                carToUpdate.status = 'Sold'
                dispatch(setCarsData(cars))
                dispatch(setCustomersData(customers))
                navigate('/customers/sales')
            })
        }
        else alert('Please, fill in the field before sending.')
    }
    return (
        <>
            <p className="h3 align-self-center mb-5">{`Create a sale for ${selectedCustomer && selectedCustomer.firstName} ${selectedCustomer && selectedCustomer.lastName}`}</p>
            <div style={{ height: '70vh' }} className="form-group w-75 d-flex align-self-center justify-content-around">
                <div className='w-50'>
                    <label>Enter car's license plate</label>
                    <input onFocus={handleSearch} onBlur={handleBlur}
                        onKeyDown={(e) => {
                            e.key === 'Backspace' && setSelectedSuggestion(null)
                            setSaleToCreate({ ...saleToCreate, car: '' })
                        }}
                        type="text" value={selectedSuggestion && selectedSuggestion} onChange={handleSearch} className="form-control px-3" />
                    <div className="suggestions d-flex flex-column border ">
                        {suggestions && suggestions.map(e => (
                            <span
                                style={{ ...itemStyle, ...(hover.hovered && hover.item === e.licensePlate ? styleHover : null) }}
                                value={e._id}
                                className="item d-flex justify-content-start  px-3"
                                onClick={() => handleSelectItem(e)}
                                onMouseEnter={() => setHover({ hovered: true, item: e.licensePlate })}
                                onMouseLeave={() => setHover(false)}
                            >
                                <p className="licensePlate m-0">{e.licensePlate + '-'}</p>
                                <p className="make m-0 ">{e.make + '-'}</p>
                                <p className="model m-0">{e.model + '-'}</p>
                                <p className="color m-0 ">{e.color}</p>
                            </span>
                        ))}
                    </div>
                </div>
                <div style={{ height: '25%', paddingTop: '24px', width: '300px' }} className="buttons d-flex align-items-start justify-content-start">
                    <button style={{ width: '90px' }} onClick={handleSend} className="btn btn-success mx-2">Send</button>
                    <button style={{ width: '90px' }} onClick={() => navigate(-1)} className="btn btn-danger">Cancel</button>
                </div>
            </div>
        </>
    )
}

export default SalesForm