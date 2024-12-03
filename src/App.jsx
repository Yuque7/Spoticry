

import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './pages/Login'
import LandingPage from './pages/LandingPage'
import Home from './pages/Home'
import PlaylistView from './components/PaginaPrincipal/PlaylistView'
import User from './pages/User'

function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path='/loginPage' element={<Login/>} />
        <Route path='/homePage' element={<Home/>}/>
        <Route path="/playlist/:id" element={<PlaylistView/>} />
        <Route path="/userPage" element={<User/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App

