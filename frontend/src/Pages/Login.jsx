import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const Login = () => {
 
const [state,setState] = useState('Sign Up') 
const {token,setToken} = useContext(AppContext)
const [email,setEmail] = useState('')
const [password,setPassword] = useState('')
const [username,setUserName] = useState('')

const navigate = useNavigate()

const onSubmitHandler = async (event) => {
    event.preventDefault()
    console.log(username)
    console.log(email);
    console.log(password);
  
     try {
         if(state ==='Sign Up'){
            const {data} =await axios.post('http://localhost:3000/api/user/userSignUp', {username,email, password})

            if(data.success){
              localStorage.setItem('token', data.token)
              setToken(data.token);
              console.log(data.token);
          
            }else{
             toast.error(data.message)
            }
         } else{
          const {data} =await axios.post('http://localhost:3000/api/user/signIn', {email, password})
          if(data.success){
           localStorage.setItem('token', data.token)
           setToken(data.token);
           console.log(data.token);
           toast.success(data.message)

          }else{
           toast.error(data.message)
          }
         }
         
        } catch (error) {
          
          console.error(error);
          toast.error(error.response?.data?.message || "Something went wrong");
        }

       
     }
     useEffect(()=>{
      if(token){
        navigate('/')
      }
    },[token])
   
  return (
    <form className='min-h-[80vh] flex items-center' onSubmit={ onSubmitHandler} >
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
        <p>Please {state === 'Sign Up' ? "sign up" : "log in"} to book appointment</p>
        {
          state === "Sign Up" &&<div className='w-full'>
          <p>User Name</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' 
          type="text" 
          onChange={(e)=>setUserName(e.target.value)} 
          value={username} required 
          name='userName'/>
        </div >
        }
        
        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' 
          type="email"
         
           onChange={(e)=>setEmail(e.target.value)}
           value={email} required 
           name='email'/>
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1'
           type="password" 
           onChange={(e)=>setPassword(e.target.value)} 
        
           value={password} required 
           name="password"/>
         
        </div>
        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>{state === 'Sign Up' ? "Create Account" : "Login"}</button>
        {
          state === "Sign Up"
          ? <p>Already have an account? <span onClick={()=>setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
          : <p>Create a new account? <span onClick={()=>setState('Sign Up')} className='text-primary underline cursor-pointer'>click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
