import { ChevronLeft } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

const PartenaireDetail = () => {
  return (
    <div>
      <div className='flex items-center gap-x-3'>
        <NavLink to="/partenaires">
          <button className='w-fit h-9 px-2 rounded-lg bg-main text-white text-sm font-medium flex items-center justify-center gap-x-1'><ChevronLeft size={18} /> Retour</button>
        </NavLink>
      </div>
      <div className='flex items-start gap-x-5 mt-8'>
        <div className='w-96 h-fit bg-white shadow rounded-lg p-4'>
          <div className='w-24 h-24 mx-auto rounded-full bg-gray-200'></div>
          <div className='mt-5'>
            <p className='text-sm text-gray-400 font-semibold'>Nom</p>
            <div className='p-2 bg-gray-100 rounded-lg'>
              <p className='text-base text-black font-normal'>N'da</p>
            </div>
          </div>
          <div className='mt-2'>
            <p className='text-sm text-gray-400 font-semibold'>Prénoms</p>
            <div className='p-2 bg-gray-100 rounded-lg'>
              <p className='text-base text-black font-normal'>Adams Steve Jobs</p>
            </div>
          </div>
          <div className='mt-2'>
            <p className='text-sm text-gray-400 font-semibold'>Téléphone</p>
            <div className='p-2 bg-gray-100 rounded-lg'>
              <p className='text-base text-black font-normal'>0708080808</p>
            </div>
          </div>
          <div className='mt-2'>
            <p className='text-sm text-gray-400 font-semibold'>Email</p>
            <div className='p-2 bg-gray-100 rounded-lg'>
              <p className='text-base text-black font-normal'>steve@xyz.com</p>
            </div>
          </div>
          <div className='mt-2'>
            <p className='text-sm text-gray-400 font-semibold'>Date d'inscription</p>
            <div className='p-2 bg-gray-100 rounded-lg'>
              <p className='text-base text-black font-normal'>24 Janvier 2024</p>
            </div>
          </div>
        </div>
        <div className='w-full h-96 bg-white shadow rounded-lg p-4'></div>
      </div>
    </div>
  )
}

export default PartenaireDetail