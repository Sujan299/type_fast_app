import React from 'react'
import useAccess from '../utils/accessComp'
const Achievement = () => {
    const [access] = useAccess("http://localhost:3000/achivement")
  console.log(access)

  return (
    <div className='h-[100vh] flex justify-center items-center text-3xl text-green-600'>
    {
        access && <div>Achivements</div>
    }
    </div>
  )
}

export default Achievement