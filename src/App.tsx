import { useState } from 'react'


import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Studentsignup from './PAGES/Studentsignup'
import Login from './PAGES/Login'

import Home from './PAGES/Home'

import Primary from './COMPONENT/Primary'
import Admissions from './COMPONENT/Admission'
import AboutUs from './COMPONENT/Aboutus'
import EventPage from './COMPONENT/Event'
import Contact from './COMPONENT/Contactus'
import Secondary from './COMPONENT/Secondary'
import Registration from './COMPONENT/Registration'
import ParentsForum from './COMPONENT/Parentforum'
import PrimaryRegistration from './COMPONENT/Primaryreg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/> 
      <Route path="/Admissions/Primary" element={<Primary />} />
         <Route path='/Admissions/Secondary' element={<Secondary/>}/>  
       <Route path='/Admissions'  element={<Admissions/>}/> 
      <Route path='/Aboutus' element={<AboutUs/>}/>
    <Route path="/Event" element={<EventPage/>}/>
    <Route path='/Contact' element={<Contact/>}/>
     <Route path='/Registration' element={<Registration/>}/>  
     <Route path='/PrimaryRegistration' element={<PrimaryRegistration/>}/>  
<Route path='/Parentforum' element={<ParentsForum/>}/>  

     
      </Routes> 



    </>
  )
}

export default App
