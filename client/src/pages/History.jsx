import React from 'react'
import useAccess from '../utils/accessComp'
const History = () => {
    const [access] = useAccess("http://localhost:3000/history")
    return (
      <div className='h-[100vh] flex justify-center items-center text-3xl text-green-600'>
      {
          access && <div className='h-[100vh] flex justify-center items-center text-3xl text-green-600'>History</div>
      }
      </div>
    )
}

export default History