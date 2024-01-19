import React from 'react'
import useMovePage from '../hooks/useMovePage'

const Paginated = () => {
  const {
    handleNextPage,
    handlePrevPage,
    handleGoToPage,
    handleInputClick,
    currentPage,
    totalPages
  } = useMovePage()

  return (
    <div className='flex mt-5 w-4/5 mx-auto justify-center items-center font-bold py-4 gap-12'>
      <button
        className='w-44 text-fondo h-10 rounded-md font-bold bg-secundario cursor-pointer'
        onClick={handlePrevPage}
        disabled={currentPage === 1}
      >
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
        disabled={currentPage === totalPages}
      >
        {' Siguiente >>'}
      </button>
      <p className='text-white'>
        Page {currentPage} of {totalPages}
      </p>
    </div>
  )
}

export default Paginated
