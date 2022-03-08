import React from 'react'
import { MdSearch } from 'react-icons/md'
const FilterData = ({ handleSearch,display }) => {
    return (
        <>
            <div style={{position:'relative'}} className={`${display} align-items-center w-25 justify-content-end`}>
                <MdSearch style={{position:'absolute',left:'92%'}}/>
                <input style={{borderRadius:'5px',border:'1px solid',padding:'3px 8px',outline:'none'}} placeholder='Search...' type="text" onChange={handleSearch} className={`form-group w-75 align-self-center `} />
            </div>
        </>
    )
}

export default FilterData