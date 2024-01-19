import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { prevPage, goPage, nextPage } from '../redux/countriesSlice'
import { getAllCountries } from '../redux/countriesAction'

const useMovePage = () => {
  const { allCountries, backupCountries, currentPage } = useSelector((state) => state.countries)
  const dispatch = useDispatch()
  const CARD_PER_PAGE = 6

  const startIndex = (currentPage - 1) * CARD_PER_PAGE
  const endIndex = startIndex + CARD_PER_PAGE

  const currentCountries = allCountries?.slice(startIndex, endIndex)
  const totalPages = Math.ceil(allCountries.length / CARD_PER_PAGE)

  const handleNextPage = async () => {
    dispatch(nextPage())
  }

  const handlePrevPage = async () => {
    dispatch(prevPage())
  }

  const handleGoToPage = (event) => {
    const pageNumber = parseInt(event.currentTarget.value)
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      dispatch(goPage(pageNumber))
    }
  }

  const handleInputClick = (event) => {
    event.currentTarget.select()
  }

  useEffect(() => {
    if (backupCountries.length === 0) dispatch(getAllCountries())
  }, [])

  useEffect(() => {
    if (currentPage !== 1) dispatch(goPage(currentPage))
  }, [currentPage, goPage])

  return {
    currentCountries,
    handleNextPage,
    handlePrevPage,
    handleGoToPage,
    handleInputClick,
    currentPage,
    totalPages
  }
}

export default useMovePage
