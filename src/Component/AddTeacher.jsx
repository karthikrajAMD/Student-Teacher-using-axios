import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
function AddTeacher() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [doj, setDoj] = useState("");
  const role = "Teacher";
  const [gender, setGender] = useState("");
  const [subject, setSubject] = useState("");

  const handleSubmit = async (event) => {
    console.log(event);
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      postTeacher();
    }
    setValidated(true);
  };
  const postTeacher = async () => {
    if (
      name !== "" &&
      gender !== "" &&
      dob !== "" &&
      doj !== "" &&
      subject !== ""
    ) {
      console.log(name, role, gender, dob, doj, subject);
      await axios
        .post(`https://638f301f9cbdb0dbe31f8c37.mockapi.io/teacher`, {
          name,
          role,
          gender,
          dob,
          doj,
          subject,
        })
        .then((res) => {
          if (res.status === 201) {
            toast.success("Teacher Data added");
            setTimeout(() => {
              navigate("/Teacher");
            }, 2000);
          } else {
            toast.error("Error in adding");
          }
        });
    } else {
      toast.error("Enter all required data");
    }
  };
  return (
    <Col xs={6} className="Add-form">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              required
              type="text"
              placeholder="Enter Name"
              onChange={(e) =>
                setName(
                  e.target.value.charAt(0).toUpperCase() +
                    e.target.value.slice(1)
                )
              }
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Name.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDateOfBirth">
          <Form.Label>Date of Birth</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              required
              type="date"
              placeholder="Enter Date of Birth"
              onChange={(e) => setDob(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Date of birth.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDateOfJoining">
          <Form.Label>Date of Joining</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              required
              type="date"
              placeholder="Enter Date of Joining"
              onChange={(e) => setDoj(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please Enter Date of Joining.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGender">
          <Form.Label>Gender</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              required
              type="text"
              placeholder="Enter Gender"
              onChange={(e) =>
                setGender(
                  e.target.value.charAt(0).toUpperCase() +
                    e.target.value.slice(1)
                )
              }
            />
            <Form.Control.Feedback type="invalid">
              Please Enter a gender.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formSubject">
          <Form.Label>Subject</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              required
              type="text"
              placeholder="Enter Subject"
              onChange={(e) =>
                setSubject(
                  e.target.value.charAt(0).toUpperCase() +
                    e.target.value.slice(1)
                )
              }
            />
            <Form.Control.Feedback type="invalid">
              Please Enter a subject.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Col>
  );
}

export default AddTeacher;
