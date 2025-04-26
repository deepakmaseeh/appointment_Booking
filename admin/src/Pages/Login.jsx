import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify';


const Login = () => {

    const [state,setState] =useState("Admin")
    
    const {setAToken} = useContext(AdminContext)
    // const [users,setUsers]=useState({
    //   email:"",
    //   password: "",
    
    // })
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const handelInput =(e)=>{
    //   const{ name, value} = e.target
    //   setUsers((prev) =>({...prev, [name]:value})
        
        
    //   )
    // }
    const onSubmitHandler = async (event) => {
      event.preventDefault()
    //  console.log(users);
    console.log(email);
    console.log(password);
    
     try {
      if(state==='Admin'){
         const {data} =await axios.post('http://localhost:3000/api/admin/adminLogin', {email, password})
         if(data.success){
          localStorage.setItem('aToken', data.token)
          setAToken(data.token);
          // console.log(data.token);
        
          
         }else{
          toast.error(data.message)
         }
      }
      
     } catch (error) {
      
        
        
     }
     
  
  }

  return (
    <form className='min-h-[80vh] flex items-center'  onSubmit={onSubmitHandler}> 
        <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        
            <p className='text-2xl font-semibold m-auto'><span>{state}</span>Login</p>
            <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' 
          type="email"
          // onChange={handelInput}
          //  value={users.email} required 
          onChange={(e)=>setEmail(e.target.value)}
          value={email}
           name='email'
         

           />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1'
           type="password" 
          //  onChange={handelInput}
          //  value={users.password} required 
          onChange={(e)=>setPassword(e.target.value)}
          value={password}
           name="password"
        
           />
         
        </div>
        <button className='bg-blue-500  text-white w-full py-2 rounded-md text-base'>Login</button>
             {
              state=== "Admin"
              ?<p> Doctor Login? <span className='text-primary underline cursor-pointer' onClick={()=> setState('Doctor')}>Click here</span></p>
              :<p>Admin Login ?<span className='text-primary underline cursor-pointer' onClick={()=> setState('Admin')}>Click here</span></p>
             }
        </div>
    </form>
  )
}

export default Login
