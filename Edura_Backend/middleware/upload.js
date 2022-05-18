// var multer = require('multer')
// var GridFsStorage = require('multer-gridfs-storage').GridFsStorage;

// const storage = new GridFsStorage({
//     url: process.env.DB,
//     options:{
//         useNewUrlParser : true,
//         useUnifiedTopology: true
//     },
//     file:(req, file)=>{
//         const match  = ["image/png", "image/jpeg"];

//         if(match.indexOf(file.mimetype) === -1){
//             const filename = `${Date.now()}-dhruvi-${file.originalname}`;
//             return filename
//         } 
//         return {
//             bucketName: 'photos',
//             filename : `${Date.now()}-dhruvi-${file.originalname}`
//         }
//     }
// })

// module.exports = multer({storage})