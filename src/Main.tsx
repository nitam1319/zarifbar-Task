
import { Route, Routes } from 'react-router-dom'
import Countries from './Countries'
import Country from './Country'

export default function Main () {

  return (
    <Routes>
      <Route path='/' element={<Countries/>}/>
      <Route path='/country/:name' element={<Country/>}/>
    </Routes>
  )
}
