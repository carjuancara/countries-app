import { useState } from 'react'
import FilterButtonRadio from './FilterButtonRadio'
import OrderButtonRadio from './OrderButtonRadio'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { filterByName, restoreAllCountries } from '../redux/countriesSlice'
import image from '../assets/location.png'
const Navbar = () => {
  const [filterCountries, setFilterCountries] = useState('')
  const dispatch = useDispatch()
  const location = useLocation().pathname
  const { allCountries } = useSelector(state => state.countries)
  const handleKeydown = (event) => {
    if (event.key === 'Enter') {
      dispatch(filterByName(filterCountries))
      setFilterCountries('')
    }
  }

  return (
    <nav className='bg-gray-800 p-4'>
      <div className='flex items-center justify-between'>
        {/* Icono a la izquierda */}
        <div className='flex items-center'>
          <Link to='/home'><img src={image} alt='imagen del mundo' className='w-8 h-8' /></Link>
          <span className='ml-4 text-white text-3xl font-semibold items-center justify-center flex'>App de paises</span>
        </div>
        {/* oculta el filtro y orden si esta en ruta /countriesdetail */}
        {location.slice(0, -4) !== '/countriesdetail' && location !== '/newactivity' && (

          <div className='flex w-auto justify-between items-center gap-8'>
            <div className='flex items-center justify-center gap-2'>
              <span className=' text-4xl mb-2'>Filtros</span>
              <FilterButtonRadio />
            </div>
            <div className='flex items-center justify-center gap-2'>
              <span className=' text-4xl mb-2'>Orden</span>
              <OrderButtonRadio />
            </div>
            {location === '/home' && allCountries.length < 250 &&
              <button
                aria-label='restaurar todos los registros de paises'
                className='w-44 text-fondo h-12 rounded-md font-bold bg-secundario cursor-pointer'
                onClick={() => {
                  dispatch(restoreAllCountries())
                  setFilterCountries('')
                }}
              >Restaurar Paises
              </button>}
          </div>
        )}
        {/* Input de búsqueda y botón */}
        <div className='relative flex gap-20'>
          {/* oculta boton de nueva actividad si no esta en /home */}
          {location === '/home' &&
            <div>
              <Link to='/newactivity'>
                <div className='indicator'>
                  <span className='indicator-item badge badge-primary text-neutral-900'>Crear</span>
                  <div className='grid w-40 h-12 bg-base-300 place-items-center rounded-lg text-primario'>Actividad Turistica</div>
                </div>
              </Link>
            </div>}

          {/* oculta input para buscar si no esta en /home */}
          {location === '/home' &&
            <input
              type='text'
              placeholder='Buscar...'
              className='input input-bordered input-primary w-full'
              value={filterCountries}
              onChange={(e) => setFilterCountries(e.target.value)}
              onKeyDown={handleKeydown}
            />}
          {location === '/home' &&
            <button
              aria-label='buscar parcial del nombre'
              className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-500 px-3 py-2 rounded-md'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6' onClick={() => {
                  dispatch(filterByName(filterCountries))
                  setFilterCountries('')
                }}
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z' />
              </svg>
            </button>}

        </div>

      </div>
    </nav>
  )
}

export default Navbar
