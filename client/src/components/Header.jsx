import { useState } from 'react'
import FilterButtonRadio from './FilterButtonRadio'
import OrderButtonRadio from './OrderButtonRadio'
import { useDispatch, useSelector } from 'react-redux'
import { filterByName, restoreAllCountries } from '../redux/countriesSlice'
function Header () {
  const [filterCountries, setFilterCountries] = useState('')
  const dispatch = useDispatch()
  const { allCountries } = useSelector(state => state.countries)
  return (
    <div className='navbar bg-base-100'>
      <div className='flex-1'>
        <a className='btn btn-ghost text-4xl'>APP de paises</a>
      </div>
      <div className='flex-1 pt-4 gap-4 justify-center'>
        <span className=' text-4xl mb-2'>Filtros</span>
        <FilterButtonRadio />
        <OrderButtonRadio />
        {allCountries.length < 250 &&
          <button
            className='w-44 text-fondo h-10 rounded-md font-bold bg-secundario cursor-pointer mb-2'
            onClick={() => {
              dispatch(restoreAllCountries())
              setFilterCountries('')
            }}
          >Restaurar Paises
          </button>}
      </div>
      <div className='flex-none gap-2'>
        <div className='form-control w-52 flex'>
          <input type='text' placeholder='Buscar pais' className='input input-bordered w-24 md:w-auto' value={filterCountries} onChange={(e) => setFilterCountries(e.target.value)} />
          <button
            className='w-44 text-fondo h-10 rounded-md font-bold bg-secundario cursor-pointer mb-2'
            onClick={() => {
              dispatch(filterByName(filterCountries))
              setFilterCountries('')
            }}
          >Buscar
          </button>
        </div>
        <div className='dropdown dropdown-end'>
          <div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full'>
              {/* <img alt='Tailwind CSS Navbar component' src='https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg' /> */}
            </div>
          </div>
          <ul tabIndex={0} className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52'>
            <li>
              <a className='justify-between'>
                Profile
                <span className='badge'>New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Header
