import React, { useEffect } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { Link } from 'react-router-dom'
import FilterData from './FilterData'

const Table = ({ headers, data, handleDeleteWindow, detailsPath, hasDetails, editPath, handleSearch,handleSelected, newPath, handleSeeDetails, removeEditButton, detailsCreate, addSaleFunction, filterData }) => {

    const [widthOverThousand,setWidthOverThousand] = React.useState(window.innerWidth > 1000)

    useEffect(() => {
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    })
    const handleResize = () => {
        if(window.innerWidth > 1000) setWidthOverThousand(true)
        else setWidthOverThousand(false)
    }
    return (
        <>
            <div className="table-header d-flex  mb-3 justify-content-between ">
                <button style={{ width: '80px', height: '40px', position: 'relative' }} className="btn btn-dark align-self-start text-light px-4">
                    <Link to={newPath} style={{ textDecoration: 'none', color: 'white', position: 'absolute', top: '0', right: '0', left: '0', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        New
                    </Link>
                </button>
                {filterData &&  <FilterData display={widthOverThousand ? 'd-flex' : 'd-none'} handleSearch={handleSearch} /> }
            </div>
            <table className="table table-striped text-center align-middle">
                <thead>
                    <tr>
                        {headers && headers.map((el, index) => (
                            <th key={index} scope="col">{el}</th>
                        ))}
                        {hasDetails && <th scope='col'>Sales detail</th>}
                        {!removeEditButton && <th scope='col'><MdEdit /></th>}
                        <th scope='col'><MdDelete /></th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((el, index) => (
                        <tr>
                            {headers.map((header, i) => (
                                <td className={header === 'status' && el[header] === 'Sold' ? 'text-danger' : el[header] === 'Available' && 'text-success'} key={i}>{el[header]}</td>
                            ))}
                            {hasDetails && <td>{el.sales.length > 0 ? <Link onClick={() => handleSeeDetails(el)} to={detailsPath}>Details</Link> : <Link to={detailsCreate} onClick={() => addSaleFunction(el._id)} >Add</Link>}</td>}
                            {!removeEditButton && <td>
                                <button style={{ width: '70px', height: '40px', position: 'relative' }} className="btn btn-info">
                                    <Link
                                        style={{ textDecoration: 'none', color: 'white', position: 'absolute', top: '0', right: '0', left: '0', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                        onClick={() => handleSelected(el._id)}
                                        to={editPath || '/'}>Edit</Link>
                                </button>
                            </td>}
                            <td>
                                <button onClick={() => handleDeleteWindow(el)} style={{ width: '70px', height: '40px', position: 'relative' }} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Table