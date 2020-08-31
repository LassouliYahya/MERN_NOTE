const initialState = {
  notes: [],
  note: {},
  urlPhoto:""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "READ_NOTES":
      return { ...state, notes: action.payload };
    case "READ_ONE_NOTE":
      return { ...state, note: action.payload };
    case "CREATE_NOTE":
      return { ...state, notes: [action.payload, ...state.notes] };
    case "DELETE_NOTE":
      return { ...state , notes:state.notes.filter((note)=>note._id !== action.payload._id) };
    case "UPDATE_NOTE":
      return { 
        ...state , 
        notes:state.notes.map((note)=>note._id === action.payload._id ? (note=action.payload): (note) )
       };
   case "UPLOAD_PHOTO":
        return {
          ...state,
          urlPhoto: action.payload,
        };
    default:
      return state;
  }
};
