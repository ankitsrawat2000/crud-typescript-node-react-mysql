import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Fcitable from './Fcitable'
import Okss from './Okss'
import Home from './Home'
import Fci from './Fci'

function App() {

  return <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path="/fciall" element={<Fcitable />} />
        <Route path='/okss' element={<Okss/>}/>
        <Route path='/fci' element={<Fci/>}/>
      </Routes>
    </BrowserRouter>
  </>
}

export default App
