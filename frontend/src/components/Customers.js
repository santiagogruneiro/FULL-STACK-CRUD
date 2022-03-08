import React, { useEffect,useState } from 'react'
import Table from './Table'
import { useSelector, useDispatch } from 'react-redux'
import { customersHandler } from '../services/customersHandler'
import { salesHandler } from '../services/salesHandler'
import { setSelectedCustomer, setCustomerSendDataFunction, windowConfirmDeleteIsOpen, removeCustomer, addCustomer } from '../redux/actions/customers.actions'
import { setSelectedSale } from '../redux/actions/sales.actions'
import { validateObjectFields, updateElement } from '../lib/utils'
import { useNavigate } from 'react-router-dom'
import ConfirmDelete from './ConfirmDelete'
import FilterData from './FilterData'
import { filterByName } from '../lib/filter/customers.filter'
const Customers = () => {
  const navigate = useNavigate()
  const customersReducer = useSelector(state => state.customers)
  const dispatch = useDispatch()
  const [filteredData,setFilteredData] = useState([])
  const handleSelectedCustomer = (customerId) => {
    const customerSelected = customersReducer.customers.find(el => el._id === customerId)
    dispatch(setSelectedCustomer(customerSelected))
  }
  const handleSend = (data, create) => {
    if (!create) handleEdit(data)
    else handleCreate(data)
  }
  const handleEdit = (data) => {
    if (validateObjectFields(data)) {
      customersHandler.update(data._id, data)
        .then(newObj => {
          let oldObj = customersReducer.customers.find(e => e._id === newObj._id)
          oldObj = updateElement(oldObj, newObj)
          navigate(-1)
        })
    } else alert('Please, fill in all fields before sending')
  }
  const handleCreate = (data) => {
    if (validateObjectFields(data)) {
      customersHandler.create(data)
        .then(res => dispatch(addCustomer(res)))
      navigate(-1)
    } else alert('Please, fill in all fields before sending')
  }
  const handleDeleteWindow = (el) => {
    handleSelectedCustomer(el._id)
    dispatch(windowConfirmDeleteIsOpen('flex'))
  }
  const handleConfirmDelete = () => {
    let id = customersReducer.selectedCustomer._id
    customersHandler.remove(id)
      .then(res => {
        dispatch(removeCustomer(res._id))
      })
    dispatch(windowConfirmDeleteIsOpen('none'))
  }
  const handleSeeDetails = (customer) => {
    handleSelectedCustomer(customer._id)
    salesHandler.findById(customer._id).then(res =>res && dispatch(setSelectedSale(res)))
  }
  useEffect(() => {
    dispatch(setCustomerSendDataFunction(handleSend))
    dispatch(windowConfirmDeleteIsOpen('none'))
  }, [])

const handleSearch = ({target:{value}}) => {
  let filteredData = filterByName(customersReducer.customers,value.toLowerCase())
  if(filteredData.length > 0) setFilteredData(filteredData)
}

  return (
    <>
    
      <Table
        handleDeleteWindow={handleDeleteWindow}
        headers={['_id', 'firstName', 'lastName', 'email', 'phone']}
        data={filteredData.length > 0 ? filteredData : customersReducer.customers && customersReducer.customers}
        hasDetails
        detailsPath={'/customers/sales'}
        editPath={'/customers/edit'}
        newPath={'/customers/new'}
        handleSelected={handleSelectedCustomer}
        handleSeeDetails={handleSeeDetails}
        detailsCreate={'/customers/sales/new'}
        addSaleFunction={handleSelectedCustomer}
        filterData
        handleSearch={handleSearch}
      />
      <ConfirmDelete
        title={`The element with id ${customersReducer.selectedCustomer && customersReducer.selectedCustomer._id} will be removed.`}
        isOpen={customersReducer.windowConfirmDeleteIsOpen}
        cancelFunction={() => dispatch(windowConfirmDeleteIsOpen('none'))}
        confirmFunction={handleConfirmDelete} />
    </>
  )
}

export default Customers