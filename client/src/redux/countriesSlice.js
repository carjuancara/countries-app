import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allCountries: [],
  backupCountries: [],
  currentPage: 1,
  filter: 'name',
  order: 'ASC'
}
const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    updateAllCountries: (state, action) => {
      state.allCountries = action.payload
      state.backupCountries = action.payload
    },
    prevPage: (state) => {
      state.currentPage = state.currentPage - 1
    },
    goPage: (state, action) => {
      state.currentPage = action.payload
    },
    nextPage: (state) => {
      state.currentPage = state.currentPage + 1
    },
    changeFilter: (state, action) => {
      state.filter = action.payload
    },
    changeOrder: (state, action) => {
      state.order = action.payload
    },
    filterByName: (state, action) => {
      const search = action.payload.toLowerCase()
      state.allCountries = state.allCountries.filter(country => country.name.toLowerCase().includes(search))
      state.currentPage = 1
    },
    filterAllCountries: (state) => {
      if (state.order === 'ASC') {
        state.allCountries = state.allCountries.sort((a, b) => {
          if (a[state.filter] > b[state.filter]) return 1
          if (a[state.filter] < b[state.filter]) return -1
          return 0
        })
      } else {
        state.allCountries = state.allCountries.sort((a, b) => {
          if (a[state.filter] < b[state.filter]) return 1
          if (a[state.filter] > b[state.filter]) return -1
          return 0
        })
      }
    },
    restoreAllCountries: (state, action) => {
      state.allCountries = state.backupCountries
    }
  }
})

export default countriesSlice.reducer
export const { updateAllCountries, prevPage, goPage, nextPage, loadCountries, changeFilter, changeOrder, filterByName, filterAllCountries, restoreAllCountries } = countriesSlice.actions
