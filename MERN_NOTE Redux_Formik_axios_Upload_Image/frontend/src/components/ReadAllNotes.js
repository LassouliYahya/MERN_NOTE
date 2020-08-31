import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { readNotes, deleteNote } from "../storeRedux/actions/notesAction";

class ReadAllNotes extends Component {
  componentDidMount  ()  {
     this.props.readNotes();
  };

  render() {
    const { notes } = this.props;
    console.log("notes",notes)
   
    return (
      <div>
        <div className="row">
          {notes.length>0 ?
          (notes.map((note) => {
            return (
              <div className="col-sm-4" key={note._id}>
                <div className="card" style={{ width: '18rem' }}>
                <img className="card-img-top" 
                src={note.avatar} 
                // src={"http://localhost:8080/"+note.avatar.replace("uploads", "")} 
                alt="Card"/>
                  <div className="card-body">
                    <h5 className="card-title">Title: {note.title} </h5>
                    <p className="card-text">Body: Cliquer sur Button Details</p>
                    <Link to={`/notes/${note._id}`} className="btn btn-info btn-sm">
                      details
                    </Link>
                    <Link to={`/note/update/${note._id}`} className="btn btn-warning btn-sm">
                      update
                    </Link>
                    <Link to="/notes" onClick={()=>{this.props.deleteNote(note._id)}} className="btn btn-danger btn-sm">
                      delete
                    </Link>
                  </div>
                </div>
              </div>
            ); //return
          }))
          :(<Link  className="alert alert-info" role="alert" to="/note/add">
          Is Not Note !! plz Create Note
        </Link>)}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { notes: state.notesReducer.notes };
};
export default connect(mapStateToProps, { readNotes ,deleteNote})(ReadAllNotes);
