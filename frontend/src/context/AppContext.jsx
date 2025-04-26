import { createContext, useState , useEffect} from "react";
// import { doctors } from "../assets/assets";
import axios from 'axios'
import { toast } from 'react-toastify';




export const AppContext = createContext()

const AppContextProvider = (props) => {

const currencySymbol = '$'
const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
const [doctor, setDoctor] = useState([]);
const [userData , setUserData]= useState(false)

const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/doctor/doctorList");
     
      if (data.success) {
        setDoctor(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const loadUserProfileData = async () => {
    try {
        const { data } = await axios.get("http://localhost:3000/api/user/getUserProfile",{headers: {token}});
        if (data.success) {
            setUserData(data.userData);
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        console.log(error);
       
        toast.error(error.message)
    }
}

useEffect(() => {
  getDoctorsData();
},[])

// useEffect(() => {
//   if (token) {
//     getDoctorsData();
//   }
// }, [token]);


useEffect(() => {
  if(token){
    loadUserProfileData();
  } else {
      setUserData(false);
  }
},[token])
// const value = {
//     doctors, 
//     currencySymbol,
//     token, setToken,
//     doctors,setDoctors
// }

return (
    <AppContext.Provider value={ { currencySymbol, token, setToken, userData, setUserData, doctor ,setDoctor,loadUserProfileData,getDoctorsData}}>
        {props.children}
    </AppContext.Provider>
)

}

export default AppContextProvider
