import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import Alerts from './Alerts'
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(6, 'El nombre es demasiado corto!')
    .max(50, 'El nombre es demasiado largo!')
    .required('Nombre es Requiredo'),
  duration: Yup.number()
    .integer('La duración debe ser un número entero')
    .min(1, 'La duración minima no debe ser inferior a 1')
    .max(60, 'La duración maxima no debe superar a 60 min'),
  difficulty: Yup.string()
    .matches(/^[1-5]$/, 'La dificultad debe ser un valor entre 1 y 5'),
  season: Yup.string()
    .oneOf(['Verano', 'Otoño', 'Invierno', 'Primavera'], 'Estación no válida'),
  countries: Yup.array()
    .min(1, 'Debes seleccionar al menos un país')

})

function NewActivity () {
  const [alertMessage, setAlertMessage] = useState({
    type: '',
    message: ''
  })
  const formik = useFormik({
    initialValues: {
      name: '', // nombre de la activadad turistica
      duration: 1, // tiempo de duracion de la actividad turistica en minutos [1,60]
      difficulty: '', // nivel de dificultad de la actividad ... [1,5]
      season: '', // estacion del año en la que sucede la actividad...
      countries: [] // paises donde se practica esa actividad ...
    },
    validationSchema: SignupSchema,
    validateOnChange: false,
    onSubmit: values => {
      try {
        values.countries = values.countries.map(country => country.id)
        axios.post('http://localhost:3001/activities', values)
        setAlertMessage({ type: 'alert-success', message: 'Se ha creado una nueva actividad!' })
        formik.resetForm()
        window.scrollTo(0, 0)
        setTimeout(() => {
          setAlertMessage({ message: '', type: '' })
        }, 5000)
      } catch (error) {
        setAlertMessage({ type: 'alert-error', message: 'Ha ocurrido un error' })
        console.log(error)
      }
    }
  })

  // Función para manejar la adición de un país a la propiedad 'country'
  const handleAddCountry = selectedCountryID => {
    if (!formik.values.countries.includes(selectedCountryID)) {
      const selected = backupCountries.find(select => select.id === selectedCountryID)
      formik.setFieldValue('countries', [...formik.values.countries, { id: selected.id, name: selected.name }])
    }
  }
  /* Elimina el elemento seleccionado de la prop 'countries' */
  const hanlerClose = (countryToRemove) => {
    const updatedCountries = formik.values.countries.filter(
      (country) => country.id !== countryToRemove
    )
    formik.setFieldValue('countries', updatedCountries)
  }

  const { backupCountries } = useSelector(state => state.countries)
  return (
    <form className='flex justify-center items-center rounded-lg gap-4' onSubmit={formik.handleSubmit}>
      <div className='flex flex-col h-1/4 justify-center items-center gap-8 rounded-lg border-2 border-solid border-secundario p-4'>
        <h1 className='flex  justify-center m-10 text-2xl underline'>
          Crea una nueva actividad turistica
        </h1>
        <div className='flex w-full flex-col justify-center items-start px-4 gap-1'>
          <label className='w-full'>
            Nombre
          </label>
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Nombre'
            className='input input-bordered input-primary w-full'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (<div>{formik.errors.name}</div>)}
        </div>
        <div className='flex w-full flex-col justify-center items-start px-4 gap-1'>
          <label className='w-full'>
            Duración ( min )
          </label>
          <input
            type='number'
            id='duration'
            name='duration'
            placeholder='Duración'
            className='input input-bordered input-primary w-full'
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.duration}
          />
          {formik.touched.duration && formik.errors.duration && (<div>{formik.errors.duration}</div>)}
        </div>
        <div className='flex w-full flex-col justify-center items-start px-4 gap-1'>
          <label>Dificultad</label>
          <div className='join w-full'>
            {[1, 2, 3, 4, 5].map((value) => (
              <input
                key={value}
                className='join-item btn w-1/5'
                type='radio'
                name='difficulty'
                value={value.toString()}
                aria-label={value.toString()}
                checked={formik.values.difficulty === value.toString()}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            ))}
          </div>
          {formik.touched.difficulty && formik.errors.difficulty && (<div>{formik.errors.difficulty}</div>)}

        </div>
        <div className='flex w-full flex-col justify-center items-start px-4 pb-8 gap-1'>
          <label>Temporada</label>
          <div className='join w-full'>
            {['Verano', 'Otoño', 'Invierno', 'Primavera'].map((value) => (
              <input
                key={value}
                className='join-item btn w-1/4'
                type='radio'
                name='season'
                value={value}
                aria-label={value}
                checked={formik.values.season === value}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            ))}
          </div>
          {formik.touched.season && formik.errors.season && (<div>{formik.errors.season}</div>)}

        </div>
        <div className=' pl-64'>
          <input className='btn px-14 bg-secundario text-neutral-900' type='submit' value='Guardar Actividad' />
        </div>
      </div>
      <div className='flex flex-col h-1/4 justify-center items-center gap-8 rounded-lg border-2 border-solid border-secundario p-4'>
        <div className='flex w-full flex-col justify-center items-start px-4 gap-1'>
          {/* Listado de paises */}
          <select value='' className='select select-primary w-full' onChange={e => handleAddCountry(e.target.value)}>
            <option value='' disabled>
              Selecciona un país
            </option>
            {backupCountries && backupCountries?.map(country => (
              <option
                key={country.id}
                id={country.id}
                value={country.id}
              >
                {country.name}
              </option>
            ))}
          </select>
          {formik.touched.countries && formik.errors.countries && (
            <div>{formik.errors.countries}</div>
          )}
          {/* paises agregados al arreglo de countries */}
          <div className='flex w-full justify-center items-center mt-4 rounded-lg border-solid border-secundario border-2 gap-4 max-w-96 flex-wrap'>
            {formik.values.countries &&
              formik.values.countries.map((country) => (
                <button
                  key={country.id}
                  id={country.id}
                  type='button'
                  className='btn px-4 py-2 bg-primary text-neutral-900'
                  onClick={() => hanlerClose(country.id)}
                >
                  {country.name}
                </button>
              ))}

          </div>
        </div>
      </div>
      {alertMessage.message.length && (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'green',
            color: 'white',
            padding: '10px',
            borderRadius: '5px',
            zIndex: 9999 // Asegura que esté por encima de otros elementos
          }}
        >
          <Alerts type={alertMessage.type} message={alertMessage.message} />
        </div>)}
    </form>
  )
}

export default NewActivity
