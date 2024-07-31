import React from 'react'
import Image from './Image'

const MyImages = () => {
  return (
    <div>
      <div className='w-full h-[40px] flex justify-center items-center bg-purple-500 rounded-sm text-white mb-3'>
        <label className='text-center cursor-pointer' htmlFor="image">Upload image</label>
        <input  type="file" id='image' className='hidden' />
      </div>
      {/* {
        loader && <div className='flex justify-center items-center mb-2'>
          <BarLoader color='#fff' />
        </div>
      } */}
      <div className='h-[80vh] overflow-x-auto flex justify-start items-start scrollbar-hide'>
        {/* <div className=' grid grid-cols-2 gap-2'>
            {
                [1,2,3,4,5,6,7,8,9,12,45,78,23,65,54,87,98].map((img,i)=><div key={i} className=' w-full h-[90px] overflow-hidden rounded-sm cursor-pointer'>
                    <img className=' w-[150px] h-[150px] object-fill' src={'http://localhost:5173/Arpit.jpg'} alt='image' />

                </div>)
            }

        </div> */}
        <Image />
      </div>
    </div>
  )
}

export default MyImages