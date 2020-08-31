const express = require('express');
const multer =require("multer")
// const uplaod =multer({des:"uploads/"})//Name Folder for save File/Image..
// const type =uplaod.single("avatar")// avatar is name File Page FrontEnd ReactJS
const {readAllNotes,createNote,readOneNote,deleteNote,updateNote ,uploadCreate}=require("../controlles/noteControlle")
const noteRoute=express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, 'uploads/')
//   },
//   filename: (req, file, cb) => {
//       cb(null, `${Date.now()}_${file.originalname}`)
//   },
//   fileFilter: (req, file, cb) => {
//       const ext = path.extname(file.originalname)
//       if (ext !== '.jpg' || ext !== '.png') {
//           return cb(res.status(400).end('only jpg, png are allowed'), false);
//       }
//       cb(null, true)
//   }
// })
// const upload = multer({ storage: storage }).single("avatar")

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  });

  const fileFilter=(req, file, cb)=>{
   if(file.mimetype ==='image/jpeg' || file.mimetype ==='image/jpg' || file.mimetype ==='image/png'){
       cb(null,true);
   }else{
       cb(null, false);
   }

  }

var upload = multer({ 
    storage:storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter:fileFilter
 }).single("avatar");
// noteRoute.get("/api/v1/notes",readAllNote)
noteRoute.get("/notes",readAllNotes)
noteRoute.get("/notes/:id",readOneNote)
noteRoute.delete("/notes/:id",deleteNote)
noteRoute.put("/notes/:id",updateNote)
noteRoute.post("/notes/uploads",(req,res)=>{
  upload(req, res, err => {
    if (err) {
        return res.json({ success: false, err })
    } // file: `uploads/${req.file.filename}`
    return res.json({ success: true, avatar: res.req.file.path,
        pathImage:`http://localhost:8080/${req.file.filename}` ,
         fileName: res.req.file.filename })
})
})
// noteRoute.post("/notes/uploads", upload.single("avatar"))
noteRoute.post("/notes/add", createNote)


module.exports={
noteRoute
}