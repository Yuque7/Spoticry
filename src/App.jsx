import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  return (
    <>
     <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path='/loginPage' element={<Login/>} />
        <Route path='/homePage' element={<Home/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
