import { changeFilter, filterAllCountries } from '../redux/countriesSlice'
import { useDispatch, useSelector } from 'react-redux'
function FilterButtonRadio () {
  const dispatch = useDispatch()
  const { filter } = useSelector(state => state.countries)
  const handlerFilterChange = (e) => {
    if (e.target.value !== filter) {
      dispatch(changeFilter(e.target.value))
      dispatch(filterAllCountries())
    }
  }
  return (
    <div className='join mb-2'>
      <input
        className='join-item btn text-white'
        type='radio'
        name='filter'
        aria-label='Nombre'
        value='name'
        onClick={(e) => handlerFilterChange(e)}
        checked={filter === 'name'}
        onChange={(e) => handlerFilterChange(e)}
      />
      <input
        className='join-item btn text-white'
        type='radio'
        name='filter'
        aria-label='Capital'
        value='capital'
        onClick={(e) => handlerFilterChange(e)}
        checked={filter === 'capital'}
        onChange={(e) => handlerFilterChange(e)}
      />
      <input
        className='join-item btn text-white'
        type='radio'
        name='filter'
        aria-label='Poblacion'
        value='population'
        onClick={(e) => handlerFilterChange(e)}
        checked={filter === 'population'}
        onChange={(e) => handlerFilterChange(e)}
      />
    </div>
  )
}

export default FilterButtonRadio
