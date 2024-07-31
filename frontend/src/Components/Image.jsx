import React from 'react'

const Image = ({add_image}) => {
  return (
    <div className=' grid grid-cols-2 gap-2'>
            {
                [1,2,3,4,5,6,7,8,9,12,45,78,23,65,54,87,98].map((img,i)=><div key={i} onClick={()=>add_image('http://localhost:5173/Arpit.jpg')} className=' w-full h-[90px] overflow-hidden rounded-sm cursor-pointer'>
                    <img className=' w-[150px] h-[150px] object-fill' src={'http://localhost:5173/Arpit.jpg'} alt='image' />

                </div>)
            }

        </div>
  )
}

export default Image