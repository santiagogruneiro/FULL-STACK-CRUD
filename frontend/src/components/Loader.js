import React from 'react'
import BounceLoader from 'react-spinners/BounceLoader'


const Loader = (loading) => {
  return (
    <div className="loader-container"
    style={{ position: "fixed", left: "50%", top: '50%', transform: "translate(-50%, -50%)", width: "50px", height: "50px", display: 'flex', alignItems: "center", justifyContent: 'center' }}>
    <BounceLoader size={50} color={'#209F82'} loading={loading} />
  </div>
  )
}

export default Loader