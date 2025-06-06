import React, {  useContext,useState } from "react";
import { assets } from "../../assets/assets";
import  {AdminContext} from '../../context/AdminContext'
import { toast } from "react-toastify";
import axios from "axios";

function AddDoctor() {

    const [docImg, setDocImg] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [experience, setExperience] = useState('1 year')
    const [fees, setFees] = useState('')
    const [about, setAbout] = useState('')
    const [speciality, setSpecialty] = useState('General physician')
    const [degree, setDegree] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

   const {atoken} = useContext(AdminContext)
    const onSubmitHandler = async (event) => {
        event.preventDefault()
        
        try{
            if(!docImg){
                return toast.error("Image is not Selected")
            }

            const formData = new FormData()
            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email', email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({line1: address1, line2: address2}))

            // console.log(formData);
            // formData.forEach((value, key) => console.log(`${key}: ${value}`));

            const {data} = await axios.post('https://appointment-booking-tbd2.onrender.com/api/admin/addDoctor', formData,
               {headers: {atoken}}
              // { headers: { Authorization: `Bearer ${atoken}` } }
              )

          console.log(atoken);
          
             console.log(data);
             

            if(data.success){
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setEmail('')
                setPassword('')
                setExperience('1 year')
                setFees('')
                setAbout('')
                setSpecialty('General physician')
                setDegree('')
                setAddress1('')
                setAddress2('')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error);
            
        }
    }


  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row item-start text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Name </p>
              <input onChange={(e) => setName(e.target.value)} value={name} className="border rounded py-2 px-3" type="text" placeholder="Name" required />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email </p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className="border rounded py-2 px-3" type="email" placeholder="email" required />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className="border rounded py-2 px-3" type="password" placeholder="password" required />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select onChange={(e) => setExperience(e.target.value)} value={experience} className="border rounded py-2 px-3" name="experience" id="experience">
                <option value="1 year">1 year</option>
                <option value="2 year">2 year</option>
                <option value="3 year">3 year</option>
                <option value="4 year">4 year</option>
                <option value="5 year">5 year</option>
                <option value="6 year">6 year</option>
                <option value="7 year">7 year</option>
                <option value="8 year">8 year</option>
                <option value="9 year">9 year</option>
                <option value="10 year">10 year</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input onChange={(e) => setFees(e.target.value)} value={fees} className="border rounded py-2 px-3" type="number" placeholder="fees" required />
            </div>

          </div>
        </div> 
        {/* Please have an eye on div  */}

        <div className="w-full lg:flex-1 flex flex-col gap-4">
          <div className="flex-1 flex flex-col gap-1">
            <p>Specialty</p>
            <select onChange={(e) => setSpecialty(e.target.value)} value={speciality} className="border rounded py-2 px-3" name="speciality"  id="speciality">
              <option value="General Physician">General Physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
              {/* <option value="Psychiatrist">Psychiatrist</option> */}
            </select> 
          </div>

          <div className="flex-1 flex flex-col gap-1"> 
            <p>Education</p>
            <input onChange={(e) => setDegree(e.target.value)} value={degree} className="border rounded py-2 px-3" type="text" placeholder="Education" required />
          </div>

          <div className="flex-1 flex flex-col gap-1">
            <p>Address</p>
            <input onChange={(e) => setAddress1(e.target.value)} value={address1} className="border rounded py-2 px-3" type="text" placeholder="Address 1" required />
            <input onChange={(e) => setAddress2(e.target.value)} value={address2} className="border rounded py-2 px-3" type="text" placeholder="Address 2" required />
          </div>
        </div>

        <div>
          <p className="mt-4 mb-2 ">About Doctor</p>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} className="border rounded pt-2 px-4 w-full " placeholder="Write about Doctor" rows={5} required />
        </div>

        <button className="bg-blue-500 px-10 py-3 mt-4 text-white rounded-full">Add Doctor</button>
      </div>
    </form>
  );
}

export default AddDoctor;
