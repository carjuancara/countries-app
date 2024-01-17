import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCountries } from '../redux/countriesAction'
import { prevPage, goPage, nextPage } from '../redux/countriesSlice'
import Card from './Card'
const Cards = () => {
  const { allCountries, currentPage } = useSelector((state) => state.countries)
  const dispatch = useDispatch()
  const CARD_PER_PAGE = 6

  // Calculamos el rango de imágenes a mostrar según la paginación
  const startIndex = (currentPage - 1) * CARD_PER_PAGE
  const endIndex = startIndex + CARD_PER_PAGE

  // Filtramos las imágenes a mostrar en la página actual
  const currentCountries = allCountries?.slice(startIndex, endIndex)

  // Calculamos la cantidad total de páginas
  const totalPages = Math.ceil(allCountries.length / CARD_PER_PAGE)
  const handleNextPage = async () => {
    if (currentPage === totalPages) {
      dispatch(goPage(1))
    } else {
      await dispatch(nextPage())
    }
  }

  const handlePrevPage = async () => {
    if (currentPage === 1) {
      dispatch(goPage(totalPages))
    } else {
      await dispatch(prevPage())
    }
  }

  const handleGoToPage = (event) => {
    const pageNumber = parseInt(event.currentTarget.value)
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      dispatch(goPage(pageNumber))
    }
  }

  const handleInputClick = (event) => {
    // Selecciona todo el texto del input al hacer clic en él
    event.currentTarget.select()
  }

  useEffect(() => {
    if (currentPage !== 1) {
      dispatch(goPage(currentPage))
    } else {
      dispatch(getAllCountries())
    }
  }, [getAllCountries, currentPage, goPage])

  return (
    <div className='p-5 min-h-screen fondo dark:bg-gray-800'>
      {' '}
      {/* bg-gray-100 */}
      <div className='container mx-auto py-1 px-2 sm:px-2 lg:px-2'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
          {currentCountries &&
            currentCountries.map((country) => (
              <Card
                id={country.id}
                key={country.id}
                name={country.name}
                flags={country.flags}
                capital={country.capital}
                population={country.population}
              />
            ))}
        </div>
      </div>
      <div className='flex mt-5 w-4/5 mx-auto justify-center items-center font-bold py-4 gap-12'>
        <button
          className='w-44 text-fondo h-10 rounded-md font-bold bg-secundario cursor-pointer'
          onClick={handlePrevPage}
        >
          {' '}
          {/* bg-amber-400 */}
          {'<< Anterior '}
        </button>
        <input
          className='flex h-10 text-center w-10 justify-center items-center rounded-full text-black'
          type='text'
          value={currentPage}
          onChange={handleGoToPage}
          onClick={handleInputClick}
        />
        <button
          className='w-44 text-fondo h-10 rounded-md font-bold bg-secundario cursor-pointer'
          onClick={handleNextPage}
        >
          {' Siguiente >>'}
        </button>
        <p className='text-white'>
          Page {currentPage} of {totalPages}
        </p>
      </div>
    </div>
  )
}

export default Cards
