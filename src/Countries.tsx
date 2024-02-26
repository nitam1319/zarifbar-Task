import React, { useEffect, useState } from 'react'
import Card from './Card'
import { Region } from './Region'

export default function Countries () {
  const [isOpenSelectBox, setIsOpenSelectBox] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState('')
  const [getCountries, setGetCountries] = useState<any>()
  const [inputSearch, setInputSearch] = useState<string>('')
 async function search () {
    if (inputSearch) {
     await fetch(
        `https://restcountries.com/v3.1/name/${inputSearch}?fields=name,capital,region,population,flags,currencies,demonyms,subregion,languages,borders`
      )
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response)
          }
          return Promise.reject(new Error(response.statusText))
        })
        .then(response => response.json())
        .then(result => {
          setGetCountries(result)
          setInputSearch('')
        })
        .catch(error => {
          console.error(error)
          return null
        })
    }
  }
  async function get () {
    setGetCountries(null)
    await fetch(
      selectedRegion
        ? `https://restcountries.com/v3.1/region/${selectedRegion}?fields=name,capital,region,population,flags`
        : `https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags`
    )
      .then(response => response.json())
      .then(res => {
        setGetCountries(res)
      })
      .catch(err => console.error(err))
  }
  useEffect(() => {
    get()
  }, [selectedRegion])
  return (
    <main className='w-full'>
      <div className='w-full h-fit flex justify-between flex-wrap my-10 gap-4  px-6 lg:px-14'>
        <div className='flex justify-around items-center w-96 h-10 gap-3 bg-white dark:bg-dark_bg rounded-md shadow-sm '>
          <div className='  cursor-pointer ' onClick={search}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 dark:text-white'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
              />
            </svg>
          </div>

          <input
            type='text'
            className='bg-transparent border-none w-4/5 outline-none dark: dark:text-white'
            placeholder='Search for country...'
            value={inputSearch}
            onChange={e => {
              setInputSearch(e.target.value)
            }}
          />
        </div>
        <div
          className='w-48 h-10 dark: dark:text-white  bg-white dark:bg-dark_bg rounded-md shadow-sm flex justify-between px-4 items-center relative cursor-pointer'
          onClick={() => setIsOpenSelectBox(!isOpenSelectBox)}
        >
          <p className=' dark:text-white'>
            {selectedRegion ? selectedRegion : 'Filter by Region'}
          </p>
          <svg
            style={{ rotate: isOpenSelectBox ? '180deg' : '' }}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4 transition-all'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m19.5 8.25-7.5 7.5-7.5-7.5'
            />
          </svg>
          <div
            className='absolute w-48 top-11 p-2 -mx-4  dark:text-white  bg-white dark:bg-dark_bg rounded-md shadow-sm items-center overflow-hidden transition-all'
            style={{
              height: isOpenSelectBox ? '' : 0,
              padding: isOpenSelectBox ? '' : 0
            }}
          >
            {Region.map((item, index) => (
              <div
                onClick={() => {
                  setSelectedRegion(item)
                }}
                key={index}
                className='w-full h-9 flex p-2 items-center rounded-md hover:bg-zinc-50 dark:hover:bg-dark_bg2'
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='w-full flex flex-wrap justify-center sm:justify-between px-6 lg:px-14 gap-14'>
        {getCountries ? (
          <Card countries={getCountries} />
        ) : (
          <center className='dark:text-white'>loading...</center>
        )}
      </div>
    </main>
  )
}
