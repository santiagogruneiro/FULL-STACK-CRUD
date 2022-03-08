import React, { useEffect, useState } from 'react'
import { Link,useLocation } from 'react-router-dom'

const Header = () => {
    const [active, setActive] = useState(0)
    const location = useLocation()
    useEffect(()=>{
       if(location.pathname.includes('customers')) setActive(0)
       else setActive(1)
    },[location])
 
    const activeStyle = {
        background: "lightgray",
        cursor: "pointer",
        
    }
    const defaultStyle = {
        cursor: "pointer"
    }
    return (
        <nav style={{borderBottom:'1px solid lightgray',marginBottom:'30px'}} className="navbar navbar-default d-flex justify-content-start">
            <Link to='/customers' style={active === 0 ? activeStyle : defaultStyle} className='nav-link text-dark' >Customers</Link>
            <Link to='/cars' style={active === 1 ? activeStyle : defaultStyle} className='nav-link text-dark'>Cars</Link>
        </nav>
    )
}
export default Header