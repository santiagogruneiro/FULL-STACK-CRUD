import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, createDispatchHook } from 'react-redux'
import { setWindowConfirmDeleteIsOpen, removeCustomerSale } from '../redux/actions/sales.actions'
import Table from './Table'
import Loader from './Loader'
import ConfirmDelete from './ConfirmDelete'
import { salesHandler } from '../services/salesHandler'
import { customersHandler } from '../services/customersHandler'
import { setCustomersData } from '../redux/actions/customers.actions'
import { setCarsData } from '../redux/actions/cars.actions'

const SalesDetail = () => {
    const { selectedCustomer, customers } = useSelector(state => state.customers)
    const { selectedSales, windowConfirmDeleteIsOpen } = useSelector(state => state.sales)
    const {cars} = useSelector(state=>state.cars)
    const dispatch = useDispatch()
    const [data, setData] = useState()
    const [isOpen, setIsOpen] = useState('none')
    const [saleToDelete, setSaleToDelete] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        selectedSales && dataBuilder()
    }, [selectedSales])
    const dataBuilder = () => {
        let obj = []
        selectedSales.forEach(element => {
            const { customer, car } = element
            obj = [...obj, {
                saleId: element._id,
                date: element.date,
                licensePlate: car.licensePlate,
                make: car.make,
                model: car.model,
                prize: car.prize
            }]
        })
        setData(obj)
    }

    useEffect(() => {
        let timer
        if (data) {
            timer = setTimeout(() => setLoading(false), 100);
        }
        return () => clearTimeout(timer)
    }, [data])

    const handleDeleteWindow = (el) => {
        const sale = selectedSales.find(e => e._id === el.saleId)
        setSaleToDelete(sale)
        setIsOpen('flex')
    }

    const handleDelete = () => {
        salesHandler.remove(saleToDelete._id)
            .then(res => {
                dispatch(removeCustomerSale(res._id))
                const customerToUpdate = customers.find(e => e._id === saleToDelete.customer._id)
                let index = customerToUpdate.sales.findIndex(({ _id }) => _id === saleToDelete._id)
                index !== -1 && customerToUpdate.sales.splice(index, 1)
                setIsOpen('none')
                const carToUpdate = cars.find(car=>car._id === res.car)
                carToUpdate.status = 'Available'
                dispatch(setCarsData(cars))
                dispatch(setCustomersData(customers))
                // customersHandler.findAll().then(data => dispatch(setCustomersData(data)))
                //update car status
            })
    }
    return (
        <>
            {
                loading ? (
                    <Loader />
                ) :
                    (<>
                        <h5 className="user align-self-center">{`${selectedCustomer.firstName} ${selectedCustomer.lastName}`}</h5>
                        <Table headers={['saleId', 'date', 'licensePlate', 'make', 'model', 'prize']} data={data} newPath={'/customers/sales/new'} removeEditButton handleDeleteWindow={handleDeleteWindow} />
                        <ConfirmDelete
                            isOpen={isOpen}
                            title={`The element with id ${saleToDelete && saleToDelete._id} will be removed`}
                            confirmFunction={handleDelete}
                            cancelFunction={() => setIsOpen('none')}
                        />
                    </>
                    )
            }
        </>
    )
}

export default SalesDetail