import useMovePage from '../hooks/useMovePage'

import Card from './Card'
import { NotFound } from './NotFound'

const Cards = () => {
  const { currentCountries } = useMovePage()

  return (
    <div className='p-5 w-screen ml-32 dark:bg-gray-800'>
      {' '}
      <div className='container'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'>
          {currentCountries.length === 0
            ? <NotFound />
            : currentCountries.map((country) => (
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
    </div>
  )
}

export default Cards
