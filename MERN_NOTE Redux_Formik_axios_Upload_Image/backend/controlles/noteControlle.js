const Note=require("../models/noteModel")
// const multer =require("multer")
// const uplaod =multer({des:"uploads/"})//Name Folder for save File/Image..
// const type =uplaod.single("avatar")// avatar is name File Page FrontEnd ReactJS

const createNote=(req,res)=>{
    const note={
        title:req.body.title,
        body:req.body.body,
        avatar: req.body.avatar,
        // avatar: (req.file==undefined ? "profile.png" : (req.file.filename))
        // avatar: req.file.filename //"profile.png" // ola bghitiha par default avatar:"profile.png"
    }
    // console.log("xxxxxxxx",req.file.filename)
     new Note(note).save()
                  .then((createNote)=> res.json(createNote))// [{data1}]
                  .catch((errors)=>res.json({"errorCreateNoteControlle":errors}))
   
}

const readAllNotes=(req,res)=>{
         Note.find()
        //   .then((notes)=>{ res.json( notes );}) //response est // [{data1},{data2},...,{dataN}] //hint ila bghina nst3mlo Axios f frontEnd kandiro res.data //hadi dayra bhal site jsonplaceholder
            .then((notes)=>{ res.json({notes});}) //response est //{"notes":[{data1},{data2},...,{dataN}]} //hint ila bghina nst3mlo Axios f frontEnd kandiro res.data.notes
            .catch(e=>(console.error(e) ))
     
}
const readOneNote=(req,res)=>{
Note.findById(req.params.id)
    .then(note=>{ res.json({note});}) //{"note":[{data1}]}
    .catch((errors)=>res.json({"errorCreateNoteControlle":errors}))
}
const deleteNote=(req,res)=>{
    Note.findByIdAndDelete(req.params.id)
    .then((deleteNote)=>{ res.json(deleteNote);})// [{data1}]
    .catch((errors)=>res.json({"errordeleteNoteControlle":errors}))
}
const updateNote =(req,res)=>{
    Note.findById(req.params.id)
        .then(note=>{
                note.title=req.body.title;
                note.body=req.body.body;
                note.avatar=req.file.filename; //(req.file==undefined ? "profile.png" : (req.file.filename))
                note.save()
                    .then((note)=>{res.json(note);})// [{data1}]
                    .catch((errors)=>res.json({"errorupdate1NoteControlle":errors}))
             })
        .catch((errors)=>res.json({"errorupdate2NoteControlle":errors}))
}

module.exports={
    readAllNotes,
    createNote,
    readOneNote,
    deleteNote,
    updateNote,
    // uploadCreate
}