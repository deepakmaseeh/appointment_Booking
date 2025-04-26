const doctor = require("../Model/doctorModel")

exports.changeAvailability  =async(req,res)=>{
    try {
        
        const {docId} = req.body
        const docData = await doctor.findById(docId)
        await doctor.findByIdAndUpdate(docData,{availability: !docData.availability})
        res.json({success:true , message: 'Availablity changed'})
    } catch (error) {
        console.log(error)
        res.json({success:false , message: error.message})
        
    }
}

exports.doctorList  =async(req,res)=>{
    try {
        const doctors = await doctor.find({}).select(['-password','-email'])
        res.json({success:true , doctors})
    } catch (error) {
        console.log(error)
        res.json({success:false , message: error.message})
    }
}
