import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import { connect } from "react-redux";
import { updateNote,readOneNote } from "../storeRedux/actions/notesAction";
import { Formik,Field } from "formik";
import * as Yup from "yup";

class UpdateNote extends Component {
    componentDidMount(){
        const {id}=this.props.match.params
        this.props.readOneNote(id);
    }
  handleFormSubmit = (values) => {
    const {id}=this.props.match.params
    console.log("values: ",values)
    this.props.updateNote(id,values);
    this.props.history.push("/notes");

  };
  validationSchema = () => {
    return Yup.object().shape({
      title: Yup.string().min(3, "Too Short!").required("Required"),
      body: Yup.string().min(4, "Too Short!").required("Required"),
    });
  };
  form = ({
    handleSubmit,
    isValid,
    errors,
    touched,
    dirty,
  }) => (
    <div>
      <FormGroup>
        <Label>title</Label>
        <Field
          invalid={errors.title && touched.title}
          valid={!errors.title && touched.title}
          name="title"
          type="string"
          placeholder="Your title"
         as={Input}
        />
        {errors.title ? (
          <FormFeedback>{errors.title}</FormFeedback>
        ) : (
          <FormFeedback valid>is sweet</FormFeedback>
        )}
      </FormGroup>
      <FormGroup>
        <Label>body and your Description</Label>
        <Field
          invalid={errors.body && touched.body}
          valid={!errors.body && touched.body}
          name="body"
          type="textarea"
          placeholder="Your body"
         as={Input}
        />
        {errors.body ? (
          <FormFeedback>{errors.body}</FormFeedback>
        ) : (
          <FormFeedback valid>is sweet</FormFeedback>
        )}
      </FormGroup>
      <Button
        color="primary"
        block
        onClick={handleSubmit}
        disabled={!isValid || !dirty } // ||isSubmitting :kats3ml mra whda f signup ctt
      >
        Update Note
      </Button>
      
    </div>
  );
  render() {
      const {note}=this.props
    return (
      <div style={{ padding: 20 }}>
        <h3>Update this note</h3>
        <hr />
        <Formik
            enableReinitialize={true}
          initialValues={{ title: note.title, body: note.body }}
          onSubmit={this.handleFormSubmit}
          validationSchema={this.validationSchema}
        >
          {this.form}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
    return {note : state.notesReducer.note}
}

export default connect(mapStateToProps,{updateNote,readOneNote}) (UpdateNote)