import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Cards from './components/Cards'
import LandingPage from './components/LandingPage'
import CardDetail from './components/CardDetail'
import Navbar from './components/Navbar'
import Paginated from './components/Paginated'

function App () {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route
          path='/home' element={
            <div>
              <Navbar />
              <Cards />
              <Paginated />
              <Footer />
            </div>
        }
        />
        <Route
          path='/countriesdetail/:id' element={
            <div>
              <Navbar />
              <CardDetail />
              <Footer />
            </div>
        }
        />
      </Routes>
    </div>
  )
}

export default App
