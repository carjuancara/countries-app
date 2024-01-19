import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function CardDetail () {
  const { id } = useParams()
  const { allCountries } = useSelector(state => state.countries)
  const [countriesDetail, setCountriesDetail] = useState({})

  useEffect(() => {
    const country = allCountries.find(country => country.id === id)
    setCountriesDetail(country)
  }, [])

  return (
    <div className='flex h-full flex-wrap justify-center text-3xl bg-gray-800'>
      <div className='flex w-2/3 h-[55vh] mt-12'>
        <div className=' block mt-2 mr-4 rounded-lg w-2/4 h-[45vh] border-2 border-gray-400'>
          <img className='rounded-lg h-full' src={countriesDetail.flags} alt='img not found' />
        </div>
        <div className='flex mt-2 pt-4 flex-col justify-start w-2/3 h-[45vh] rounded-lg border-2 border-gray-400 gap-2'>
          <div className='flex mb-4 text-white font-bold rounded-xl justify-center'>
            <label className='text-white'>{'Detalles sobre ' + countriesDetail.name} </label>
          </div>
          <div className='flex justify-start pl-1 mx-2 rounded-lg'>
            <label className='text-gray-400'>
              Nombre: <span className='pt-2 pl-2 text-lg'>{countriesDetail.name}</span>{' '}
            </label>
          </div>
          <div className='flex justify-start pl-1 mx-2 rounded-lg'>
            <label className='text-gray-400'>
              Id:{' '}
              <span className='pt-2 pl-2 text-lg'>{countriesDetail.id}</span>
            </label>
          </div>
          <div className='flex justify-start pl-1 mx-2 rounded-lg'>
            <label className='text-gray-400'>Continente:</label>
            <span className=' pt-2 pl-2 text-lg text-gray-400'>{countriesDetail.continents}</span>
          </div>
          <div className='flex justify-start pl-1 mx-2 rounded-lg'>
            <label className='text-gray-400'>SubRegion:</label>
            <span className=' pt-2 pl-2 text-lg text-gray-400'>{countriesDetail.subregion}</span>
          </div>
          <div className='flex justify-start pl-1 mx-2 rounded-lg'>
            <label className='text-gray-400'>
              Capital: <span className='pt-2 pl-2 text-lg'>{countriesDetail.capital}</span>
            </label>
          </div>
          <div className='flex justify-start pl-1 mx-2 rounded-lg'>
            <label className='text-gray-400'>
              Area: <span className='pt-2 pl-2 text-lg'>{countriesDetail.area}</span>
            </label>
          </div>
          <div className='flex justify-start pl-1 mx-2 rounded-lg'>
            <label className='text-gray-400'>
              Población: <span className='pt-2 pl-2 text-lg'>{countriesDetail.population}</span>
            </label>
          </div>
        </div>
      </div>
      <div className='flex justify-end items-center w-full h-10 pr-60'>
        <Link to='/home' className='flex h-10 px-4 rounded-lg text-fondo gap-4 items-center bg-secundario '>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3' />
          </svg>
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
