import axios from "axios"

export const readNotes=()=>{
    return dispatach=>{
        // axios.get("http://localhost:8080/api/v1/notes")
        axios.get("http://localhost:8080/notes")
        .then(res=>{
            dispatach({type:"READ_NOTES",payload:res.data.notes})
        })
        .catch(e=>{console.log("errorReadNotes",e)})
    }
} 
export const readOneNote=(id)=>{
    return dispatch=>{
            axios.get("http://localhost:8080/notes/"+id)
                .then(res=>{dispatch({type:"READ_ONE_NOTE",payload:res.data.note})})
                .catch(e=>{console.log("errorReadOneNotes",e)})
    }
}
export const createNote=(note)=>{
    return dispatch=>{
     axios.post("http://localhost:8080/notes/add",note)
     .then((res)=>{dispatch({type:"CREATE_NOTE",payload:res.data})})
     .catch(e=>{console.log("errorcreateNote",e)})
 }
}
export const uploadAvatar=(formData)=>{
    return async dispatch=>{
    await axios.post("http://localhost:8080/notes/uploads",formData)
    .then((data) => {
        console.log("fff",data.data.pathImage)
        return dispatch({
          type: "UPLOAD_PHOTO",
          payload: data.data.pathImage, //data.url
        });
      })
    .catch((err) => console.error(err));
 }
}


export const deleteNote=(id)=>{
    return dispatch=>{
     axios.delete("http://localhost:8080/notes/"+id)
     .then((res)=>{dispatch({type:"DELETE_NOTE",payload:res.data})})
     .catch(e=>{console.log("errordeleteNote",e)})
 }
}

export const updateNote=(id,note)=>{
    return dispatch=>{
     axios.put("http://localhost:8080/notes/"+id,note)
     .then((res)=>{dispatch({type:"UPDATE_NOTE",payload:res.data})})
     .catch(e=>{console.log("errorupdateNote",e)})
 }
}