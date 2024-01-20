import { changeOrder, filterAllCountries } from '../redux/countriesSlice'
import { useDispatch, useSelector } from 'react-redux'

function OrderButtonRadio () {
  const dispatch = useDispatch()
  const { order } = useSelector(state => state.countries)
  const handlerFilterChange = (e) => {
    if (e.target.value !== order) {
      dispatch(changeOrder(e.target.value))
      dispatch(filterAllCountries())
    }
  }
  return (
    <div className='join mb-2 text-white'>
      <input
        className='join-item btn'
        type='radio'
        name='order'
        aria-label='ASC'
        value='ASC'
        onClick={(e) => handlerFilterChange(e)}
        checked={order === 'ASC'}
        onChange={(e) => handlerFilterChange(e)}
      />
      <input
        className='join-item btn'
        type='radio'
        name='order'
        aria-label='DESC'
        value='DESC'
        onClick={(e) => handlerFilterChange(e)}
        checked={order === 'DESC'}
        onChange={(e) => handlerFilterChange(e)}
      />
    </div>
  )
}

export default OrderButtonRadio
