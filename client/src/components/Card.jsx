import { Link } from 'react-router-dom'
function Card ({ id, name, flags, capital, population }) {
  return (
    <Link to={`/countriesdetail/${id}`} className='flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
      <img className=' ml-2 object-contain rounded-t-lg w-60 h-60 md:h-48 md:w-48 md:rounded-none md:rounded-l-lg' src={flags} alt='image' />
      <div className='flex flex-col justify-between p-3 leading-normal'>
        <h5 className='mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white'>{`Nombre: ${name}`}</h5>
        <p className='text-sm text-gray-700 dark:text-gray-400'>{`ID: ${id}`}</p>
        <p className='text-sm text-gray-700 dark:text-gray-400'>{`Capital: ${capital}`}</p>
        <p className='text-sm text-gray-700 dark:text-gray-400'>{`Población: ${population}`}</p>
      </div>
    </Link>
  )
}

export default Card
