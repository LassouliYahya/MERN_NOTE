import React, { Component } from 'react'
import {connect} from "react-redux"
import { Link } from "react-router-dom";
import { readOneNote } from "../storeRedux/actions/notesAction";

class ReadOneNote extends Component {
    componentDidMount(){
        const {id}=this.props.match.params
        this.props.readOneNote(id);
    }
    render() {
        const {note}=this.props
        return (
            <div>
              <div className="row">
                    <div className="col-sm-12" key={note._id}>
                    <center>   <div className="card">
                        <div className="card-body">
                       <h5 className="card-title"> Title: {note.title} </h5>
                          <p className="card-text">{note.body}</p>
                          <Link to="/notes" className="btn btn-primary btn-sm btn-block">
                            Go To Read All Notes
                          </Link>
                        </div>
                      </div>  </center> 
                    </div>
              </div>
            </div>
          );
    }
}
const mapStateToProps=(state)=>{
    return {note : state.notesReducer.note}
}
export default connect(mapStateToProps,{readOneNote}) (ReadOneNote)