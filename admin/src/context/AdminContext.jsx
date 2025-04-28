import { createContext,useState } from "react"
export const AdminContext = createContext()
import { toast } from 'react-toastify';
import axios from 'axios'
const AdminContextProvider = (props) => {


const [atoken,setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):"")
  const [doctors, setDoctors] = useState([]);

// backendURL = import.meta.env.VITE_BACKEND_URL
  const backendURL ="https://appointment-booking-tbd2.onrender.com"


// const value = {
//     atoken,
//     setAToken ,
//     backendURL
// }
const getAllDoctors = async () => {
      try {
        const { data } = await axios.get(
          "https://appointment-booking-tbd2.onrender.com/api/admin/allDoctors",
          // {},
          { headers: { atoken } }
          // {headers: { atoken: 'token '}}
        );
        // console.log(data);
        
        if (data.success) {
          setDoctors(data.doctors);
          console.log(data.doctors);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error(err.message);
      }
    };

const changeAvailability = async (docId) => {
      try {
        const { data } = await axios.post(
          backendURL + "/api/admin/changeavailability",
          { docId },
          { headers: { atoken } }
        );
        if (data.success) {
          toast.success(data.message);
          getAllDoctors();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

return (
    < AdminContext.Provider value={ {atoken, setAToken,backendURL, doctors ,setDoctors, changeAvailability ,getAllDoctors}}>
        {props.children}
    </ AdminContext.Provider>
)

}

export default AdminContextProvider

