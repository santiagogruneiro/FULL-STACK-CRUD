import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import { useSelector, useDispatch } from 'react-redux'
import { setCustomersData } from './redux/actions/customers.actions'
import { setCarsData } from './redux/actions/cars.actions'
import { setSalesData } from './redux/actions/sales.actions'
import { salesHandler } from './services/salesHandler'
import { carsHandler } from './services/carsHandler'
import { customersHandler } from './services/customersHandler'
import { useNavigate } from 'react-router-dom'
import Loader from './components/Loader';
import Routes from './components/Routes';

function App() {
  const state = useSelector(state => state)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const customers = useSelector(state => state.customers.customers)
  useEffect(() => {
    navigate('/customers')
    customersHandler.findAll().then(data => dispatch(setCustomersData(data)))
    carsHandler.findAll().then(data => dispatch(setCarsData(data)))
    salesHandler.findAll().then(data => dispatch(setSalesData(data)))
  }, [])
  // useEffect(() => {
  //   let timer = setTimeout(() => {
  //     customersHandler.findAll().then(data => dispatch(setCustomersData(data)))
  //     carsHandler.findAll().then(data => dispatch(setCarsData(data)))
  //     salesHandler.findAll().then(data => dispatch(setSalesData(data)))
  //   }, 5000);

  //   return () => clearTimeout(timer)
  // })
  useEffect(() => {
    if (customers) setLoading(false)
  }, [customers])

  return (
    <div className="container-fluid d-flex flex-column">
      <Header />
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <Routes />
      )}
    </div>

  );
}

export default App;
