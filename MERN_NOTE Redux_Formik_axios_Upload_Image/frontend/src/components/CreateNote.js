import React, { Component } from "react";
import {
  Button,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Form,
} from "reactstrap";
import { connect } from "react-redux";
import { createNote,uploadAvatar } from "../storeRedux/actions/notesAction";
import { Formik,Field } from "formik";
import * as Yup from "yup";

class CreateNote extends Component {
  state = { avatar: "" }; //dartha ghir 3la 7sab tban tswira <img src={this.state.avatar}>
  handleChangeImage = (event) => {
    let reader = new FileReader();
    let avatar = event.target.files[0];
    reader.onloadend = () => {
      this.setState({
        avatar: reader.result,
      });
    };
    reader.readAsDataURL(avatar);
  };

  handleFormSubmit = async(values) => {
    const formData=new FormData()
    formData.append("avatar",values.avatar,values.avatar.name)
    await this.props.uploadAvatar( formData)

    values.avatar=this.props.url

     this.props.createNote(values);
    this.props.history.push("/notes");
    console.log("values",values)
  };
  validationSchema = () => {
    const FILE_SIZE = 160 * 1024;
    const SUPPORTED_FORMATS = [
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/png",
    ];
    return Yup.object().shape({
      title: Yup.string().min(3, "Too Short!").required("Required"),
      body: Yup.string().min(4, "Too Short!").required("Required"),
      avatar: Yup.mixed()
        .required("Required")
        .test(
          "fileSize",
          "File too large",
          (value) => value && value.size <= FILE_SIZE
        )
        .test(
          "fileFormat",
          "svp Format is jpg or jpeg or png or gif",
          (value) => value && SUPPORTED_FORMATS.includes(value.type)
        ),
    });
  };
  form = ({
    handleSubmit,
    isValid,
    errors,
    touched,
    dirty,
    handleBlur,
    handleChange,
    setFieldValue,
    values,
  }) => (
    <Form>
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
      <FormGroup>
        <Label>avatar</Label><br/>
        <img
          src={this.state.avatar ? this.state.avatar   : "/uploads/profile.png"}
          className="img-thumbnail mt-2"
          height={200}
          width={200}
        />
        <Input
          accept="image/*"
          invalid={errors.avatar && touched.avatar}
          // valid={!errors.avatar && touched.avatar}
          name="avatar"
          type="file"
          placeholder="Your avatar"
          // onChange={handleChange}
          onBlur={handleBlur}
          onChange={(event) => {
            this.handleChangeImage(event);
            setFieldValue("avatar", event.currentTarget.files[0]);
          }}
        />
        {errors.avatar ? (
          <FormFeedback>{errors.avatar}</FormFeedback>
        ) : (
          <FormFeedback valid>is sweet</FormFeedback>
        )}
       
      </FormGroup>
      <Button
        color="primary"
        block
        type="submit"
        onClick={handleSubmit}
        disabled={!isValid || !dirty} // ||isSubmitting :kats3ml mra whda f signup ctt
      >
        Create Note
      </Button>
    </Form>
  );
  render() {
    return (
      <div style={{ padding: 20 }}>
        <h3>Create new note</h3>
        <hr />
        <Formik
          initialValues={{ title: "", body: "", avatar: null }}
          onSubmit={this.handleFormSubmit}
          validationSchema={this.validationSchema}
        >
          {this.form}
        </Formik>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.notesReducer.urlPhoto,
  };
};
export default connect(mapStateToProps,{createNote,uploadAvatar}) (CreateNote)