import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import TableActivity from './TableActivity'
import { BASE_URL } from '../redux/countriesAction'
export default function CardDetail () {
  const { id } = useParams()
  const [countriesDetail, setCountriesDetail] = useState({})

  useEffect(() => {
    function getCountry (id) {
      fetch(`${BASE_URL}/countries/${id}`)
        .then(response => response.json())
        .then((res) => {
          setCountriesDetail(res)
        })
        .catch((err) => console.error(err))
    }
    getCountry(id)
  }, [])

  return (
    <div className='flex flex-col h-full flex-wrap justify-center text-3xl bg-gray-800 gap-4'>
      <div className='flex flex-wrap justify-center text-3xl bg-gray-800'>
        <div className='flex w-4/5 h-[45vh] mt-8 gap-4'>
          <div className=' block mt-2 rounded-lg w-1/3 h-[45vh] border-2 border-gray-400'>
            <img
              className='rounded-lg h-full'
              src={countriesDetail.flags}
              alt='img not found'
            />
          </div>
          <div className='flex mt-2 pt-4 flex-col justify-start w-1/3 h-[45vh] rounded-lg border-2 border-gray-400'>
            <div className='flex mb-4 text-white font-bold rounded-xl justify-center'>
              <label className='text-white'>
                {'Detalles sobre ' + countriesDetail.name}{' '}
              </label>
            </div>
            {Object.entries(countriesDetail)
              .filter(([clave]) => clave !== 'Activities' && clave !== 'flags')
              .map(([clave, valor]) => (
                <div key={clave} className='flex justify-start pl-1 mx-2 rounded-lg'>
                  <label className='text-gray-400'>
                    {clave}: <span className='pt-2 pl-2 text-lg'>{valor}</span>
                  </label>
                </div>
              ))}
          </div>
          <div className='flex mt-2 pt-4 flex-col justify-start w-1/3 h-[45vh] rounded-lg border-2 border-gray-400'>
            <div className='flex flex-col mb-4 text-white justify-center'>
              <label className='mb-4 flex text-bold flex-col rounded-xl items-center'>Actividades Turisticas</label>
              {countriesDetail && <TableActivity activities={countriesDetail.Activities} />}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
