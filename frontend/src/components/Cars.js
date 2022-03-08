import React, { useEffect, useState } from 'react'
import Table from './Table'
import { useDispatch, useSelector } from 'react-redux'
import { carsHandler } from '../services/carsHandler'
import { updateElement,validateObjectFields } from '../lib/utils'
import { addCar, removeCar, setCarsSendDataFunction, setWindowConfirmDeleteIsOpen, setSelectedCar } from '../redux/actions/cars.actions'
import { useNavigate } from 'react-router-dom'
import ConfirmDelete from './ConfirmDelete'
import { filterByLicensePlate } from '../lib/filter/cars.filter'
const Cars = () => {
  const { cars, selectedCar,windowConfirmDeleteIsOpen } = useSelector(state => state.cars)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [filteredData,setFilteredData] = useState([])
  const handleSelectedCar = (carId) => {
    const carSelected = cars.find(el => el._id === carId)
    dispatch(setSelectedCar(carSelected))
  }
  const handleSend = (data, create) => {
    if (!create) handleEdit(data)
    else handleCreate(data)
  }
  const handleEdit = (data) => {
    if (validateObjectFields(data)) {
      carsHandler.update(data._id, data)
        .then(newObj => {
          let oldObj = cars.find(e => e._id === newObj._id)
          oldObj = updateElement(oldObj, newObj)
          navigate(-1)
        })
    } else alert('Please, fill in all fields before sending')
  }
  const handleCreate = (data) => {
    if (validateObjectFields(data)) {
      carsHandler.create(data)
        .then(res => dispatch(addCar(res)))
      navigate(-1)
    } else alert('Please, fill in all fields before sending')
  }
  const handleDeleteWindow = (el) => {
    handleSelectedCar(el._id)
    dispatch(setWindowConfirmDeleteIsOpen('flex'))
  }
  const handleConfirmDelete = () => {
    let id = selectedCar._id
    carsHandler.remove(id)
      .then(res => {
       res && dispatch(removeCar(res._id))
      })
    dispatch(setWindowConfirmDeleteIsOpen('none'))
  }
  useEffect(() => {
    dispatch(setCarsSendDataFunction(handleSend))
    dispatch(setWindowConfirmDeleteIsOpen('none'))
  }, [])

  const handleSearch = ({target:{value}}) => {
    let filteredData = filterByLicensePlate(cars,value.toUpperCase())
    if(filteredData.length > 0) setFilteredData(filteredData)
  }

  return (
    <>
      <Table
        headers={['_id', 'licensePlate', 'make', 'model', 'color', 'prize', 'status']}
        data={filteredData.length > 0 ? filteredData : cars && cars}
        editPath={'/cars/edit'}
        newPath={'/cars/new'}
        handleSelected={handleSelectedCar}
        handleDeleteWindow={handleDeleteWindow} 
        filterData
        handleSearch={handleSearch}
        />

      <ConfirmDelete
        title={`The element with id ${selectedCar  &&  selectedCar._id} will be removed.`}
        isOpen={windowConfirmDeleteIsOpen}
        cancelFunction={() => dispatch(setWindowConfirmDeleteIsOpen('none'))}
        confirmFunction={handleConfirmDelete} />
    </>
  )
}

export default Cars