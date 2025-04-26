var multer = require('multer')

var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, './uploads/');
    },
    filename: function (request, file, callback) {
        console.log(file);
        callback(null, file.originalname)
    }
});

const upload = multer({ storage: storage})
module.exports = upload

// const multer = require("multer");
// const storage = multer.diskStorage({
//     // destination: function (req , file , cd){
//     //      cd(null, './public/temp')
//     // },
//     filename: function(req,file,callback){
//         callback(null,file.originalname)
//     }
// })

// const upload = multer({ storage})
// module.exports = upload

// module.exports = multer({ storage})

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/temp')
//     },
//     filename: function (req, file, cb) {
//     //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     //   cb(null, file.fieldname + '-' + uniqueSuffix)
//     cb(null,file.originalname)
//     }
//   })
  
//   const upload = multer({ storage: storage }) 
//   module.exports = upload