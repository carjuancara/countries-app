import axios from 'axios'

import { updateAllCountries } from '../redux/countriesSlice'

// trae todos los paises al inicio
export const getAllCountries = () => (dispatch) => {
  axios('http://localhost:3001/countries')
    .then(res => {
      dispatch(updateAllCountries(res.data))
    })
    .catch(err => console.error(err))
}
