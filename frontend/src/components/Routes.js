import React from 'react'
import { Routes as Switch, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Customers from './Customers';
import Cars from './Cars';
import Form from './Form';
import SalesDetail from './SalesDetail';
import SalesForm from './SalesForm';

const Routes = () => {
    const customersOptions = useSelector(state => state.customers)
    const carsOptions = useSelector(state => state.cars)
    return (
        <Switch>
            <Route exact path='/cars'
                element={<Cars />} />
            <Route exact path='/cars/edit'
                element={<Form fields={['_id', 'licensePlate', 'make', 'model', 'color', 'prize']} data={carsOptions.selectedCar} handleSend={carsOptions.sendFunction} />} />
            <Route exact path='/cars/new'
                element={<Form fields={['licensePlate', 'make', 'model', 'color', 'prize']} handleSend={carsOptions.sendFunction} create />} />
            <Route exact path='/customers'
                element={<Customers />} />
            <Route exact path='/customers/edit'
                element={<Form fields={['_id', "firstName", "lastName", "email", "phone"]} data={customersOptions.selectedCustomer} handleSend={customersOptions.sendFunction} />} />
            <Route exact path='/customers/new'
                element={<Form fields={["firstName", "lastName", "email", "phone"]} handleSend={customersOptions.sendFunction} create />} />
            <Route exact path='/customers/sales' element={<SalesDetail />}/>  
            <Route exact path='/customers/sales/new' element={<SalesForm />} />  
        </Switch>

    )
}

export default Routes