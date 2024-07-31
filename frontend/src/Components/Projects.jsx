import React from 'react'
import { Link } from 'react-router-dom'

const Projects = () => {
  return (
    <div>
      <div className='h-[88vh] overflow-x-auto flex justify-start items-start scrollbar-hide'>
        <div className='grid grid-cols-2 gap-2'>
            {
                [1,2,3,4,5,6,7,8,9,12,45,78,23,65,54,87,98].map((img,i)=><Link key={i} className=' w-full h-[90px] overflow-hidden rounded-sm cursor-pointer'>
                    <img className=' w-[150px] h-[150px] object-fill' src={'http://localhost:5173/Arpit.jpg'} alt='image' />

                </Link>)
            }

        </div>
      </div>
    </div>
  )
}

export default Projects