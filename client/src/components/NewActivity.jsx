import useMovePage from '../hooks/useMovePage'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(6, 'El nombre es demasiado corto!')
    .max(50, 'El nombre es demasiado largo!')
    .required('Nombre es Requiredo'),
  duration: Yup.number()
    .integer('La duración debe ser un número entero')
    .min(1, 'La duración debe ser mayor que 0'),
  difficulty: Yup.string()
    .matches(/^[1-5]$/, 'La dificultad debe ser un valor entre 1 y 5'),
  season: Yup.string()
    .oneOf(['Verano', 'Otoño', 'Invierno', 'Primavera'], 'Estación no válida')
})
function NewActivity () {
  const formik = useFormik({
    initialValues: {
      name: '',
      duration: 0,
      difficulty: '',
      season: ''
    },
    validationSchema: { SignupSchema },
    onSubmit: values => {
      window.alert(JSON.stringify(values, null, 2))
    }
  })
  const { handleInputClick } = useMovePage()
  return (
    <form className='flex justify-center items-center rounded-lg' onSubmit={formik.handleSubmit}>
      <div className='flex flex-col h-1/4 justify-center items-center gap-8 rounded-lg border-2 border-solid border-secundario p-4'>
        <h1 className='flex  justify-center m-10 text-2xl underline'>
          Crea una nueva actividad turistica
        </h1>
        <div className='flex w-full flex-col justify-center items-start px-4 gap-1'>
          <label className='w-full'>
            Nombre
            <input
              type='text'
              id='name'
              name='name'
              placeholder='Nombre'
              className='input input-bordered input-primary w-full'
              onClick={(e) => handleInputClick(e)}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </label>
        </div>
        <div className='flex w-full flex-col justify-center items-start px-4 gap-1'>
          <label className='w-full'>
            Duración ( min )
            <input
              type='number'
              id='duration'
              name='duration'
              placeholder='Duración'
              className='input input-bordered input-primary w-full'
              onClick={(e) => handleInputClick(e)}
              onChange={formik.handleChange}
              value={formik.values.duration}
            />
          </label>
        </div>
        <div className='flex w-full flex-col justify-center items-start px-4 gap-1'>
          <label className='w-full'>
            Dificultad
            <div className='join w-full'>
              <input
                className='join-item btn w-1/5'
                type='radio'
                name='difficulty'
                aria-label='1'
                onChange={formik.handleChange}
                value={formik.values.difficulty}
              />
              <input
                className='join-item btn w-1/5'
                type='radio'
                name='difficulty'
                aria-label='2'
                onChange={formik.handleChange}
                value={formik.values.difficulty}
              />
              <input
                className='join-item btn w-1/5'
                type='radio'
                name='difficulty'
                aria-label='3'
                onChange={formik.handleChange}
                value={formik.values.difficulty}
              />
              <input
                className='join-item btn w-1/5'
                type='radio'
                name='difficulty'
                aria-label='4'
                onChange={formik.handleChange}
                value={formik.values.difficulty}
              />
              <input
                className='join-item btn w-1/5'
                type='radio'
                name='difficulty'
                aria-label='5'
                onChange={formik.handleChange}
                value={formik.values.difficulty}
              />
            </div>
          </label>

        </div>
        <div className='flex w-full flex-col justify-center items-start px-4 pb-8 gap-1'>
          <label className='w-full'>
            Estación
            <div className='join w-full'>
              <input
                className='join-item btn w-1/4'
                type='radio'
                name='season'
                aria-label='Verano'
                onChange={formik.handleChange}
                value={formik.values.season}
              />
              <input
                className='join-item btn w-1/4'
                type='radio'
                name='season'
                aria-label='Otoño'
                onChange={formik.handleChange}
                value={formik.values.season}
              />
              <input
                className='join-item btn w-1/4'
                type='radio'
                name='season'
                aria-label='Invierno'
                onChange={formik.handleChange}
                value={formik.values.season}
              />
              <input
                className='join-item btn w-1/4'
                type='radio'
                name='season'
                aria-label='Primavera'
                onChange={formik.handleChange}
                value={formik.values.season}
              />
            </div>
          </label>

        </div>
        <div className=' pl-64'>
          <input className='btn px-14 bg-secundario text-neutral-900' type='submit' value='Guardar Actividad' />
        </div>
      </div>
    </form>
  )
}

export default NewActivity
