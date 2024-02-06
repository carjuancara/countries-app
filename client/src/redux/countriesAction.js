import axios from 'axios'

import { updateAllCountries } from '../redux/countriesSlice'

export const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001/countries'

// trae todos los paises al inicio
export const getAllCountries = () => (dispatch) => {
  axios(`${BASE_URL}`)
    .then(res => {
      dispatch(updateAllCountries(res.data))
    })
    .catch(err => console.error(err))
}
