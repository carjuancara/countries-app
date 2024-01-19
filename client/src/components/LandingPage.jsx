import React from 'react'
import { Link } from 'react-router-dom'
const data = {
  urlImage: 'url(https://i.pinimg.com/originals/c3/5f/6e/c35f6e77637bc321e02a43cb74933788.png)',
  phrase: 'Embárcate en un viaje sin límites. Descubre destinos, crea recuerdos y vive experiencias únicas. Nuestro mundo, tu aventura. ¿Estás listo para explorar?',
  textButton: 'Ingresar'
}
function LandingPage () {
  return (
    <div className='hero h-screen' style={{ backgroundImage: `${data.urlImage}` }}>
      <div className='hero-overlay bg-opacity-60' />
      <div className='hero-content text-center text-neutral-content'>
        <div className='max-w-screen-lg '>
          {/*  <h1 className='mb-5 text-5xl font-bold text-secundario'>Hello there</h1> */}
          <p className=' text-6xl text-black mb-5 p-4 rounded-lg bg-white bg-opacity-80 backdrop-blur-md '>{data.phrase}</p>
          <Link to='/home'><button className='m-5 w-44 text-fondo h-10 rounded-md font-bold bg-secundario cursor-pointer'>{data.textButton}</button></Link>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
