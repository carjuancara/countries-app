import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Card ({ id, name, flags, capital, population }) {
  const { filter } = useSelector(state => state.countries)
  // Definir el orden predeterminado
  let order = ['name', 'id', 'capital', 'population']

  // Modificar el orden según el filtro seleccionado
  switch (filter) {
    case 'capital':
      order = ['capital', 'name', 'id', 'population']
      break
    case 'population':
      order = ['population', 'name', 'id', 'capital']
      break
    // Puedes agregar más casos según tus necesidades
    default:
      break
  }

  return (
    <Link to={`/countriesdetail/${id}`} className='flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
      <img className='ml-2 object-contain rounded-t-lg w-60 h-60 md:h-48 md:w-48 md:rounded-none md:rounded-l-lg' src={flags} alt='image' />
      <div className='flex flex-col justify-between p-3 leading-normal'>
        {order.map((field, index) => (
          <p
            key={field}
            className={`text-lg ${index === 0 ? 'font-bold text-2xl' : ''} text-gray-700 dark:text-gray-400`}
          >
            {`${field.charAt(0).toUpperCase() + field.slice(1)}: ${field === 'population' ? new Intl.NumberFormat().format(population) : (field === 'name' ? name : (field === 'capital' ? capital : id))}`}
          </p>
        ))}
      </div>
    </Link>
  )
}

export default Card
