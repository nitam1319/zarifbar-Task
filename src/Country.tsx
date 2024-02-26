import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Country () {
  const { name } = useParams()
  const navigate = useNavigate()
  const [getCountry, setGetCountry] = useState<any>()
  async function get () {
    await fetch(
      `https://restcountries.com/v3.1/name/${name}?fields=name,capital,region,population,flags,currencies,demonyms,subregion,languages,borders`
    )
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response)
        }
        return Promise.reject(new Error(response.statusText))
      })
      .then(response => response.json())
      .then(res => {
        setGetCountry(res)
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    get()
  }, [name])
  return (
    <>
      <div className='py-10 px-6 sm:px-14 '>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center justify-around w-20  p-1 dark:text-white dark:bg-dark_bg rounded-md shadow-md'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18'
            />
          </svg>
          Back
        </button>
        {getCountry ? (
          <div className='flex justify-center sm:justify-start dark:text-white gap-10 mt-10 flex-wrap'>
            <img
              src={getCountry[0].flags.svg}
              alt='flag'
              className='w-1/2 min-w-80 max-w-[700px] self-center '
            />
            <div className=' min-w-40  flex flex-col flex-wrap text-sm'>
              <strong className=' text-2xl '>
                {getCountry[0].name.common}
              </strong>
              <div className='flex w-full flex-wrap gap-6 sm:gap-14'>
                <div className='flex flex-col flex-1 mt-6 min-w-44 gap-2'>
                  <p>
                    <strong>Native Name: </strong>
                    {getCountry[0].name.common}
                  </p>
                  <p>
                    <strong>Population: </strong>
                    {getCountry[0].population}
                  </p>
                  <p>
                    <strong>Region: </strong>
                    {getCountry[0].region}
                  </p>
                  <p>
                    <strong>Sub Region: </strong>
                    {getCountry[0].subregion}
                  </p>
                  <p>
                    <strong>Capital: </strong>
                    {getCountry[0].capital}
                  </p>
                </div>
                <div className='flex flex-col flex-1 mt-6 min-w-44 gap-2'>
                  <p>
                    <strong>Top Level Domain: </strong>
                    {getCountry[0].demonyms.eng.f}
                  </p>
                  <p>
                    <strong>Currencies: </strong>
                    {
                      getCountry[0].currencies[
                        Object.keys(getCountry[0].currencies)[0]
                      ].name
                    }
                  </p>
                  <p>
                    <strong>Languages: </strong>
                    {Object.values(getCountry[0].languages).map((item: any) => (
                      <span>{item} , </span>
                    ))}
                  </p>
                </div>
              </div>
              <div className='w-full flex flex-wrap mt-6'>
                <strong>Border Countries :</strong>
                <div className=' flex flex-wrap gap-2 mx-2 '>
                  {getCountry[0].borders.map((item: string) => (
                    <button
                      onClick={() => navigate(`/country/${item}`)}
                      className='flex items-center justify-around w-20  p-1 dark:text-white dark:bg-dark_bg rounded-md shadow-md '
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <center className='dark:text-white'>Loading...</center>
        )}
      </div>
    </>
  )
}
