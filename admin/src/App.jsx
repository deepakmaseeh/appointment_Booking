import { useContext, useState } from 'react'
import React from 'react'
import Login from './Pages/Login'

import { ToastContainer, toast } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";

import Navbar from './Component/Navbar'
import Sidebar from './Component/Sidebar'
// const { Route, Routes } = require("react-router-dom");
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import AllAppointments from './Pages/Admin/AllApointments'
import Dashboard from './pages/Admin/Dashboard'
import AddDoctor from './pages/Admin/AddDoctor'
import DoctorsList from './pages/Admin/DoctorsList'
// import { AppContext } from './../../frontend/src/context/AppContext';
import { AdminContext } from './context/AdminContext';



function App() {
  // const [count, setCount] = useState(0)
  const {atoken} = useContext(AdminContext)

  return atoken ?(
    <div className='bg-white '>
         <ToastContainer />
              <Navbar/>
          <div className='flex items-start'>
          <Sidebar/>
         
          <Routes>
    <Route path="/" element={<></>} />
    <Route path="/admin-dashboard" element={<Dashboard/>} />
    <Route path="/all-appointments" element={<AllAppointments/>} />
    <Route path="/add-doctor" element={<AddDoctor/>} />
    <Route path="/doctors-list" element={<DoctorsList/>} />

</Routes>
      
            </div>    
    </div>):(
    <>

     <Login/>
     <ToastContainer />
    
     {/* <div>
       <Sidebar/>
       <Routes>
    <Route path="/" element={<></>} />
    <Route path="/admin-dashboard" element={<Dashboard/>} />
    <Route path="/admin-dashboard" element={<Dashboard/>} />
    <Route path="/all-appointments" element={<AllAppointments/>} />
    <Route path="/add-doctor" element={<AddDoctor/>} />
    <Route path="/doctors-list" element={<DoctorsList/>} />

       </Routes>

     </div> } */}


    </>

    
  )
}

export default App
