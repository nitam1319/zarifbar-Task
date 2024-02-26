import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'

export default memo(function Card ({ countries }: { countries: any }) {
  const navigate = useNavigate()
  return (
    <>
      {countries.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className='w-72 h-96 bg-white dark:bg-dark_bg flex flex-col rounded-md shadow-md overflow-hidden cursor-pointer'
            onClick={() => {
              navigate(`/country/${item.name.common}`)
            }}
          >
            <img
              src={item.flags.svg}
              alt='flag'
              className='w-full h-40 self-center object-cover'
            />
            <div className='w-full p-5 flex flex-col gap-2'>
              <strong className=' dark:text-white text-xl mb-4 text-nowrap overflow-hidden'>
                {item.name.common}
              </strong>
              <p className=' dark:text-white '>
                <strong>Population</strong>:{item.population}
              </p>
              <p className=' dark:text-white '>
                <strong>Region</strong>:{item.region}
              </p>
              <p className=' dark:text-white '>
                <strong>Capital</strong>:{item.capital}
              </p>
            </div>
          </div>
        )
      })}
    </>
  )
})
