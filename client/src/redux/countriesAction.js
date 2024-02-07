import axios from 'axios'

import { updateAllCountries } from '../redux/countriesSlice'

export const BASE_URL = import.meta.env.VITE_BASE_URL

// trae todos los paises al inicio
export const getAllCountries = () => (dispatch) => {
  axios(`${BASE_URL}`)
    .then(res => {
      dispatch(updateAllCountries(res.data))
    })
    .catch(err => console.error(err))
}
